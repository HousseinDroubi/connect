import 'dart:io';
import 'package:connect/models/auth_model.dart';
import 'package:connect/utils/apis/auth_service.dart';
import 'package:connect/utils/dialog.dart';
import 'package:connect/utils/validations/validate_requests.dart';
import 'package:connect/view_models/widgets/profile_widget_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CreateAccountScreenViewModel {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _pinController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmationPasswordController =
      TextEditingController();

  TextEditingController get emailController => _emailController;
  TextEditingController get usernameController => _usernameController;
  TextEditingController get pinController => _pinController;
  TextEditingController get passwordController => _passwordController;
  TextEditingController get confirmationPasswordController =>
      _confirmationPasswordController;
  ProfileWidgetViewModel profileWidgetViewModel = ProfileWidgetViewModel();

  Future<void> createAccountRequest(BuildContext context) async {
    File? imageFile = profileWidgetViewModel.imageFile;
    String email = emailController.text;
    String username = usernameController.text;
    String pin = pinController.text;
    String password = passwordController.text;
    String confirmation_password = confirmationPasswordController.text;
    String? validationResult = validateCreateAccountRequest(
      imageFile: imageFile,
      email: email,
      username: username,
      pin: pin,
      password: password,
      confirmationPassword: confirmation_password,
    );
    if (validationResult != null) {
      showPopup(
        popupCase: PopupAlert(context: context, popupContent: validationResult),
      );
      return;
    }
    showPopup(popupCase: PopupLoading(context: context));
    final AuthModel response = await AuthService().createAccount(
      imageFile: imageFile!,
      email: email,
      username: username,
      pin: pin,
      password: password,
    );
    hidePopup(context);
    String popup_alert_message;
    if (response.result != "account_created") {
      if (response.result == "validation_error" &&
          response.error == "invalid_email") {
        popup_alert_message = "Invalid email";
      } else if (response.result == "email_or_pin_taken") {
        popup_alert_message = "email or pin is taken";
      } else {
        popup_alert_message = "Something went wrong";
      }
    } else {
      profileWidgetViewModel.imageFile = null;
      profileWidgetViewModel.imageSource = null;
      emailController.text = "";
      usernameController.text = "";
      pinController.text = "";
      passwordController.text = "";
      confirmationPasswordController.text = "";
      popup_alert_message =
          "Account created. Please go to your inbox and activate it.";
    }
    showPopup(
      popupCase: PopupAlert(
        context: context,
        popupContent: popup_alert_message,
      ),
    );
  }
}
