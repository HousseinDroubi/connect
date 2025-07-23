import 'package:connect/views/widgets/text_field/text_field_widget_model.dart';
import 'package:flutter/widgets.dart';

class TextFieldWidgetViewModel {
  String openedEyeIconPath = "assets/icons/opened_eye.png";
  String closedEyeIconPath = "assets/icons/closed_eye.png";
  TextFieldWidgetModel model;
  TextFieldWidgetViewModel({required this.model});

  String get title => model.title;
  String get hint => model.hint;
  TextEditingController get textEditingController =>
      model.textEditingController;
  Function get nextFunction => model.nextFunction;
  bool get isPassword => model.isPassword ?? false;
  bool get isFull => model.isFull ?? false;
  bool get isForMessages => model.isForMessages ?? false;
}
