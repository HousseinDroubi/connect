import 'package:connect/core/utils/utils.dart';
import 'package:connect/features/auth/view_models/screens/update_forgotten_password_screen_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/features/auth/views/widgets/text_field_widget.dart';
import 'package:connect/features/auth/views/widgets/title_widget.dart';
import 'package:flutter/material.dart';

class UpdateForgottenPasswordScreen extends StatefulWidget {
  final String? token;
  const UpdateForgottenPasswordScreen({super.key, this.token});

  @override
  State<UpdateForgottenPasswordScreen> createState() =>
      _UpdateForgottenPasswordScreenState();
}

class _UpdateForgottenPasswordScreenState
    extends State<UpdateForgottenPasswordScreen> {
  final UpdateForgottenPasswordScreenViewModel viewModel =
      UpdateForgottenPasswordScreenViewModel();

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
              TitleWidget(title: "Update Password"),
              SizedBox(height: 30),
              TextFieldWidget(
                focusNode: _newPasswordFocusNode,
                title: "New Password",
                hint: "Enter new password",
                nextFunction: () {
                  focusOn(context, _confirmationPasswordFocusNode);
                },
                textEditingController: viewModel.newPasswordController,
                isPassword: true,
              ),
              SizedBox(height: 20),
              TextFieldWidget(
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
              SizedBox(height: 20),
              ButtonWidget(
                buttonText: "Change Password",
                buttonFn: () async {
                  await changePasswordButtonFunction(context);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
