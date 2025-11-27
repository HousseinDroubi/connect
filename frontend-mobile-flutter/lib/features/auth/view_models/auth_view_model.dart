import 'dart:io';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/features/auth/repositories/auth_repository.dart';
import 'package:connect/core/utils/validate_requests.dart';
import 'package:fpdart/fpdart.dart';

class AuthViewModel {
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

    Either<AppFailure, AppSuccess> result = await AuthRepository()
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

    Either<AppFailure, AppSuccess> response = await AuthRepository()
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
}
