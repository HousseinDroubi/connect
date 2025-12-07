// ignore_for_file: non_constant_identifier_names

import 'dart:async';
import 'dart:io';
import 'package:app_links/app_links.dart';
import 'package:connect/core/providers/current_conversation.dart';
import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/utils/app_nav.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/utils.dart';
import 'package:connect/features/auth/models/user_model.dart';
import 'package:connect/features/auth/repositories/auth_local_repository.dart';
import 'package:connect/features/auth/repositories/auth_remote_repository.dart';
import 'package:connect/core/utils/validate_requests.dart';
import 'package:flutter/material.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'auth_view_model.g.dart';

@riverpod
class AuthViewModel extends _$AuthViewModel {
  late CurrentUserNotifier _currentUserNotifier;
  late CurrentConversation _currentConversation;
  late AuthLocalRepository _authLocalRepository;
  late AuthRemoteRepository _authRemoteRepository;

  @override
  AsyncValue<UserModel>? build() {
    _currentUserNotifier = ref.read(currentUserNotifierProvider.notifier);
    _currentConversation = ref.read(currentConversationProvider.notifier);
    _authLocalRepository = ref.read(authLocalRepositoryProvider);
    _authRemoteRepository = ref.read(authRemoteRepositoryProvider);
    return null;
  }

  Future<Either<AppFailure, AppSuccess>> createAccountRequest({
    required String email,
    required String username,
    required String pin,
    required String password,
    required String confirmationPassword,
    required File? imageFile,
  }) async {
    String? validationResult = validateCreateAccountRequest(
      imageFile: imageFile,
      email: email,
      username: username,
      pin: pin,
      password: password,
      confirmationPassword: confirmationPassword,
    );

    if (validationResult != null) {
      return Left(AppFailure(message: validationResult));
    }

    Either<AppFailure, AppSuccess> result = await _authRemoteRepository
        .createAccount(
          imageFile: imageFile!,
          email: email,
          username: username,
          pin: pin,
          password: password,
        );

    switch (result) {
      case Left(value: AppFailure(message: String message)):
        return Left(AppFailure(message: message));
      case Right(value: AppSuccess()):
        return Right(
          AppSuccess(
            message: "Account created. Please go to our inbox and activate it.",
          ),
        );
    }
  }

  Future<Either<AppFailure, AppSuccess>> sendEmail(String email) async {
    final String? validationResult = validateForgotPasswordRequest(
      email: email,
    );
    if (validationResult != null) {
      return Left(AppFailure(message: validationResult));
    }

    Either<AppFailure, AppSuccess> response = await _authRemoteRepository
        .forgotPassword(email);

    switch (response) {
      case Left(value: AppFailure(message: final message)):
        return Left(AppFailure(message: message));
      case Right(value: AppSuccess()):
        return Right(
          AppSuccess(
            message: "Email sent successfully, please check your inbox!",
          ),
        );
    }
  }

  Future<Either<AppFailure, AppSuccess>> changePassword({
    required BuildContext context,
    required String token,
    required String newPassword,
    required String confirmationPassword,
  }) async {
    String? validationResult = validateChangeForgottenPasswordRequest(
      newPassword: newPassword,
      confirmationPassword: confirmationPassword,
    );

    if (validationResult != null) {
      return Left(AppFailure(message: validationResult));
    }

    final Either<AppFailure, AppSuccess> result = await _authRemoteRepository
        .updateForgottenPassoword(password: newPassword, token: token);

    switch (result) {
      case Left(value: AppFailure(message: final message)):
        return Left(AppFailure(message: message));
      case Right():
        return Right(
          AppSuccess(message: "Password updated successfully, please login"),
        );
    }
  }

  Future<Either<AppFailure, AppSuccess>> verifyAccount(String token) async {
    Either<AppFailure, AppSuccess> result = await _authRemoteRepository
        .verifyAccount(token);

    switch (result) {
      case Right():
        return Right(AppSuccess(message: "Account account successfully"));
      case Left(value: AppFailure(message: final message)):
        return Left(AppFailure(message: message));
    }
  }

  Future<Either<AppFailure, AppSuccess>> login({
    required String emailOrPin,
    required String password,
  }) async {
    final String? validationResult = validateLoginRequest(
      emailOrPin: emailOrPin,
      password: password,
    );
    if (validationResult != null) {
      return Left(AppFailure(message: validationResult));
    }

    Either<AppFailure, UserModel> result = await _authRemoteRepository.login(
      email: emailOrPin.contains("@") ? emailOrPin : null,
      pin: !emailOrPin.contains("@") ? emailOrPin : null,
      password: password,
    );

    switch (result) {
      case Right(value: final user):
        _currentUserNotifier.addUser(user);
        _authLocalRepository.setToken(user.token);
        state = AsyncData(user);
        return Right(AppSuccess());
      case Left(value: AppFailure(message: final message)):
        return Left(AppFailure(message: message));
    }
  }

  Future<Either<AppFailure, AppSuccess>> updateProfileData({
    required String username,
    File? imageFile,
  }) async {
    String? validationResult = validateUpdateProfileDataRequest(
      imageFile: imageFile,
      username: username,
      old_username: ref.read(
        currentUserNotifierProvider.select((user) => user!.username),
      ),
    );

    if (validationResult != null) {
      return Left(AppFailure(message: validationResult));
    }

    Either<AppFailure, Map<String, dynamic>> result =
        await _authRemoteRepository.updateProfileData(
          token: _authLocalRepository.getToken()!,
          imageFile: imageFile,
          username: username,
        );

    switch (result) {
      case Left(value: AppFailure(message: String message)):
        return Left(AppFailure(message: message));
      case Right(value: Map<String, dynamic> map):
        _currentUserNotifier.updateUser(
          username: map["new_username"],
          profile_url: map["new_profile_url"],
        );
        return Right(AppSuccess(message: "Data updated!"));
    }
  }

  Future<Either<AppFailure, AppSuccess>> updatePassword({
    required String old_password,
    required String new_password,
    required String new_password_confirmation,
  }) async {
    String? validationResult = validateUpdatePasswordRequest(
      old_password: old_password,
      new_password: new_password,
      new_password_confirmation: new_password_confirmation,
    );

    if (validationResult != null) {
      return Left(AppFailure(message: validationResult));
    }

    Either<AppFailure, AppSuccess> result = await _authRemoteRepository
        .updatePassword(
          token: _authLocalRepository.getToken()!,
          old_password: old_password,
          new_password: new_password,
        );

    switch (result) {
      case Left(value: AppFailure(message: String message)):
        return Left(AppFailure(message: message));
      case Right(value: AppSuccess()):
        return Right(AppSuccess(message: "Password updated!"));
    }
  }

  Future<Either<AppFailure, AppSuccess>> deleteAccount() async {
    Either<AppFailure, AppSuccess> result = await _authRemoteRepository
        .deleteAccount(token: _authLocalRepository.getToken()!);

    switch (result) {
      case Left(value: AppFailure(message: String message)):
        return Left(AppFailure(message: message));
      case Right(value: AppSuccess()):
        _currentUserNotifier.clearUserData();
        await _authLocalRepository.clearSharedPreferences();
        return Right(AppSuccess());
    }
  }

  Future<bool> canUserGetToHome() async {
    final String? token = _authLocalRepository.getToken();
    if (token == null) {
      return false;
    }

    Either<AppFailure, UserModel> result = await _authRemoteRepository
        .getCurrentUser(token);

    switch (result) {
      case Right(value: final user):
        _currentUserNotifier.addUser(user);
        _authLocalRepository.setToken(user.token);
        state = AsyncData(user);
        return true;
      case Left(value: AppFailure()):
        return false;
    }
  }

  void getTokenAndPageFromDeepLinking(
    GlobalKey<NavigatorState> navigatorKey,
    StreamSubscription<Uri>? linkSubscription,
  ) {
    linkSubscription = AppLinks().uriLinkStream.listen((uri) {
      Map map = handleUri(uri);
      if (map["token"] != null) {
        AppNav.openAppLink(
          to: map["to"],
          token: map["token"],
          navigatorKey: navigatorKey,
        );
      }
    });
  }

  Future<void> initSharedPreferences() async {
    await _authLocalRepository.init();
  }

  Future<void> logout() async {
    await _authLocalRepository.clearSharedPreferences();
    _currentUserNotifier.clearUserData();
    _currentConversation.clear();
  }
}
