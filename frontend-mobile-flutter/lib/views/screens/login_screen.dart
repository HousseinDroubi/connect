import 'package:connect/views/screens/create_account_screen.dart';
import 'package:connect/views/screens/forgot_password_screen.dart';
import 'package:connect/view_models/screens/login_screen_view_model.dart';
import 'package:connect/views/widgets/button_widget.dart';
import 'package:connect/view_models/widgets/button_widget_view_model.dart';
import 'package:connect/views/widgets/logo_widget.dart';
import 'package:connect/view_models/widgets/logo_widget_view_model.dart';
import 'package:connect/view_models/widgets/text_field_widget_view_model.dart';
import 'package:connect/views/widgets/text_field_widget.dart';
import 'package:connect/view_models/widgets/underlined_text_widget_view_model.dart';
import 'package:connect/views/widgets/underlined_text_widget.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final LoginScreenViewModel viewModel = LoginScreenViewModel();

  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _passwordFocusNode = FocusNode();

  Future<void> loginButtonFunction() async {
    // TODO
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: IntrinsicWidth(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              LogoWidget(
                viewModel: LogoWidgetViewModel(title: "Welcome to Connect"),
              ),
              SizedBox(height: 30),
              TextFieldWidget(
                viewModel: TextFieldWidgetViewModel(
                  focusNode: _emailFocusNode,
                  title: "Email or pin",
                  hint: "Enter your email or pin",
                  nextFunction: () {
                    FocusScope.of(context).requestFocus(_passwordFocusNode);
                  },
                  textEditingController: viewModel.emailController,
                ),
              ),
              SizedBox(height: 20),
              TextFieldWidget(
                viewModel: TextFieldWidgetViewModel(
                  title: "Password",
                  hint: "Enter your password",
                  nextFunction: () async {
                    await loginButtonFunction();
                  },
                  textEditingController: viewModel.passwordController,
                  isPassword: true,
                ),
              ),
              SizedBox(height: 10),
              Container(
                alignment: Alignment.centerRight,
                child: UnderlinedTextWidget(
                  viewModel: UnderlinedTextWidgetViewModel(
                    text: "Forgot Password?",
                    to: ForgotPasswordScreen(),
                  ),
                ),
              ),
              SizedBox(height: 13),
              ButtonWidget(
                viewModel: ButtonWidgetViewModel(
                  buttonText: "Login",
                  buttonFn: () async {
                    await loginButtonFunction();
                  },
                ),
              ),
              SizedBox(height: 10),
              UnderlinedTextWidget(
                viewModel: UnderlinedTextWidgetViewModel(
                  text: "Don’t have an account? Sign up",
                  to: CreateAccountScreen(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
