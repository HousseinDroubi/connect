import 'package:connect/features/home/models/conversation_model.dart';
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
}
