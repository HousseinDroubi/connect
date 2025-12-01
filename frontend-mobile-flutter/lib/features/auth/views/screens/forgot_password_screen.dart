import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/core/utils/widgets.dart';
import 'package:connect/features/auth/view_models/auth_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/core/widgets/text_field_widget.dart';
import 'package:connect/core/widgets/title_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart' as fpdart;

class ForgotPasswordScreen extends ConsumerStatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  ConsumerState<ForgotPasswordScreen> createState() =>
      _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends ConsumerState<ForgotPasswordScreen> {
  final TextEditingController emailController = TextEditingController();

  Future<void> sendEmailButtonFunction() async {
    showPopup(popupCase: PopupLoading(context: context));

    fpdart.Either<AppFailure, AppSuccess> result = await ref
        .read(authViewModelProvider.notifier)
        .sendEmail(emailController.text);

    hidePopup(context);

    String popupMessage = "";

    switch (result) {
      case fpdart.Left(value: AppFailure(message: final message)):
        showPopup(
          popupCase: PopupAlert(context: context, popupContent: message),
        );
        popupMessage = message;
        break;
      case fpdart.Right(value: AppSuccess(message: final message)):
        popupMessage = message;
        clearTextEditingControllers([emailController]);
        break;
    }

    showPopup(
      popupCase: PopupAlert(context: context, popupContent: popupMessage),
    );
  }

  @override
  void dispose() {
    emailController.dispose();
    super.dispose();
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
              textEditingController: emailController,
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
