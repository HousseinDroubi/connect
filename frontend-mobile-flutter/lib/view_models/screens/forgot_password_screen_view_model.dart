import 'package:connect/models/auth_model.dart';
import 'package:connect/utils/apis/auth_service.dart';
import 'package:connect/utils/dialog.dart';
import 'package:connect/utils/validations/validate_requests.dart';
import 'package:flutter/widgets.dart';

class ForgotPasswordScreenViewModel {
  final TextEditingController _emailController = TextEditingController();

  TextEditingController get emailController => _emailController;

  Future<void> sendEmail(BuildContext context) async {
    final String? validation_result = validateForgotPasswordRequest(
      email: _emailController.text,
    );
    if (validation_result != null) {
      showPopup(
        popupCase: PopupAlert(
          context: context,
          popupContent: validation_result,
        ),
      );
      return;
    }
    showPopup(popupCase: PopupLoading(context: context));
    final AuthModel response = await AuthService().forgotPassword(
      _emailController.text,
    );
    hidePopup(context);

    final String popupText;
    if (response.result != "email_sent") {
      if (response.result == "validation_error" &&
          response.error == "invalid_email") {
        popupText = "Invalid email";
      } else if (response.result == "user_not_found") {
        popupText = "User not found";
      } else if (response.result == "user_is_not_verified") {
        popupText = "Please verify your account first.";
      } else if (response.result == "user_account_deleted") {
        popupText = "User account deleted";
      } else if (response.result == "token_already_sent") {
        popupText = "Token already sent to you";
      } else {
        popupText = "Something went wrong";
      }
    } else {
      _emailController.text = "";
      popupText = "Email sent successfully, please check your inbox!";
    }
    showPopup(
      popupCase: PopupAlert(context: context, popupContent: popupText),
    );
  }
}
