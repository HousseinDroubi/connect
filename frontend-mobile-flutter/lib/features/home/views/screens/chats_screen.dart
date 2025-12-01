import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/widgets/title_widget.dart';
import 'package:connect/features/home/models/conversation_model.dart';
import 'package:connect/features/home/views/widgets/user_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ChatsScreen extends ConsumerWidget {
  const ChatsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final List<ConversationModel> conversations = ref.watch(
      currentUserNotifierProvider.select((user) => user?.conversations ?? []),
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
            ...conversations.map(
              (ConversationModel conversation) => Container(
                margin: EdgeInsets.only(bottom: 15),
                child: UserWidget(
                  image_source: conversation.recipient?.profile_url,
                  is_for_chats: true,
                  username: conversation.recipient == null
                      ? "Connected Users"
                      : conversation.recipient!.username,
                  chats_last_mesasage: conversation.last_message != null
                      ? (conversation.last_message!.is_text
                            ? conversation.last_message!.content
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
