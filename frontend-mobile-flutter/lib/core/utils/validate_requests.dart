import 'dart:io';

import 'package:connect/core/utils/validate_properties.dart';

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
  required String newPassword,
  required String confirmationPassword,
}) {
  List<String?> validations = [
    validatePassword(password: newPassword),
    validatePassword(password: confirmationPassword),
    validatePasswordAndConfirmationPassword(
      password: newPassword,
      confirmationPassword: confirmationPassword,
    ),
  ];

  for (String? validationResult in validations) {
    if (validationResult != null) return validationResult;
  }

  return null;
}

String? validateLoginRequest({
  required String emailOrPin,
  required String password,
}) {
  List<String?> validations = [];
  if (emailOrPin.contains("@")) {
    validations.add(validateEmail(email: emailOrPin));
  } else {
    validations.add(validatePin(pin: emailOrPin));
  }
  validations.add(validatePassword(password: password));

  print(validations);
  for (String? validationResult in validations) {
    if (validationResult != null) return validationResult;
  }
  return null;
}

String? validateUpdateProfileDataRequest({File? imageFile, String? username}) {
  if (imageFile == null && username == null) {
    return "Either change username and/or update your profile";
  }

  List<String?> validations = [];

  if (imageFile != null) {
    validateImage(imageFile: imageFile);
  }

  if (username != null) {
    validateUsername(username: username);
  }

  for (String? validationResult in validations) {
    if (validationResult != null) return validationResult;
  }

  return null;
}
