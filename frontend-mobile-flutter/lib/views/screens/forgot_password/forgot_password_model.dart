class ForgotPasswordModel {
  String result;
  String? error;

  ForgotPasswordModel._({required this.result, this.error});

  factory ForgotPasswordModel.fromJson(Map<String, dynamic> response) {
    return ForgotPasswordModel._(
      result: response["result"],
      error: response["error"],
    );
  }
}
