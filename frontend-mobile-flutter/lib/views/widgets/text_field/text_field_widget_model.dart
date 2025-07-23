import 'package:flutter/widgets.dart';

class TextFieldWidgetModel {
  String title;
  String hint;
  Function nextFunction;
  TextEditingController textEditingController;
  bool? isPassword;
  bool? isFull;
  bool? isForMessages;

  TextFieldWidgetModel({
    required this.title,
    required this.hint,
    required this.nextFunction,
    required this.textEditingController,
    this.isPassword,
    this.isFull,
    this.isForMessages,
  });
}
