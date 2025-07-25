import 'package:connect/views/screens/update_forgotten_password/update_forgotten_password_screen_view_model.dart';
import 'package:connect/views/widgets/button/button_widget.dart';
import 'package:connect/views/widgets/button/button_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_view.dart';
import 'package:connect/views/widgets/title/title_widget.dart';
import 'package:connect/views/widgets/title/title_widget_config.dart';
import 'package:flutter/material.dart';

class UpdateForgottenPasswordScreen extends StatefulWidget {
  const UpdateForgottenPasswordScreen({super.key});

  @override
  State<UpdateForgottenPasswordScreen> createState() =>
      _UpdateForgottenPasswordScreenState();
}

class _UpdateForgottenPasswordScreenState
    extends State<UpdateForgottenPasswordScreen> {
  final UpdateForgottenPasswordScreenViewModel viewModel =
      UpdateForgottenPasswordScreenViewModel();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: IntrinsicWidth(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TitleWidget(config: TitleWidgetConfig(title: "Update Password")),
              SizedBox(height: 30),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
                  title: "New Password",
                  hint: "Enter new password",
                  nextFunction: () {},
                  textEditingController: viewModel.newPasswordController,
                ),
              ),
              SizedBox(height: 20),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
                  title: "Confirmation Password",
                  hint: "Re-enter your new password",
                  nextFunction: () {},
                  textEditingController:
                      viewModel.confirmationNewPasswordController,
                ),
              ),
              SizedBox(height: 20),
              ButtonWidget(
                config: ButtonWidgetConifg(
                  buttonText: "Change Password",
                  buttonFn: () {
                    viewModel.changePassword();
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
