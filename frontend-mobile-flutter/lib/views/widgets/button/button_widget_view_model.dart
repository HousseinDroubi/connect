import 'package:connect/views/widgets/button/button_widget_model.dart';

class ButtonWidgetViewModel {
  ButtonWidgetModel model;
  ButtonWidgetViewModel({required this.model});

  String get buttonText => model.buttonText;
  Function get buttonFn => model.buttonFn;
  bool get isColoredRed => model.isColoredRed!;
  bool get isDisabled => model.isDisabled!;
}
