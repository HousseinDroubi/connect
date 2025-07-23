class ButtonWidgetModel {
  String buttonText;
  Function buttonFn;
  bool? isColoredRed;
  bool? isDisabled;

  ButtonWidgetModel({
    required this.buttonText,
    required this.buttonFn,
    this.isColoredRed,
    this.isDisabled,
  });
}
