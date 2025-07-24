import 'package:connect/views/widgets/underlined_text/underlined_text_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class UnderlinedTextViewModel {
  UnderlinedTextModel model;
  UnderlinedTextViewModel({required this.model});

  String get text => model.text;
  Widget get to => model.to;

  void navigateTo(BuildContext context) {
    Navigator.push(context, MaterialPageRoute(builder: (context) => to));
  }
}
