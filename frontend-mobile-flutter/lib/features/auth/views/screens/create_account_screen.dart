import 'package:connect/core/utils/utils.dart';
import 'package:connect/features/auth/view_models/screens/create_account_screen_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/features/auth/views/widgets/profile_widget.dart';
import 'package:connect/features/auth/views/widgets/text_field_widget.dart';
import 'package:connect/features/auth/views/widgets/title_widget.dart';
import 'package:flutter/material.dart';

class CreateAccountScreen extends StatefulWidget {
  const CreateAccountScreen({super.key});

  @override
  State<CreateAccountScreen> createState() => _CreateAccountScreenState();
}

class _CreateAccountScreenState extends State<CreateAccountScreen> {
  CreateAccountScreenViewModel viewModel = CreateAccountScreenViewModel();
  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _usernameFocusNode = FocusNode();
  final FocusNode _pinFocusNode = FocusNode();
  final FocusNode _passwordFocusNode = FocusNode();
  final FocusNode _confirmationPasswordFocusNode = FocusNode();

  Future<void> createAccountButtonFuction(BuildContext context) async {
    await viewModel.createAccountRequest(context);
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
              ProfileWidget(),
              TextFieldWidget(
                focusNode: _emailFocusNode,
                title: "Email",
                hint: "Enter your email",
                nextFunction: () {
                  focusOn(context, _usernameFocusNode);
                },
                textEditingController: viewModel.emailController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: _usernameFocusNode,
                title: "username",
                hint: "Enter your username",
                nextFunction: () {
                  focusOn(context, _pinFocusNode);
                },
                textEditingController: viewModel.usernameController,
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                focusNode: _pinFocusNode,
                title: "Pin",
                hint: "Enter your pin",
                nextFunction: () {
                  focusOn(context, _passwordFocusNode);
                },
                textEditingController: viewModel.pinController,
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
                textEditingController: viewModel.passwordController,
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
                textEditingController: viewModel.confirmationPasswordController,
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
