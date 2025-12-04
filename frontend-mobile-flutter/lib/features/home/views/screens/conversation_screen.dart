import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/providers/current_conversation.dart';
import 'package:connect/core/widgets/text_field_widget.dart';
import 'package:connect/features/home/views/widgets/message_widget.dart';
import 'package:connect/features/home/views/widgets/user_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ConversationScreen extends ConsumerStatefulWidget {
  const ConversationScreen({super.key});

  @override
  ConsumerState<ConversationScreen> createState() => _ConversationScreenState();
}

class _ConversationScreenState extends ConsumerState<ConversationScreen> {
  TextEditingController messageController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    final conversation = ref.watch(currentConversationProvider).value;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [
              UserWidget(
                image_source: conversation!.is_group
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
                      margin: EdgeInsets.only(bottom: 12),
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
                      ),
                    );
                  },
                ),
              ),
              TextFieldWidget(
                hint: "Type here",
                isForMessages: true,
                isFull: true,
                nextFunction: () {},
                textEditingController: messageController,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
