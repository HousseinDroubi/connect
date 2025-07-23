import 'package:connect/views/widgets/button/button_widget_model.dart';

class ButtonWidgetViewModel {
  ButtonWidgetModel buttonWidgetModel;
  ButtonWidgetViewModel({required this.buttonWidgetModel});

  String get buttonText => buttonWidgetModel.buttonText;
  Function get buttonFn => buttonWidgetModel.buttonFn;
  bool get isColoredRed => buttonWidgetModel.isColoredRed!;
  bool get isDisabled => buttonWidgetModel.isDisabled!;
}
