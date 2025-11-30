import 'dart:io';

import 'package:connect/core/constants/server_urls.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/features/auth/models/user_model.dart';
import 'package:dio/dio.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'auth_remote_repository.g.dart';

@riverpod
AuthRemoteRepository authRemoteRepository(AuthRemoteRepositoryRef ref) {
  return AuthRemoteRepository();
}

class AuthRemoteRepository {
  final Dio _dio = Dio(
    BaseOptions(headers: {'Content-Type': 'application/json'}),
  );

  final String _baseUrl = "${ServerUrls.apiBaseUrl}/auth";

  Future<Either<AppFailure, AppSuccess>> createAccount({
    required File imageFile,
    required String email,
    required String username,
    required String pin,
    required String password,
  }) async {
    try {
      final String url = "$_baseUrl/create_new_account";
      final formData = FormData.fromMap({
        'email': email,
        'username': username,
        'pin': pin,
        'password': password,
        'image': await MultipartFile.fromFile(
          imageFile.path,
          filename: imageFile.path.split('/').last,
        ),
      });

      await _dio.post(
        url,
        data: formData,
        options: Options(headers: {'Content-Type': 'multipart/form-data'}),
      );

      return Right(AppSuccess());
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";
      final String error = e.response?.data["error"] ?? e.message;

      String message = "Something went wrong";

      if (result == "validation_error" && error == "invalid_email") {
        message = "Invalid email";
      } else if (result == "email_or_pin_taken") {
        message = "Email or pin is taken";
      }

      return Left(AppFailure(message: message));
    }
  }

  Future<Either<AppFailure, AppSuccess>> verifyAccount(String token) async {
    try {
      final String url = "$_baseUrl/verify_account/$token";
      await _dio.get(url);
      return Right(AppSuccess());
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";

      String message = "Something went wrong";
      switch (result) {
        case "token_not_found":
          message = "Token not found";
          break;
        case "user_not_found":
          message = "User not found";
          break;
        case "user_account_found":
          message = "User account deleted";
          break;
        case "user_already_verified":
          message = "User already verified";
          break;
      }

      return Left(AppFailure(message: message));
    }
  }

  Future<Either<AppFailure, AppSuccess>> forgotPassword(String email) async {
    try {
      final String url = "$_baseUrl/forgot_password";
      await _dio.post(
        url,
        data: {"email": email},
        options: Options(headers: {'Content-Type': 'application/json'}),
      );

      return Right(AppSuccess());
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";
      final String error = e.response?.data["error"] ?? e.message;

      String message = "Something went wrong";

      if (result == "validation_error" && error == "invalid_email") {
        message = "Invalid email";
      } else if (result == "user_not_found") {
        message = "User not found";
      } else if (result == "user_is_not_verified") {
        message = "Please verify your account first.";
      } else if (result == "user_account_deleted") {
        message = "User account deleted";
      } else if (result == "token_already_sent") {
        message = "Uoken already sent to this email";
      }

      return Left(AppFailure(message: message));
    }
  }

  Future<Either<AppFailure, AppSuccess>> updateForgottenPassoword({
    required String password,
    required String token,
  }) async {
    try {
      final String url = "$_baseUrl/update_forgotten_password";
      await _dio.put(url, data: {"password": password, "token": token});
      return Right(AppSuccess());
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";

      String message = "Something went wrong";
      switch (result) {
        case "token_not_found":
          message = "Token not found";
          break;
        case "user_not_found":
          message = "Token not found";
          break;
        case "user_not_verified":
          message = "User not verified";
          break;
        case "user_account_deleted":
          message = "User account deleted";
          break;
      }
      return Left(AppFailure(message: message));
    }
  }

  Future<Either<AppFailure, UserModel>> login({
    required String? pin,
    required String? email,
    required String password,
  }) async {
    try {
      final String url = "$_baseUrl/login";
      final Map<String, dynamic> data = {"password": password};
      if (pin != null) {
        data["pin"] = pin;
      } else {
        data["email"] = email;
      }

      final response = await _dio.post(url, data: data);

      if ((response.data as Map<String, dynamic>)["result"] != "logged_in") {
        return Left(AppFailure());
      }

      final UserModel userModel = UserModel.fromMap(response.data);
      return Right(userModel);
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";
      final String error = e.response?.data["error"] ?? e.message;

      String message = "Something went wrong";

      if (result == "validation_error" && error == "invalid_email") {
        message = "Invalid email";
      } else if (result == "wrong_email_or_password") {
        message = "Wrong email or password";
      } else if (result == "user_not_verified") {
        message = "Please verify your account first!";
      } else if (result == "user_account_deleted") {
        message = "This account has been deleted!";
      }

      return Left(AppFailure(message: message));
    }
  }

  Future<Either<AppFailure, UserModel>> getCurrentUser(String token) async {
    try {
      final String url = "$_baseUrl/";

      final response = await _dio.get(
        url,
        options: Options(headers: {"Authorization": "Bearer $token"}),
      );

      if ((response.data as Map<String, dynamic>)["result"] != "logged_in") {
        return Left(AppFailure());
      }

      final UserModel userModel = UserModel.fromMap(response.data);
      return Right(userModel);
    } on DioException catch (e) {
      return Left(AppFailure(message: e.toString()));
    }
  }
}
