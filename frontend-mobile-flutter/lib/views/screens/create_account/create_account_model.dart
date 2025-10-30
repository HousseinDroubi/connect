class CreateAccountModel {
  String result;
  String? error;

  CreateAccountModel._({required this.result, this.error});

  factory CreateAccountModel.fromJson(Map<String, dynamic> response){
    return CreateAccountModel._(
        result:response["result"],
        error: response["error"]
    );
  }

}