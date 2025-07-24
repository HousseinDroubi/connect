import 'package:connect/views/screens/create_account/create_account_screen.dart';
import 'package:connect/views/screens/forgot_password/forgot_password.dart';
import 'package:connect/views/widgets/button/button_widget.dart';
import 'package:connect/views/widgets/button/button_widget_config.dart';
import 'package:connect/views/widgets/logo/logo_widget.dart';
import 'package:connect/views/widgets/logo/logo_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_view.dart';
import 'package:connect/views/widgets/underlined_text/underlined_text_widget_config.dart';
import 'package:connect/views/widgets/underlined_text/underlined_text_widget_view.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _controller1 = TextEditingController();
  final TextEditingController _controller2 = TextEditingController();
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
                  title: "Email or pin",
                  hint: "Enter your email or pin",
                  nextFunction: () {},
                  textEditingController: _controller1,
                ),
              ),
              SizedBox(height: 20),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
                  title: "Password",
                  hint: "Enter your password",
                  nextFunction: () {},
                  textEditingController: _controller2,
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
                  buttonFn: () {
                    print("Email is ${_controller1.text}");
                    print("Password is ${_controller2.text}");
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
