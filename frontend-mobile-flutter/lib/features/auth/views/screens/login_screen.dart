import 'package:connect/core/utils/utils.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/features/auth/views/widgets/logo_widget.dart';
import 'package:connect/features/auth/views/widgets/text_field_widget.dart';
import 'package:connect/features/auth/views/widgets/underlined_text_widget.dart';
import 'package:flutter/material.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  // Text Editing Controllers
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  // Focus Nodes
  final FocusNode emailFocusNode = FocusNode();
  final FocusNode passwordFocusNode = FocusNode();

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    emailFocusNode.dispose();
    passwordFocusNode.dispose();
    super.dispose();
  }

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
              LogoWidget(title: "Welcome to Connect"),
              SizedBox(height: 30),
              TextFieldWidget(
                focusNode: emailFocusNode,
                title: "Email or pin",
                hint: "Enter your email or pin",
                nextFunction: () {
                  focusOn(context, passwordFocusNode);
                },
                textEditingController: emailController,
              ),
              SizedBox(height: 20),
              TextFieldWidget(
                focusNode: passwordFocusNode,
                title: "Password",
                hint: "Enter your password",
                nextFunction: () async {
                  await loginButtonFunction();
                },
                textEditingController: passwordController,
                isPassword: true,
              ),
              SizedBox(height: 10),
              Container(
                alignment: Alignment.centerRight,
                child: UnderlinedTextWidget(
                  text: "Forgot Password?",
                  to: "forgot_password",
                ),
              ),
              SizedBox(height: 13),
              ButtonWidget(
                buttonText: "Login",
                buttonFn: () async {
                  await loginButtonFunction();
                },
              ),
              SizedBox(height: 10),
              UnderlinedTextWidget(
                text: "Don’t have an account? Sign up",
                to: "create_account",
              ),
            ],
          ),
        ),
      ),
    );
  }
}
