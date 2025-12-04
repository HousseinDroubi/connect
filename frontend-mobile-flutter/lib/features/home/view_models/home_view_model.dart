// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/classes/person.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/features/auth/repositories/auth_local_repository.dart';
import 'package:connect/features/home/repositories/home_users_repository.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'home_view_model.g.dart';

@riverpod
class HomeViewModel extends _$HomeViewModel {
  late HomeUsersRepository _homeUsersRepository;
  late AuthLocalRepository _authLocalRepository;

  @override
  void build() {
    _authLocalRepository = ref.read(authLocalRepositoryProvider);
    _homeUsersRepository = ref.read(homeUsersRepositoryProvider);
  }

  Future<Either<AppFailure, List<Person>>> searchUsers(String content) async {
    return await _homeUsersRepository.searchForUsers(
      token: _authLocalRepository.getToken()!,
      content: content,
    );
  }
}
