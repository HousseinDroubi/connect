import 'package:connect/core/classes/person.dart';
import 'package:connect/core/constants/server_urls.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:dio/dio.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'home_users_repository.g.dart';

@riverpod
HomeUsersRepository homeUsersRepository(HomeUsersRepositoryRef ref) {
  return HomeUsersRepository();
}

class HomeUsersRepository {
  final Dio _dio = Dio(
    BaseOptions(headers: {'Content-Type': 'application/json'}),
  );

  final String _baseUrl = "${ServerUrls.apiBaseUrl}/user";

  Future<Either<AppFailure, List<Person>>> searchForUsers({
    required String token,
    required String content,
  }) async {
    try {
      final String url = "$_baseUrl/search/$content";
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

      final List<Person> users = [];
      final responseList = response.data["users"] as List<dynamic>;
      for (int i = 0; i < (responseList).length; i++) {
        users.add(Person.fromMap(responseList[i]));
      }

      return Right(users);
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
      }
      return Left(AppFailure(message: message));
    }
  }
}
