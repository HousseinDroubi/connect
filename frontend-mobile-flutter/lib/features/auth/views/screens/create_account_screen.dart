import 'dart:io';

import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/core/utils/utils.dart';
import 'package:connect/core/utils/widgets.dart';
import 'package:connect/features/auth/view_models/auth_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/features/auth/views/widgets/profile_widget.dart';
import 'package:connect/features/auth/views/widgets/text_field_widget.dart';
import 'package:connect/features/auth/views/widgets/title_widget.dart';
import 'package:flutter/material.dart';
import 'package:fpdart/fpdart.dart' as fpdart;
import 'package:flutter_riverpod/flutter_riverpod.dart';

class CreateAccountScreen extends ConsumerStatefulWidget {
  const CreateAccountScreen({super.key});

  @override
  ConsumerState<CreateAccountScreen> createState() =>
      _CreateAccountScreenState();
}

class _CreateAccountScreenState extends ConsumerState<CreateAccountScreen> {
  File? imageFile;

  // Nodes
  final FocusNode emailFocusNode = FocusNode();
  final FocusNode usernameFocusNode = FocusNode();
  final FocusNode pinFocusNode = FocusNode();
  final FocusNode passwordFocusNode = FocusNode();
  final FocusNode confirmationPasswordFocusNode = FocusNode();

  // Text controllers
  final TextEditingController emailController = TextEditingController();
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController pinController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmationPasswordController =
      TextEditingController();

  // Create Account function
  Future<void> createAccountButtonFuction(BuildContext context) async {
    showPopup(popupCase: PopupLoading(context: context));

    final fpdart.Either<AppFailure, AppSuccess> result = await ref
        .read(authViewModelProvider)
        .createAccountRequest(
          email: emailController.text,
          username: usernameController.text,
          pin: pinController.text,
          password: passwordController.text,
          confirmationPassword: confirmationPasswordController.text,
          imageFile: imageFile,
        );

    hidePopup(context);

    switch (result) {
      case fpdart.Left(value: AppFailure(message: String message)):
        showPopup(
          popupCase: PopupAlert(context: context, popupContent: message),
        );
        break;
      case fpdart.Right(value: AppSuccess(message: String message)):
        showPopup(
          popupCase: PopupAlert(context: context, popupContent: message),
        );
        clearTextEditingControllers([
          emailController,
          usernameController,
          pinController,
          passwordController,
          confirmationPasswordController,
        ]);

        imageFile = null;
        break;
    }

    setState(() {});
  }

  @override
  void dispose() {
    emailController.dispose();
    usernameController.dispose();
    pinController.dispose();
    passwordController.dispose();
    confirmationPasswordController.dispose();

    emailFocusNode.dispose();
    usernameFocusNode.dispose();
    pinFocusNode.dispose();
    passwordFocusNode.dispose();
    confirmationPasswordFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          physics: NeverScrollableScrollPhysics(),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TitleWidget(title: "Create New Account"),
              SizedBox(height: 5),
              ProfileWidget(
                onChange: (File imageFile) {
                  setState(() {
                    imageFile = imageFile;
                  });
                },
                imageSource: imageFile?.path,
              ),
              TextFieldWidget(
                focusNode: emailFocusNode,
                title: "Email",
                hint: "Enter your email",
                nextFunction: () {
                  focusOn(context, usernameFocusNode);
                },
                textEditingController: emailController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: usernameFocusNode,
                title: "username",
                hint: "Enter your username",
                nextFunction: () {
                  focusOn(context, pinFocusNode);
                },
                textEditingController: usernameController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: pinFocusNode,
                title: "Pin",
                hint: "Enter your pin",
                nextFunction: () {
                  focusOn(context, passwordFocusNode);
                },
                textEditingController: pinController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: passwordFocusNode,
                title: "Password",
                hint: "Enter your password",
                nextFunction: () {
                  focusOn(context, confirmationPasswordFocusNode);
                },
                isPassword: true,
                textEditingController: passwordController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: confirmationPasswordFocusNode,
                title: "Confirmation Password",
                hint: "Re-enter your password",
                nextFunction: () async {
                  await createAccountButtonFuction(context);
                },
                isPassword: true,
                textEditingController: confirmationPasswordController,
              ),
              SizedBox(height: 20),
              ButtonWidget(
                buttonText: "Create new account",
                buttonFn: () async {
                  await createAccountButtonFuction(context);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
