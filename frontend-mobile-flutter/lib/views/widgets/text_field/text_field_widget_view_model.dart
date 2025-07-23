import 'package:connect/views/widgets/text_field/text_field_widget_model.dart';

class TextFieldWidgetViewModel {
  String openedEyeIconPath = "assets/icons/opened_eye.png";
  String closedEyeIconPath = "assets/icons/closed_eye.png";
  TextFieldWidgetModel model;
  TextFieldWidgetViewModel({required this.model});

  String get title => model.title;
  String get hint => model.hint;
  String get defaultValue => model.defaultValue;
  Function get nextFunction => model.nextFunction;
  bool get isPassword => model.isPassword ?? false;
  bool get isFull => model.isFull ?? false;
  bool get isForMessages => model.isForMessages ?? false;

  set value(String newValue) {
    model.defaultValue = newValue;
  }
}
