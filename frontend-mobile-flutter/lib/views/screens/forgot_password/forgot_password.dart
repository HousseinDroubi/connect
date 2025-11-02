import 'package:connect/views/screens/forgot_password/forgot_password_view_model.dart';
import 'package:connect/views/widgets/button/button_widget.dart';
import 'package:connect/views/widgets/button/button_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_view.dart';
import 'package:connect/views/widgets/title/title_widget.dart';
import 'package:connect/views/widgets/title/title_widget_config.dart';
import 'package:flutter/material.dart';

class ForgotPassword extends StatefulWidget {
  const ForgotPassword({super.key});

  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  final ForgotPasswordViewModel viewModel = ForgotPasswordViewModel();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TitleWidget(config: TitleWidgetConfig(title: "Forgot Password")),
            SizedBox(height: 20),
            TextFieldWidget(
              config: TextFieldWidgetConfig(
                title: "Email",
                hint: "Enter your email",
                nextFunction: () {},
                textEditingController: viewModel.emailController,
              ),
            ),
            SizedBox(height: 20),
            ButtonWidget(
              config: ButtonWidgetConifg(
                buttonText: "Send email",
                buttonFn: () {
                  viewModel.sendEmail(context);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
