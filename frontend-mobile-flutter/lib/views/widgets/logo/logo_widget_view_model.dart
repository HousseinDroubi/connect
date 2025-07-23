import 'package:connect/views/widgets/logo/logo_widget_model.dart';

class LogoViewModel {
  final String logoPath = "assets/icons/logo.png";
  LogoModel logoModel;
  LogoViewModel({required this.logoModel});
  String get title => logoModel.title;
}
