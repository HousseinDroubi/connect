import 'package:connect/core/utils/app_nav.dart';
import 'package:connect/features/auth/models/auth_model.dart';
import 'package:connect/features/auth/repositories/auth_repository.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:flutter/material.dart';

class VerifyAccountScreenViewModel {
  static const String doneIconPath = "assets/icons/done.png";
  static const String errorIconPath = "assets/icons/error.png";
  static const String waitingIconPath = "assets/icons/waiting.png";
  bool isDone = false;
  bool isError = false;

  Future<void> verifyAccount(String token, BuildContext context) async {
    AuthModel response = await AuthRepository().verifyAccount(token);
    String popupText;
    if (response.result != "user_verified") {
      isDone = false;
      isError = true;
      switch (response.result) {
        case "token_not_found":
          popupText = "Token not found";
          break;
        case "user_not_found":
          popupText = "User not found";
          break;
        case "user_account_found":
          popupText = "User account deleted";
          break;
        case "user_already_verified":
          popupText = "User already verified";
          break;
        default:
          popupText = "Something went wrong";
          break;
      }
    } else {
      popupText = "Account account successfully";
      isDone = true;
    }
    showPopup(
      popupCase: PopupAlert(context: context, popupContent: popupText),
    );
  }

  void navigateToLogin(BuildContext context) {
    AppNav.pushAndRemoveUntil(context, "login");
  }
}
