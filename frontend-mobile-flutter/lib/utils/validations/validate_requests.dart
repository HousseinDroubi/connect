import 'dart:io';

import 'package:connect/utils/validations/validate_properties.dart';

String? validateCreateAccountRequest({
  required File? imageFile,
  required String email,
  required String username,
  required String pin,
  required String password,
  required String confirmationPassword,
}) {
  List<String?> validations = [
    validateImage(imageFile: imageFile),
    validateEmail(email: email),
    validateUsername(username: username),
    validatePin(pin: pin),
    validatePassword(password: password),
    validatePassword(password: confirmationPassword),
    validatePasswordAndConfirmationPassword(
      password: password,
      confirmationPassword: confirmationPassword,
    ),
  ];

  for (String? validationResult in validations) {
    if (validationResult != null) return validationResult;
  }

  return null;
}

String? validateForgotPasswordRequest({required String email}) {
  return validateEmail(email: email);
}

String? validateChangeForgottenPasswordRequest({
  required String new_password,
  required String confirmation_password,
}) {
  List<String?> validations = [
    validatePassword(password: new_password),
    validatePassword(password: confirmation_password),
    validatePasswordAndConfirmationPassword(
      password: new_password,
      confirmationPassword: confirmation_password,
    ),
  ];

  for (String? validationResult in validations) {
    if (validationResult != null) return validationResult;
  }

  return null;
}
