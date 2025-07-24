import 'package:connect/views/widgets/underlined_text/underlined_text_model.dart';

class UnderlinedTextViewModel {
  UnderlinedTextModel model;
  UnderlinedTextViewModel({required this.model});

  String get text => model.text;
  Function get navigateTo => model.navigateTo;
}
