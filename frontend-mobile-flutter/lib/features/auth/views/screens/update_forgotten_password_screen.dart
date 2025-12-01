import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/core/utils/utils.dart';
import 'package:connect/core/utils/widgets.dart';
import 'package:connect/features/auth/view_models/auth_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/features/auth/views/widgets/text_field_widget.dart';
import 'package:connect/core/widgets/title_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';

class UpdateForgottenPasswordScreen extends ConsumerStatefulWidget {
  final String? token;
  const UpdateForgottenPasswordScreen({super.key, this.token});

  @override
  ConsumerState<UpdateForgottenPasswordScreen> createState() =>
      _UpdateForgottenPasswordScreenState();
}

class _UpdateForgottenPasswordScreenState
    extends ConsumerState<UpdateForgottenPasswordScreen> {
  // Text controller
  final TextEditingController newPasswordController = TextEditingController();
  final TextEditingController confirmationNewPasswordController =
      TextEditingController();

  // Focus nodes
  final FocusNode newPasswordFocusNode = FocusNode();
  final FocusNode confirmationPasswordFocusNode = FocusNode();

  @override
  void dispose() {
    newPasswordController.dispose();
    confirmationNewPasswordController.dispose();
    newPasswordFocusNode.dispose();
    confirmationPasswordFocusNode.dispose();
    super.dispose();
  }

  Future<void> changePasswordButtonFunction(BuildContext context) async {
    final notifier = ref.read(authViewModelProvider.notifier);

    if (widget.token != null) {
      showPopup(popupCase: PopupLoading(context: context));
      final Either<AppFailure, AppSuccess> result = await notifier
          .changePassword(
            context: context,
            token: widget.token!,
            newPassword: newPasswordController.text,
            confirmationPassword: confirmationNewPasswordController.text,
          );
      hidePopup(context);

      final String popupContent;
      switch (result) {
        case Left(value: AppFailure(message: final message)):
          popupContent = message;
          break;
        case Right(value: AppSuccess(message: final message)):
          popupContent = message;
          clearTextEditingControllers([
            newPasswordController,
            confirmationNewPasswordController,
          ]);
          break;
      }

      showPopup(
        popupCase: PopupAlert(context: context, popupContent: popupContent),
      );
    }
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
                focusNode: newPasswordFocusNode,
                title: "New Password",
                hint: "Enter new password",
                nextFunction: () {
                  focusOn(context, confirmationPasswordFocusNode);
                },
                textEditingController: newPasswordController,
                isPassword: true,
              ),
              SizedBox(height: 20),
              TextFieldWidget(
                focusNode: confirmationPasswordFocusNode,
                title: "Confirmation Password",
                hint: "Re-enter your new password",
                nextFunction: () async {
                  await changePasswordButtonFunction(context);
                },
                isPassword: true,
                textEditingController: confirmationNewPasswordController,
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
