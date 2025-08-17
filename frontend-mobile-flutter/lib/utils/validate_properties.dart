import 'dart:io';

String? validateImage({required File? imageFile}) {
  if (imageFile == null) return "Image is required";
  return null;
}

String? validateEmail({required String email}) {
  if (email.isEmpty) return "Email is required";
  if (!email.contains("@") || email.length <= 4) return "Invalid email";
  return null;
}

String? validateUsername({required String username}) {
  if (username.isEmpty) return "Username is required";
  if (username.length < 3) return "Username must be minimum 3 digits";
  if (username.length > 10) return "Username must be maximum 10 digits";
  return null;
}

String? validatePin({required String pin}) {
  if (!(pin.length == 6)) return "Pin must be exactly 6 digits";
  return null;
}

String? validatePassword({required String password}) {
  if (password.length < 5) return "Password must be minimum 5 digits";
  if (password.length > 20) return "Password must be maximum 20 digits";
  return null;
}

String? validatePasswordAndConfirmationPassword({
  required String password,
  required String confirmationPassword,
}) {
  return password == confirmationPassword
      ? null
      : "Password must match confirmation password";
}
