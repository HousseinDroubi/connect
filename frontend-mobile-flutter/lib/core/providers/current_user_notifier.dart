// ignore_for_file: non_constant_identifier_names

import 'package:connect/features/auth/models/user_model.dart';
import 'package:connect/features/home/models/chat_model.dart';
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
}
