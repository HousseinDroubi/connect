import 'package:flutter/material.dart';

class UpdateForgottenPasswordScreenViewModel {
  final TextEditingController _newPasswordController = TextEditingController();
  final TextEditingController _confirmationNewPasswordController =
      TextEditingController();

  TextEditingController get newPasswordController => _newPasswordController;
  TextEditingController get confirmationNewPasswordController =>
      _confirmationNewPasswordController;

  void changePassword() {
    // Todo
  }
}
