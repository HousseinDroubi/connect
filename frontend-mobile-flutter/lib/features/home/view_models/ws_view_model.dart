import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/features/auth/models/user_model.dart';
import 'package:connect/features/home/repositories/ws_repository.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part "ws_view_model.g.dart";

@Riverpod(keepAlive: true)
class WsViewModel extends _$WsViewModel {
  late UserModel? _currentUserNotifier;
  late WsRepository _wsRepository;

  @override
  void build() {
    _wsRepository = ref.read(wsRepositoryProvider);
    _currentUserNotifier = ref.read(currentUserNotifierProvider);
    _wsRepository.wsConnect(token: _currentUserNotifier!.token);
    wsListenToMessages();
  }

  void wsListenToMessages() {
    _wsRepository.stream.listen((data) {
      print(data);
    });
  }
}
