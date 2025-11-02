import 'dart:io';

import 'package:connect/utils/validate_properties.dart';

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
