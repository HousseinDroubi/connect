class LogoWidgetConfig {
  static const String logoPath = "assets/icons/logo.png";
  final String _title;

  const LogoWidgetConfig({required String title}) : _title = title;

  String get title => _title;
}
