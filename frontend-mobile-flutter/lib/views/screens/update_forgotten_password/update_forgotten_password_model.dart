class UpdateForgottenPasswordModel {
  String result;
  String? error;

  UpdateForgottenPasswordModel._({required this.result, this.error});

  factory UpdateForgottenPasswordModel.fromJson(Map<String, dynamic> response) {
    return UpdateForgottenPasswordModel._(
      result: response["result"],
      error: response["error"],
    );
  }
}
