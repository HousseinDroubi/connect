import 'package:connect/utils/apis/auth_service.dart';
import 'package:connect/utils/dialog.dart';
import 'package:connect/utils/validate_requests.dart';
import 'package:connect/views/screens/update_forgotten_password/update_forgotten_password_model.dart';
import 'package:flutter/material.dart';

class UpdateForgottenPasswordViewModel {
  final TextEditingController _newPasswordController = TextEditingController();
  final TextEditingController _confirmationNewPasswordController =
      TextEditingController();

  TextEditingController get newPasswordController => _newPasswordController;
  TextEditingController get confirmationNewPasswordController =>
      _confirmationNewPasswordController;

  void changePassword(String token, BuildContext context) async {
    String new_password = _newPasswordController.text;
    String confirmation_password = _confirmationNewPasswordController.text;
    String? validationResult = validateChangeForgottenPasswordRequest(
      new_password: new_password,
      confirmation_password: confirmation_password,
    );

    if (validationResult != null) {
      showPopup(
        popupCase: PopupAlert(context: context, popupContent: validationResult),
      );
      return;
    }

    showPopup(popupCase: PopupLoading(context: context));
    final UpdateForgottenPasswordModel response = await AuthService()
        .updateForgottenPassoword(
          password: _newPasswordController.text,
          token: token,
        );
    hidePopup(context);
    final String popupText;
    if (response.result != "password_updated") {
      switch (response.result) {
        case "token_not_found":
          popupText = "Token not found";
          break;
        case "user_not_found":
          popupText = "User not found";
          break;
        case "user_not_verified":
          popupText = "User not verified";
          break;
        case "user_account_deleted":
          popupText = "User account deleted";
          break;

        default:
          popupText = "Something went wrong";
          break;
      }
    } else {
      _newPasswordController.text = "";
      _confirmationNewPasswordController.text = "";
      popupText = "Password updated successfully, please login";
    }
    showPopup(
      popupCase: PopupAlert(context: context, popupContent: popupText),
    );
  }
}
