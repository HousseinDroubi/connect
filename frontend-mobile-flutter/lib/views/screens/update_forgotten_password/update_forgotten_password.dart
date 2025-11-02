import 'package:connect/views/screens/update_forgotten_password/update_forgotten_password_view_model.dart';
import 'package:connect/views/widgets/button/button_widget.dart';
import 'package:connect/views/widgets/button/button_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_view.dart';
import 'package:connect/views/widgets/title/title_widget.dart';
import 'package:connect/views/widgets/title/title_widget_config.dart';
import 'package:flutter/material.dart';

class UpdateForgottenPassword extends StatefulWidget {
  final String? token;
  const UpdateForgottenPassword({super.key, this.token});

  @override
  State<UpdateForgottenPassword> createState() =>
      _UpdateForgottenPasswordState();
}

class _UpdateForgottenPasswordState extends State<UpdateForgottenPassword> {
  final UpdateForgottenPasswordViewModel viewModel =
      UpdateForgottenPasswordViewModel();

  final FocusNode _newPasswordFocusNode = FocusNode();
  final FocusNode _confirmationPasswordFocusNode = FocusNode();

  Future<void> changePasswordButtonFunction(BuildContext context) async {
    await viewModel.changePassword(widget.token!, context);
  }

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
                  focusNode: _newPasswordFocusNode,
                  title: "New Password",
                  hint: "Enter new password",
                  nextFunction: () {
                    FocusScope.of(
                      context,
                    ).requestFocus(_confirmationPasswordFocusNode);
                  },
                  textEditingController: viewModel.newPasswordController,
                  isPassword: true,
                ),
              ),
              SizedBox(height: 20),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
                  focusNode: _confirmationPasswordFocusNode,
                  title: "Confirmation Password",
                  hint: "Re-enter your new password",
                  nextFunction: () async {
                    await changePasswordButtonFunction(context);
                  },
                  isPassword: true,
                  textEditingController:
                      viewModel.confirmationNewPasswordController,
                ),
              ),
              SizedBox(height: 20),
              ButtonWidget(
                config: ButtonWidgetConifg(
                  buttonText: "Change Password",
                  buttonFn: () async {
                    await changePasswordButtonFunction(context);
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
