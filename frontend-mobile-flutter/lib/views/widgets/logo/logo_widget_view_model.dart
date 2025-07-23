import 'package:connect/views/widgets/logo/logo_widget_model.dart';

class LogoWidgetViewModel {
  final String logoPath = "assets/icons/logo.png";
  LogoWidgetModel model;
  LogoWidgetViewModel({required this.model});
  String get title => model.title;
}
