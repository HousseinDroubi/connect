import 'package:connect/views/screens/login/login.dart';
import 'package:flutter/material.dart';

class VerifyAccountViewModel {
  static const String doneIconPath = "assets/icons/done.png";
  static const String errorIconPath = "assets/icons/error.png";
  static const String waitingIconPath = "assets/icons/waiting.png";
  bool isDone = false;
  bool isError = false;

  void verifyAccount() {
    // Todo
  }

  void navigateToLogin(BuildContext context) {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => Login()),
      (Route<dynamic> route) => false,
    );
  }
}
