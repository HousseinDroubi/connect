// ignore_for_file: non_constant_identifier_names

import 'dart:typed_data';

import 'package:connect/core/classes/person.dart';
import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/features/auth/models/user_model.dart';
import 'package:connect/features/home/repositories/home_users_repository.dart';
import 'package:connect/features/home/repositories/messages_repository.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'home_view_model.g.dart';

@riverpod
class HomeViewModel extends _$HomeViewModel {
  late UserModel? _currentUserNotifier;
  late HomeUsersRepository _homeUsersRepository;
  late MessagesRepository _messagesRepository;

  @override
  void build() {
    _currentUserNotifier = ref.read(currentUserNotifierProvider);
    _homeUsersRepository = ref.read(homeUsersRepositoryProvider);
    _messagesRepository = ref.read(messagesRepositoryProvider);
  }

  Future<Either<AppFailure, List<Person>>> searchUsers(String content) async {
    return await _homeUsersRepository.searchForUsers(
      token: _currentUserNotifier!.token,
      content: content,
    );
  }

  Future<Uint8List?> viewImage(String message_id) async {
    return await _messagesRepository.viewImage(
      token: _currentUserNotifier!.token,
      message_id: message_id,
    );
  }
}
