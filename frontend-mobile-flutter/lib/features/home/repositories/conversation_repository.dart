import 'package:connect/core/constants/server_urls.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/features/home/models/conversation_model.dart';
import 'package:dio/dio.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'conversation_repository.g.dart';

@riverpod
ConversationRepository conversationRepository(ConversationRepositoryRef ref) {
  return ConversationRepository();
}

class ConversationRepository {
  final Dio _dio = Dio(
    BaseOptions(headers: {'Content-Type': 'application/json'}),
  );

  final String _baseUrl = "${ServerUrls.apiBaseUrl}/conversation";

  Future<Either<AppFailure, ConversationModel>> getConversationMessages({
    required String token,
    required String pin,
  }) async {
    try {
      final String url = "$_baseUrl/get_messages/$pin";
      final response = await _dio.get(
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

      final ConversationModel conversation = ConversationModel.fromMap(
        response.data,
      );

      return Right(conversation);
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
        case "same_user":
          message = "Same user";
          break;
        case "other_user_not_found":
          message = "Other user not found";
          break;
        case "other_user_not_verified":
          message = "Other user not verified";
          break;
        case "other_user_account_deleted":
          message = "Other user account deleted";
          break;
        case "user_not_in_conversation":
          message = "User not in conversation";
          break;
      }
      return Left(AppFailure(message: message));
    }
  }
}
