import 'package:connect/features/auth/models/auth_model.dart';
import 'package:connect/features/auth/repositories/auth_service.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/core/utils/validate_requests.dart';
import 'package:flutter/material.dart';

class UpdateForgottenPasswordScreenViewModel {
  final TextEditingController _newPasswordController = TextEditingController();
  final TextEditingController _confirmationNewPasswordController =
      TextEditingController();

  TextEditingController get newPasswordController => _newPasswordController;
  TextEditingController get confirmationNewPasswordController =>
      _confirmationNewPasswordController;

  Future<void> changePassword(String token, BuildContext context) async {
    String newPassword = _newPasswordController.text;
    String confirmationPassword = _confirmationNewPasswordController.text;
    String? validationResult = validateChangeForgottenPasswordRequest(
      newPassword: newPassword,
      confirmationPassword: confirmationPassword,
    );

    if (validationResult != null) {
      showPopup(
        popupCase: PopupAlert(context: context, popupContent: validationResult),
      );
      return;
    }

    showPopup(popupCase: PopupLoading(context: context));
    final AuthModel response = await AuthService().updateForgottenPassoword(
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
