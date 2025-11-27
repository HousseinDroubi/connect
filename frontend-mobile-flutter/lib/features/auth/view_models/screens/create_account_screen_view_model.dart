import 'dart:io';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/features/auth/repositories/auth_service.dart';
import 'package:connect/core/utils/validate_requests.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:fpdart/fpdart.dart';

class CreateAccountScreenViewModel {
  Future<Either<AppFailure, AppSuccess>> createAccountRequest({
    required BuildContext context,
    required String email,
    required String username,
    required String pin,
    required String password,
    required String confirmationPassword,
    required File imageFile,
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

    Either<AppFailure, AppSuccess> result = await AuthService().createAccount(
      imageFile: imageFile,
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
}
