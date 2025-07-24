import 'package:flutter/widgets.dart';

class TextFieldWidgetConfig {
  static const String openedEyeIconPath = "assets/icons/opened_eye.png";
  static const String closedEyeIconPath = "assets/icons/closed_eye.png";
  static const String sendMessageIconPath = "assets/icons/send_message.png";
  static const String galleryIconPath = "assets/icons/gallery.png";

  final String _title;
  final String _hint;
  final Function _nextFunction;
  final TextEditingController _textEditingController;
  final bool? _isPassword;
  final bool? _isFull;
  final bool? _isForMessages;

  const TextFieldWidgetConfig({
    required String title,
    required String hint,
    required Function nextFunction,
    required TextEditingController textEditingController,
    bool? isPassword,
    bool? isFull,
    bool? isForMessages,
  }) : _title = title,
       _hint = hint,
       _nextFunction = nextFunction,
       _textEditingController = textEditingController,
       _isPassword = isPassword,
       _isFull = isFull,
       _isForMessages = isForMessages;

  String get title => _title;
  String get hint => _hint;
  Function get nextFunction => _nextFunction;
  TextEditingController get textEditingController => _textEditingController;
  bool get isPassword => _isPassword ?? false;
  bool get isFull => _isFull ?? false;
  bool get isForMessages => _isForMessages ?? false;

  void sendMessage() {
    // Todo
  }

  void pickUpImage() {
    // Todo
  }
}
