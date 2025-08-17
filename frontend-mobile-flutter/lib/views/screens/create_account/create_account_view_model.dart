import 'package:connect/views/widgets/profile/profile_widget_config.dart';
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
}
