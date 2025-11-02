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
    String confirmationPassword = confirmationPasswordController.text;
    String? validationResult = validateCreateAccountRequest(
      imageFile: imageFile,
      email: email,
      username: username,
      pin: pin,
      password: password,
      confirmationPassword: confirmationPassword,
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
    String popupAlertMessage;
    if (response.result != "account_created") {
      if (response.result == "validation_error" &&
          response.error == "invalid_email") {
        popupAlertMessage = "Invalid email";
      } else if (response.result == "email_or_pin_taken") {
        popupAlertMessage = "email or pin is taken";
      } else {
        popupAlertMessage = "Something went wrong";
      }
    } else {
      profileWidgetViewModel.imageFile = null;
      profileWidgetViewModel.imageSource = null;
      emailController.text = "";
      usernameController.text = "";
      pinController.text = "";
      passwordController.text = "";
      confirmationPasswordController.text = "";
      popupAlertMessage =
          "Account created. Please go to your inbox and activate it.";
    }
    showPopup(
      popupCase: PopupAlert(context: context, popupContent: popupAlertMessage),
    );
  }
}
