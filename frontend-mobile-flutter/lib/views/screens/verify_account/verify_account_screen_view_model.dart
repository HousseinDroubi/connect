import 'package:connect/views/screens/login/login_screen.dart';
import 'package:flutter/material.dart';

class VerifyAccountScreenViewModel {
  static const String doneIconPath = "assets/icons/done.png";
  static const String errorIconPath = "assets/icons/error.png";
  static const String waitingIconPath = "assets/icons/waiting.png";

  void verifyAccount() {
    // Todo
  }

  void navigateToLogin(BuildContext context) {
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => LoginScreen()),
      (Route<dynamic> route) => false,
    );
  }
}
