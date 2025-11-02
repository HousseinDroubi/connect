class LogoWidgetViewModel {
  static const String logoPath = "assets/icons/logo.png";
  final String _title;

  const LogoWidgetViewModel({required String title}) : _title = title;

  String get title => _title;
}
