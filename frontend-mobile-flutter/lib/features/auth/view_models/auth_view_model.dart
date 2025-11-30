import 'dart:async';
import 'dart:io';
import 'package:app_links/app_links.dart';
import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/utils/app_nav.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/utils.dart';
import 'package:connect/features/auth/models/user_model.dart';
import 'package:connect/features/auth/repositories/auth_remote_repository.dart';
import 'package:connect/core/utils/validate_requests.dart';
import 'package:flutter/material.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'auth_view_model.g.dart';

@riverpod
class AuthViewModel extends _$AuthViewModel {
  @override
  AsyncValue<UserModel>? build() {
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

    Either<AppFailure, AppSuccess> result = await AuthRemoteRepository()
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

    Either<AppFailure, AppSuccess> response = await AuthRemoteRepository()
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

    final Either<AppFailure, AppSuccess> result = await AuthRemoteRepository()
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
    Either<AppFailure, AppSuccess> result = await AuthRemoteRepository()
        .verifyAccount(token);

    switch (result) {
      case Right():
        return Right(AppSuccess(message: "Account account successfully"));
      case Left(value: AppFailure(message: final message)):
        return Left(AppFailure(message: message));
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
}
