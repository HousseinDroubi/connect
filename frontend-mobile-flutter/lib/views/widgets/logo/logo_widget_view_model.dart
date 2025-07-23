import 'package:connect/views/widgets/logo/logo_widget_model.dart';

class LogoWidgetViewModel {
  final String logoPath = "assets/icons/logo.png";
  LogoWidgetModel logoWidgetModel;
  LogoWidgetViewModel({required this.logoWidgetModel});
  String get title => logoWidgetModel.title;
}
