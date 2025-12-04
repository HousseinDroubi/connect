// ignore_for_file: non_constant_identifier_names

import 'dart:typed_data';

import 'package:connect/core/constants/server_urls.dart';
import 'package:dio/dio.dart';
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
}
