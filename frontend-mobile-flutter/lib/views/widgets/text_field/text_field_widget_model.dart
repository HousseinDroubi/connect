class TextFieldModel {
  String title;
  String hint;
  Function nextFunction;
  String defaultValue;
  bool? isPassword;
  bool? isFull;
  bool? isForMessages;

  TextFieldModel({
    required this.title,
    required this.hint,
    required this.nextFunction,
    required this.defaultValue,
    this.isPassword,
    this.isFull,
    this.isForMessages,
  });
}
