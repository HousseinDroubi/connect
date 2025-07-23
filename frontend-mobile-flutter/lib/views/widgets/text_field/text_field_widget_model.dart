class TextFieldWidgetModel {
  String title;
  String hint;
  Function nextFunction;
  String defaultValue;
  bool? isPassword;
  bool? isFull;
  bool? isForMessages;

  TextFieldWidgetModel({
    required this.title,
    required this.hint,
    required this.nextFunction,
    required this.defaultValue,
    this.isPassword,
    this.isFull,
    this.isForMessages,
  });
}
