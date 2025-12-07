// ignore_for_file: non_constant_identifier_names
import 'package:connect/core/classes/chat_message.dart';
import 'package:connect/core/classes/message.dart';
import 'package:connect/features/auth/models/user_model.dart';
import 'package:connect/features/home/models/chat_model.dart';
import 'package:connect/features/home/models/ws/receive/ws_receive_delete_message_model.dart';
import 'package:connect/features/home/models/ws/receive/ws_receive_edit_message_model.dart';
import 'package:connect/features/home/models/ws/receive/ws_receive_new_messsage_model.dart';
import 'package:connect/features/home/models/ws/receive/ws_receive_toggle_status_model.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'current_user_notifier.g.dart';

@Riverpod(keepAlive: true)
class CurrentUserNotifier extends _$CurrentUserNotifier {
  @override
  UserModel? build() => null;

  void addUser(UserModel user) {
    state = user;
  }

  void updateUser({
    String? username,
    String? profile_url,
    String? token,
    bool? is_online,
    List<ChatModel>? chats,
  }) {
    if (state != null) {
      state = state!.copyWith(
        username: username,
        profile_url: profile_url,
        token: token,
        is_online: is_online,
        chats: chats,
      );
    }
  }

  void clearUserData() {
    state = null;
  }

  void deleteChat(String chat_id) {
    state = state!.copyWith(
      chats: state!.chats
          .filter((ChatModel chat) => chat.id != chat_id)
          .toList(),
    );
  }

  void updateLastMessageForChat(Message? message, String chat_id) {
    final updatedChats = state!.chats.map((chat) {
      if (chat.id == chat_id) {
        if (message == null) {
          return chat.copyWith(last_message: null);
        } else if (message.id != chat.last_message?.id) {
          return chat.copyWith(
            last_message: ChatMessage(
              id: message.id,
              sender: message.sender.id,
              receiver: message.receiver?.id,
              is_text: message.is_text,
              content: message.content,
              chat_id: message.conversation_id,
              deleted: message.deleted_for_others_at != null,
              created_at: message.created_at,
            ),
          );
        }
      }
      return chat;
    }).toList();
    state = state!.copyWith(chats: updatedChats);
    state!.chats.toList().forEach((e) {
      print(e.toString());
    });
  }

  void toggleUserStatusInChat(WsReceiveToggleStatusModel new_status) {
    if (state != null) {
      state = state!.copyWith(
        chats: state!.chats.map((ChatModel chat) {
          if (new_status.from == chat.recipient?.id) {
            return chat.copyWith(
              last_message: chat.last_message,
              recipient: chat.recipient!.copyWith(
                is_online: new_status.is_online,
              ),
            );
          }
          return chat;
        }).toList(),
      );
    }
  }

  void updateLastMessageInChat(WsReceiveEditMessageModel new_message) {
    if (state != null) {
      state = state!.copyWith(
        chats: state!.chats.map((ChatModel chat) {
          if (new_message.message_conversation_id == chat.id &&
              new_message.message_id == chat.last_message?.id) {
            return chat.copyWith(
              last_message: chat.last_message?.copyWith(
                content: new_message.message_new_content,
              ),
            );
          }
          return chat;
        }).toList(),
      );
    }
  }

  void deleteLastMessageInChat(WsReceiveDeleteMessageModel message) {
    if (state != null) {
      state = state!.copyWith(
        chats: state!.chats.map((ChatModel chat) {
          if (message.message_conversation_id == chat.id &&
              message.message_id == chat.last_message?.id) {
            return chat.copyWith(
              last_message: chat.last_message?.copyWith(
                content: "This message has been deleted",
                deleted: true,
              ),
            );
          }
          return chat;
        }).toList(),
      );
    }
  }

  void addNewMessageInChat(WsReceiveNewMesssageModel new_message) {
    if (state == null) return;
    final String chat_id = new_message.message.conversation_id;
    final List<ChatModel> chats = List<ChatModel>.from(state!.chats);
    final index = chats.indexWhere((ChatModel chat) => chat.id == chat_id);
    if (index == -1) return;

    final ChatModel updatedChat = chats[index].copyWith(
      last_message: ChatMessage(
        id: new_message.message.id,
        sender: new_message.message.sender.id,
        is_text: new_message.message.is_text,
        content: new_message.message.content,
        chat_id: new_message.message.conversation_id,
        deleted: new_message.message.deleted_for_others_at != null,
        created_at: new_message.message.created_at,
      ),
    );

    chats.removeAt(index);
    chats.insert(0, updatedChat);

    state = state!.copyWith(chats: chats);
  }
}








// (state != null) {
//       state = state!.copyWith(
//         chats: state!.chats.map((ChatModel chat) {
//           if (new_message.message.conversation_id == chat.id) {
//             ChatModel updated_chat = chat.copyWith(
//               last_message: ChatMessage(
//                 id: new_message.message.id,
//                 sender: new_message.message.sender.id,
//                 is_text: new_message.message.is_text,
//                 content: new_message.message.content,
//                 chat_id: new_message.message.conversation_id,
//                 deleted: new_message.message.deleted_for_others_at != null,
//                 created_at: new_message.message.created_at,
//               ),
//             );
//           }
//           return chat;
//         }).toList(),
//       );
//     }