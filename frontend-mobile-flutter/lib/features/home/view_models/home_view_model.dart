import 'package:connect/core/classes/person.dart';
import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/features/auth/models/user_model.dart';
import 'package:connect/features/home/repositories/home_users_repository.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'home_view_model.g.dart';

@riverpod
class HomeViewModel extends _$HomeViewModel {
  late UserModel? _currentUserNotifier;
  late HomeUsersRepository _homeUsersRepository;

  @override
  AsyncValue? build() {
    _currentUserNotifier = ref.read(currentUserNotifierProvider);
    _homeUsersRepository = ref.read(homeUsersRepositoryProvider);
    return null;
  }

  Future<List<Person>?> searchUsers(String content) async {
    state = AsyncValue.loading();
    final Either<AppFailure, List<Person>> result = await _homeUsersRepository
        .searchForUsers(token: _currentUserNotifier!.token, content: content);

    switch (result) {
      case Left(value: AppFailure(message: final message)):
        state = AsyncValue.error(message, StackTrace.current);
        return null;
      case Right(value: List<Person> users):
        state = AsyncValue.data(users);
        return users;
    }
  }
}
