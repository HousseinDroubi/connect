// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/classes/message.dart';
import 'package:connect/features/home/models/conversation_model.dart';
import 'package:connect/features/home/models/ws/receive/ws_receive_edit_message_model.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'current_conversation.g.dart';

@Riverpod(keepAlive: true)
class CurrentConversation extends _$CurrentConversation {
  @override
  ConversationModel? build() {
    return null;
  }

  void addConversation(ConversationModel conversation) {
    state = conversation;
  }

  Message? deleteMessage(String message_id) {
    state = state!.copyWith(
      messages: state!.messages
          .filter((message) => message.id != message_id)
          .toList(),
    );
    return state!.messages.isNotEmpty ? state!.messages.last : null;
  }

  void toggleUserStatus(bool is_online) {
    if (state != null) {
      state = state!.copyWith(
        recipient: state!.recipient!.copyWith(is_online: is_online),
      );
    }
  }

  void updateMessage(WsReceiveEditMessageModel new_message) {
    if (state != null) {
      state = state!.copyWith(
        messages: state!.messages.map((Message message) {
          if (message.id == new_message.message_id) {
            return message.copyWith(content: new_message.message_new_content);
          }
          return message;
        }).toList(),
      );
    }
  }
}
