import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/core/widgets/title_widget.dart';
import 'package:connect/features/home/models/chat_model.dart';
import 'package:connect/features/home/view_models/conversation_view_model.dart';
import 'package:connect/features/home/views/widgets/user_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ChatsScreen extends ConsumerWidget {
  const ChatsScreen({super.key});

  Future<void> deleteChat({
    required String pin,
    required BuildContext context,
    required WidgetRef ref,
  }) async {
    showPopup(popupCase: PopupLoading(context: context));
    final notifier = ref.read(conversationViewModelProvider.notifier);
    await notifier.deleteChat(pin);
    hidePopup(context);
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final List<ChatModel> chats = ref.watch(
      currentUserNotifierProvider.select((user) => user?.chats ?? []),
    );

    return SafeArea(
      child: Padding(
        padding: EdgeInsets.all(18),
        child: Column(
          children: [
            Container(
              alignment: Alignment.centerLeft,
              child: TitleWidget(title: "All messages"),
            ),
            SizedBox(height: 20),
            ...chats.map(
              (ChatModel chat) => Container(
                margin: EdgeInsets.only(bottom: 15),
                child: UserWidget(
                  onDeleteIconPressed: () async {
                    await deleteChat(
                      pin: chat.recipient!.pin.toString(),
                      context: context,
                      ref: ref,
                    );
                  },
                  pin: chat.recipient?.pin.toString() ?? "broadcast",
                  is_deleted: chat.last_message?.deleted ?? false,
                  image_source: chat.recipient?.profile_url,
                  is_for_chats: true,
                  is_group: chat.recipient == null,
                  username: chat.recipient?.username,
                  chats_last_mesasage: chat.last_message != null
                      ? (chat.last_message!.is_text
                            ? chat.last_message!.content
                            : "Photo")
                      : null,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
