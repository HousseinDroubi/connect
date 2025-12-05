// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/classes/message.dart';
import 'package:connect/features/home/models/conversation_model.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'current_conversation.g.dart';

@Riverpod(keepAlive: true)
class CurrentConversation extends _$CurrentConversation {
  @override
  AsyncData<ConversationModel?> build() {
    return AsyncData(null);
  }

  void addConversation(ConversationModel conversation) {
    state = AsyncData(conversation);
  }

  Message? deleteMessage(String message_id) {
    final ConversationModel old_state = state.value!;
    state = AsyncData(
      old_state.copyWith(
        messages: old_state.messages
            .filter((message) => message.id != message_id)
            .toList(),
      ),
    );
    return state.value!.messages.isNotEmpty ? state.value!.messages.last : null;
  }
}
