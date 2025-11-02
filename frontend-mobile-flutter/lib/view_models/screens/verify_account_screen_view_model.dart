import 'package:connect/models/auth_model.dart';
import 'package:connect/utils/apis/auth_service.dart';
import 'package:connect/utils/dialog.dart';
import 'package:flutter/material.dart';

class VerifyAccountScreenViewModel {
  static const String doneIconPath = "assets/icons/done.png";
  static const String errorIconPath = "assets/icons/error.png";
  static const String waitingIconPath = "assets/icons/waiting.png";
  bool isDone = false;
  bool isError = false;

  Future<void> verifyAccount(String token, BuildContext context) async {
    AuthModel response = await AuthService().verifyAccount(token);
    String popup_text;
    if (response.result != "user_verified") {
      isDone = false;
      isError = true;
      switch (response.result) {
        case "token_not_found":
          popup_text = "Token not found";
          break;
        case "user_not_found":
          popup_text = "User not found";
          break;
        case "user_account_found":
          popup_text = "User account deleted";
          break;
        case "user_already_verified":
          popup_text = "User already verified";
          break;
        default:
          popup_text = "Something went wrong";
          break;
      }
    } else {
      popup_text = "Account account successfully";
      isDone = true;
    }
    showPopup(
      popupCase: PopupAlert(context: context, popupContent: popup_text),
    );
  }

  void navigateToLogin(BuildContext context) {
    Navigator.of(
      context,
    ).pushNamedAndRemoveUntil("/login", (Route<dynamic> route) => false);
  }
}
