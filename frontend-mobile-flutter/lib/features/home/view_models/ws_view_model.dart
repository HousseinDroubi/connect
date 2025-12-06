// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/features/auth/models/user_model.dart';
import 'package:connect/features/auth/repositories/auth_local_repository.dart';
import 'package:connect/features/home/repositories/ws_repository.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part "ws_view_model.g.dart";

@Riverpod(keepAlive: true)
class WsViewModel extends _$WsViewModel {
  late CurrentUserNotifier _currentUserNotifier;
  late WsRepository _wsRepository;

  @override
  void build() {
    _wsRepository = ref.read(wsRepositoryProvider);
    _currentUserNotifier = ref.read(currentUserNotifierProvider.notifier);
    _wsRepository.wsConnect(
      token: ref.read(authLocalRepositoryProvider).getToken()!,
    );
    wsListenToMessages();
  }

  void wsListenToMessages() {
    _wsRepository.stream.listen((data) {
      print(data);
    });
  }
}
