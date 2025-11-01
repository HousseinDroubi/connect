class VerifyAccountModel {
  String result;
  String? error;

  VerifyAccountModel._({required this.result, this.error});

  factory VerifyAccountModel.fromJson(Map<String, dynamic> response) {
    return VerifyAccountModel._(
      result: response["result"],
      error: response["error"],
    );
  }
}
