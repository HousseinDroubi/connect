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

class CreateAccountScreen extends StatefulWidget {
  const CreateAccountScreen({super.key});

  @override
  State<CreateAccountScreen> createState() => _CreateAccountScreenState();
}

class _CreateAccountScreenState extends State<CreateAccountScreen> {
  AuthViewModel viewModel = AuthViewModel();

  File? imageFile;

  // Nodes
  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _usernameFocusNode = FocusNode();
  final FocusNode _pinFocusNode = FocusNode();
  final FocusNode _passwordFocusNode = FocusNode();
  final FocusNode _confirmationPasswordFocusNode = FocusNode();

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

    final fpdart.Either<AppFailure, AppSuccess> result = await viewModel
        .createAccountRequest(
          context: context,
          email: emailController.text,
          username: usernameController.text,
          pin: pinController.text,
          password: passwordController.text,
          confirmationPassword: confirmationPasswordController.text,
          imageFile: imageFile!,
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
                focusNode: _emailFocusNode,
                title: "Email",
                hint: "Enter your email",
                nextFunction: () {
                  focusOn(context, _usernameFocusNode);
                },
                textEditingController: emailController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: _usernameFocusNode,
                title: "username",
                hint: "Enter your username",
                nextFunction: () {
                  focusOn(context, _pinFocusNode);
                },
                textEditingController: usernameController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: _pinFocusNode,
                title: "Pin",
                hint: "Enter your pin",
                nextFunction: () {
                  focusOn(context, _passwordFocusNode);
                },
                textEditingController: pinController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: _passwordFocusNode,
                title: "Password",
                hint: "Enter your password",
                nextFunction: () {
                  focusOn(context, _confirmationPasswordFocusNode);
                },
                isPassword: true,
                textEditingController: passwordController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: _confirmationPasswordFocusNode,
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
