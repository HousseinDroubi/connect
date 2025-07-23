import 'package:connect/views/widgets/text_field/text_field_widget_model.dart';

class TextFieldWidgetViewModel {
  TextFieldModel model;
  TextFieldWidgetViewModel({required this.model});

  String get title => model.title;
  String get hint => model.hint;
  String get defaultValue => model.defaultValue;
  Function get nextFunction => model.nextFunction;
  bool get isPassword => model.isPassword!;
  bool get isFull => model.isFull!;
  bool get isForMessages => model.isForMessages!;
}
