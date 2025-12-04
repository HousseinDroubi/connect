import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/features/auth/repositories/auth_local_repository.dart';
import 'package:connect/features/home/models/conversation_model.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'conversation_view_model.g.dart';

@riverpod
class ConversationViewModel extends _$ConversationViewModel {
  late AuthLocalRepository _authLocalRepository;
  late CurrentUserNotifier _currentUserNotifier;

  @override
  AsyncValue<ConversationModel?> build() {
    _authLocalRepository = ref.read(authLocalRepositoryProvider);
    _currentUserNotifier = ref.read(currentUserNotifierProvider.notifier);
    return AsyncData(null);
  }
}
