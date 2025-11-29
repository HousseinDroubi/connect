import 'package:connect/features/auth/views/screens/login_screen.dart';
import 'package:connect/features/auth/views/screens/update_forgotten_password_screen.dart';
import 'package:connect/features/auth/views/screens/verify_account_screen.dart';
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

  static void openAppLink({
    required String to,
    required String token,
    required GlobalKey<NavigatorState> navigatorKey,
  }) {
    navigatorKey.currentState?.pushAndRemoveUntil(
      MaterialPageRoute(
        builder: (context) => to == "update_forgotten_password"
            ? UpdateForgottenPasswordScreen(token: token)
            : to == "verify_account"
            ? VerifyAccountScreen(token: token)
            : LoginScreen(),
      ),
      (Route<dynamic> route) => false,
    );
  }
}
