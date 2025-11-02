class ButtonWidgetViewModel {
  final String _buttonText;
  final Function _buttonFn;
  final bool? _isColoredRed;
  final bool? _isDisabled;

  const ButtonWidgetViewModel({
    required String buttonText,
    required Function buttonFn,
    bool? isColoredRed,
    bool? isDisabled,
  }) : _buttonText = buttonText,
       _buttonFn = buttonFn,
       _isColoredRed = isColoredRed,
       _isDisabled = isDisabled;

  String get buttonText => _buttonText;
  Function get buttonFn => _buttonFn;
  bool get isColoredRed => _isColoredRed ?? false;
  bool get isDisabled => _isDisabled ?? false;
}
