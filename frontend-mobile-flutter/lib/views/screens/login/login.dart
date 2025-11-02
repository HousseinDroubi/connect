import 'package:connect/views/screens/create_account/create_account.dart';
import 'package:connect/views/screens/forgot_password/forgot_password.dart';
import 'package:connect/views/screens/login/login_view_model.dart';
import 'package:connect/views/widgets/button/button_widget.dart';
import 'package:connect/views/widgets/button/button_widget_config.dart';
import 'package:connect/views/widgets/logo/logo_widget.dart';
import 'package:connect/views/widgets/logo/logo_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_view.dart';
import 'package:connect/views/widgets/underlined_text/underlined_text_widget_config.dart';
import 'package:connect/views/widgets/underlined_text/underlined_text_widget_view.dart';
import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final LoginViewModel viewModel = LoginViewModel();

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
              LogoWidget(config: LogoWidgetConfig(title: "Welcome to Connect")),
              SizedBox(height: 30),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
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
                config: TextFieldWidgetConfig(
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
                  config: UnderlinedTextWidgetConfig(
                    text: "Forgot Password?",
                    to: ForgotPassword(),
                  ),
                ),
              ),
              SizedBox(height: 13),
              ButtonWidget(
                config: ButtonWidgetConifg(
                  buttonText: "Login",
                  buttonFn: () async {
                    await loginButtonFunction();
                  },
                ),
              ),
              SizedBox(height: 10),
              UnderlinedTextWidget(
                config: UnderlinedTextWidgetConfig(
                  text: "Don’t have an account? Sign up",
                  to: CreateAccount(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
