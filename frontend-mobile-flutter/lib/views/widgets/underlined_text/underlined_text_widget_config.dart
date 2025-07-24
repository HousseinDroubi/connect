import 'package:flutter/material.dart';

class UnderlinedTextWidgetConfig {
  final String _text;
  final Widget _to;

  const UnderlinedTextWidgetConfig({required String text, required Widget to})
    : _text = text,
      _to = to;

  String get text => _text;
  Widget get to => _to;

  void navigateTo(BuildContext context) {
    Navigator.push(context, MaterialPageRoute(builder: (context) => to));
  }
}
