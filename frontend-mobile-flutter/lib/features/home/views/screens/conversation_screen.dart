// ignore_for_file: non_constant_identifier_names

import 'dart:io';

import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/providers/current_conversation.dart';
import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/utils/app_files.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/core/widgets/text_field_widget.dart';
import 'package:connect/features/home/models/ws/send/ws_delete_message_model.dart';
import 'package:connect/features/home/models/ws/send/ws_edit_message_model.dart';
import 'package:connect/features/home/models/ws/send/ws_send_message_model.dart';
import 'package:connect/features/home/view_models/conversation_view_model.dart';
import 'package:connect/features/home/view_models/ws_view_model.dart';
import 'package:connect/features/home/views/widgets/message_widget.dart';
import 'package:connect/features/home/views/widgets/user_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart' as fpdart;

class ConversationScreen extends ConsumerStatefulWidget {
  const ConversationScreen({super.key});

  @override
  ConsumerState<ConversationScreen> createState() => _ConversationScreenState();
}

class _ConversationScreenState extends ConsumerState<ConversationScreen> {
  TextEditingController messageController = TextEditingController();
  TextEditingController editMssageController = TextEditingController();

  Future<void> deleteMessage(String message_id, String chat_id) async {
    hidePopup(context);
    showPopup(popupCase: PopupLoading(context: context));
    final notifier = ref.read(conversationViewModelProvider.notifier);
    final fpdart.Either<AppFailure, AppSuccess> result = await notifier
        .deleteMessage(message_id, chat_id);

    hidePopup(context);

    switch (result) {
      case fpdart.Left(value: AppFailure(message: final message)):
        showPopup(
          popupCase: PopupAlert(context: context, popupContent: message),
        );
        break;
      default:
        break;
    }
  }

  Future<void> uploadImage() async {
    File? imageFile = await AppFiles.pickUpImageFromGallery();
    if (imageFile != null) {
      showPopup(popupCase: PopupLoading(context: context));
      final notifier = ref.read(conversationViewModelProvider.notifier);
      notifier.uploadImage(imageFile);
      hidePopup(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final conversation = ref.watch(currentConversationProvider)!;
    final current_user_id = ref.read(currentUserNotifierProvider)!.id;
    final wsNotifier = ref.read(wsViewModelProvider.notifier);
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [
              UserWidget(
                image_source: conversation.is_group
                    ? null
                    : conversation.recipient!.profile_url,
                is_for_conversation: true,
                is_group: conversation.is_group,
                username: conversation.is_group
                    ? null
                    : conversation.recipient!.username,
                is_online: conversation.is_group
                    ? false
                    : conversation.recipient!.is_online!,
              ),
              Divider(thickness: 0.4, color: AppColors.grey),
              Expanded(
                child: ListView.builder(
                  itemCount: conversation.messages.length,
                  itemBuilder: (item, index) {
                    final message = conversation.messages[index];
                    return Container(
                      margin: EdgeInsets.only(bottom: 8),
                      width: MediaQuery.sizeOf(context).width,
                      child: MessageWidget(
                        is_deleted: message.deleted_for_others_at != null,
                        profile_url: message.sender.profile_url,
                        id: message.id,
                        content: message.content,
                        is_text: message.is_text,
                        is_group: message.receiver == null,
                        created_at: message.created_at,
                        sender_id: message.sender.id,
                        onDeleteMessage: () {
                          message.sender.id == current_user_id
                              ? showPopup(
                                  popupCase: PopupDeleteMessageForAll(
                                    context: context,
                                    deleteMessageForMeFunction: () async {
                                      await deleteMessage(
                                        message.id,
                                        message.conversation_id,
                                      );
                                    },
                                    deleteMessageForAllFunction: () {
                                      wsNotifier.deleteMessage(
                                        wsDeleteMessageModel:
                                            WsDeleteMessageModel(
                                              message_id: message.id,
                                            ),
                                      );
                                      hidePopup(context);
                                    },
                                  ),
                                )
                              : showPopup(
                                  popupCase: PopupDeleteMessageForMe(
                                    context: context,
                                    deleteMessageForMeFunction: () async {
                                      await deleteMessage(
                                        message.id,
                                        message.conversation_id,
                                      );
                                    },
                                  ),
                                );
                        },
                        onEditMessage: () {
                          editMssageController.text = message.content;

                          showPopup(
                            popupCase: PopupEditMessage(
                              context: context,
                              controller: editMssageController,
                              nextFunction: () {
                                // edit message
                                wsNotifier.editMessage(
                                  wsEditMessageModel: WsEditMessageModel(
                                    message_id: message.id,
                                    message_new_content:
                                        editMssageController.text,
                                  ),
                                );

                                editMssageController.text = "";
                                // Hide popup
                                hidePopup(context);
                              },
                            ),
                          );
                        },
                      ),
                    );
                  },
                ),
              ),
              TextFieldWidget(
                hint: "Type here",
                isForMessages: true,
                isFull: true,
                nextFunction: () {
                  wsNotifier.sendMessage(
                    wsSendNewMessageModel: WsSendNewMessageModel(
                      is_text: messageController.text != "",
                      content: messageController.text,
                      to: conversation.recipient?.id,
                    ),
                  );
                  messageController.text = "";
                },
                onImagePickedUp: uploadImage,
                onMessageSent: () {
                  wsNotifier.sendMessage(
                    wsSendNewMessageModel: WsSendNewMessageModel(
                      is_text: true,
                      content: messageController.text,
                      to: conversation.recipient?.id,
                    ),
                  );
                  messageController.text = "";
                },
                textEditingController: messageController,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
