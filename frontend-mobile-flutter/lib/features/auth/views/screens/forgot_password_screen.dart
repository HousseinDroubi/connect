import 'package:connect/features/auth/view_models/screens/forgot_password_screen_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/features/auth/views/widgets/text_field_widget.dart';
import 'package:connect/features/auth/views/widgets/title_widget.dart';
import 'package:flutter/material.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final ForgotPasswordScreenViewModel viewModel =
      ForgotPasswordScreenViewModel();

  Future<void> sendEmailButtonFunction() async {
    await viewModel.sendEmail(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TitleWidget(title: "Forgot Password"),
            SizedBox(height: 20),
            TextFieldWidget(
              title: "Email",
              hint: "Enter your email",
              nextFunction: () {
                sendEmailButtonFunction();
              },
              textEditingController: viewModel.emailController,
            ),
            SizedBox(height: 20),
            ButtonWidget(
              buttonText: "Send email",
              buttonFn: () {
                sendEmailButtonFunction();
              },
            ),
          ],
        ),
      ),
    );
  }
}
