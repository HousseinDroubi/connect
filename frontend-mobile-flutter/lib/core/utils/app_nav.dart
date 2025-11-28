import 'package:flutter/material.dart';

class AppNav {
  static void push(BuildContext context, String to) {
    Navigator.pushNamed(context, "/$to");
  }

  static void pushAndRemoveUntil(BuildContext context, String to) {
    Navigator.pushNamedAndRemoveUntil(
      context,
      "/$to",
      (Route<dynamic> route) => false,
    );
  }

  static void pop(BuildContext context) {
    Navigator.pop(context);
  }

  static void openAppLink(String to, GlobalKey<NavigatorState> navigatorKey) {
    navigatorKey.currentState?.pushNamedAndRemoveUntil(
      "/$to",
      (Route<dynamic> route) => false,
    );
  }
}
