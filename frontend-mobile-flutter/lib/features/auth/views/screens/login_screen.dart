import 'package:connect/core/utils/app_nav.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/core/utils/utils.dart';
import 'package:connect/core/utils/widgets.dart';
import 'package:connect/features/auth/view_models/auth_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/features/auth/views/widgets/logo_widget.dart';
import 'package:connect/core/widgets/text_field_widget.dart';
import 'package:connect/features/auth/views/widgets/underlined_text_widget.dart';
import 'package:connect/features/home/view_models/ws_view_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  // Text Editing Controllers
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  // Focus Nodes
  final FocusNode emailFocusNode = FocusNode();
  final FocusNode passwordFocusNode = FocusNode();

  Future<void> loginButtonFunction() async {
    showPopup(popupCase: PopupLoading(context: context));

    final notifier = ref.read(authViewModelProvider.notifier);
    final Either<AppFailure, AppSuccess> res = await notifier.login(
      emailOrPin: emailController.text,
      password: passwordController.text,
    );

    hidePopup(context);
    switch (res) {
      case Right(value: AppSuccess()):
        clearTextEditingControllers([emailController, passwordController]);
        ref.read(wsViewModelProvider);
        AppNav.pushAndRemoveUntil(context, "home");
        break;
      case Left(value: AppFailure(message: final message)):
        showPopup(
          popupCase: PopupAlert(context: context, popupContent: message),
        );
        break;
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
