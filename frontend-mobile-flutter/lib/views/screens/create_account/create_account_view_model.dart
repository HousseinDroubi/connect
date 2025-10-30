import 'package:connect/constants/my_colors.dart';
import 'package:connect/utils/dialog.dart';
import 'package:connect/utils/validate_requests.dart';
import 'package:connect/views/widgets/profile/profile_widget_config.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CreateAccountViewModel {
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
  ProfileWidgetConfig profileWidgetConfig = ProfileWidgetConfig();

  void createAccountRequest(BuildContext context) {
    String? validationResult = validateCreateAccountRequest(
      imageFile: profileWidgetConfig.imageFile,
      email: emailController.text,
      username: usernameController.text,
      pin: pinController.text,
      password: passwordController.text,
      confirmationPassword: confirmationPasswordController.text,
    );
    if (validationResult != null) {
      showPopup(
        popupCase: PopupAlert(context: context, popupContent: validationResult),
      );
      return;
    }
  }
}
