// ignore_for_file: non_constant_identifier_names

import 'dart:io';
import 'dart:typed_data';

import 'package:connect/core/constants/server_urls.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:dio/dio.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'messages_repository.g.dart';

@riverpod
MessagesRepository messagesRepository(MessagesRepositoryRef ref) {
  return MessagesRepository();
}

class MessagesRepository {
  final Dio _dio = Dio(
    BaseOptions(headers: {'Content-Type': 'application/json'}),
  );

  final String _baseUrl = "${ServerUrls.apiBaseUrl}/message";
  Future<Uint8List?> viewImage({
    required String token,
    required String message_id,
  }) async {
    try {
      final String url = "$_baseUrl/view_image/$message_id";
      final response = await _dio.get(
        url,
        options: Options(
          responseType: ResponseType.bytes,
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer $token",
          },
        ),
      );

      if (response.statusCode != 200) {
        return null;
      }

      return Uint8List.fromList(response.data);
    } catch (e) {
      return null;
    }
  }

  Future<Either<AppFailure, AppSuccess>> deleteMessageForSender({
    required String token,
    required String message_id,
  }) async {
    try {
      final String url = "$_baseUrl/delete_message_for_sender/$message_id";
      final response = await _dio.delete(
        url,
        options: Options(
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer $token",
          },
        ),
      );

      if (response.statusCode != 200) {
        return Left(AppFailure());
      }

      return Right(AppSuccess());
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";

      String message = "Something went wrong";

      switch (result) {
        case "invalid_id":
          message = "Token expired, please login again!";
          break;
        case "user_account_deleted":
          message = "Account already deleted.";
          break;
        case "message_id_is_invalid":
          message = "Message id is invalid";
          break;
        case "message_not_found":
          message = "Message not found";
          break;
        case "message_deleted":
          message = "Already deleted";
          break;
      }

      return Left(AppFailure(message: message));
    }
  }

  Future<Either<AppFailure, String>> uploadImage({
    required String token,
    required File imageFile,
  }) async {
    try {
      final String url = "$_baseUrl/upload_image";
      final formData = FormData.fromMap({
        'image': await MultipartFile.fromFile(
          imageFile.path,
          filename: imageFile.path.split('/').last,
        ),
      });

      final result = await _dio.post(
        url,
        data: formData,
        options: Options(
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer $token",
          },
        ),
      );

      if (result.statusCode != 200) {
        return Left(AppFailure());
      }

      return Right(result.data["file_name"]);
    } on DioException catch (e) {
      final String result = e.response?.data["result"] ?? "failed";

      String message = "Something went wrong";
      switch (result) {
        case "invalid_id":
          message = "Token expired, please login again!";
          break;
        case "user_account_deleted":
          message = "Account already deleted.";
          break;
        case "missing_image":
          message = "Missing image";
          break;
      }
      return Left(AppFailure(message: message));
    }
  }
}
