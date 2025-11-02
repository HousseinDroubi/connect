import 'dart:io';

import 'package:connect/constants/urls.dart';
import 'package:connect/models/auth_model.dart';
import 'package:dio/dio.dart';

class AuthService {
  final Dio _dio = Dio(
    BaseOptions(headers: {'Content-Type': 'application/json'}),
  );
  final String _base_url = "${api_base_url}/auth";
  Future<AuthModel> createAccount({
    required File imageFile,
    required String email,
    required String username,
    required String pin,
    required String password,
  }) async {
    try {
      final String url = "$_base_url/create_new_account";
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
      final response = await _dio.post(
        url,
        data: formData,
        options: Options(headers: {'Content-Type': 'multipart/form-data'}),
      );
      return AuthModel.fromJson(response.data);
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";
      final String error = e.response?.data["error"] ?? e.message;

      return AuthModel.fromJson({"result": result, "error": error});
    }
  }

  Future<AuthModel> verifyAccount(String token) async {
    try {
      final String url = "$_base_url/verify_account/$token";
      final response = await _dio.get(
        url,
        options: Options(headers: {'Content-Type': 'application/json'}),
      );
      return AuthModel.fromJson(response.data);
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";
      final String error = e.response?.data["error"] ?? e.message;

      return AuthModel.fromJson({"result": result, "error": error});
    }
  }

  Future<AuthModel> forgotPassword(String email) async {
    try {
      final String url = "$_base_url/forgot_password";
      final response = await _dio.post(
        url,
        data: {"email": email},
        options: Options(headers: {'Content-Type': 'application/json'}),
      );
      return AuthModel.fromJson(response.data);
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";
      final String error = e.response?.data["error"] ?? e.message;

      return AuthModel.fromJson({"result": result, "error": error});
    }
  }

  Future<AuthModel> updateForgottenPassoword({
    required String password,
    required String token,
  }) async {
    try {
      final String url = "$_base_url/update_forgotten_password";
      final response = await _dio.put(
        url,
        data: {"password": password, "token": token},
        options: Options(headers: {'Content-Type': 'application/json'}),
      );
      return AuthModel.fromJson(response.data);
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";
      final String error = e.response?.data["error"] ?? e.message;

      return AuthModel.fromJson({"result": result, "error": error});
    }
  }
}
