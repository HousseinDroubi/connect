class AuthModel {
  String result;
  String? error;

  AuthModel._({required this.result, this.error});

  factory AuthModel.fromJson(Map<String, dynamic> response) {
    return AuthModel._(result: response["result"], error: response["error"]);
  }
}
