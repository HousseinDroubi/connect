import 'package:connect/view_models/screens/create_account_screen_view_model.dart';
import 'package:connect/views/widgets/button_widget.dart';
import 'package:connect/view_models/widgets/button_widget_view_model.dart';
import 'package:connect/views/widgets/profile_widget.dart';
import 'package:connect/view_models/widgets/text_field_widget_view_model.dart';
import 'package:connect/views/widgets/text_field_widget.dart';
import 'package:connect/views/widgets/title_widget.dart';
import 'package:connect/view_models/widgets/title_widget_view_model.dart';
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
              TitleWidget(
                viewModel: TitleWidgetViewModel(title: "Create New Account"),
              ),
              SizedBox(height: 5),
              ProfileWidget(viewModel: viewModel.profileWidgetViewModel),
              TextFieldWidget(
                viewModel: TextFieldWidgetViewModel(
                  focusNode: _emailFocusNode,
                  title: "Email",
                  hint: "Enter your email",
                  nextFunction: () {
                    FocusScope.of(context).requestFocus(_usernameFocusNode);
                  },
                  textEditingController: viewModel.emailController,
                ),
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                viewModel: TextFieldWidgetViewModel(
                  focusNode: _usernameFocusNode,
                  title: "username",
                  hint: "Enter your username",
                  nextFunction: () {
                    FocusScope.of(context).requestFocus(_pinFocusNode);
                  },
                  textEditingController: viewModel.usernameController,
                ),
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                viewModel: TextFieldWidgetViewModel(
                  focusNode: _pinFocusNode,
                  title: "Pin",
                  hint: "Enter your pin",
                  nextFunction: () {
                    FocusScope.of(context).requestFocus(_passwordFocusNode);
                  },
                  textEditingController: viewModel.pinController,
                ),
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                viewModel: TextFieldWidgetViewModel(
                  focusNode: _passwordFocusNode,
                  title: "Password",
                  hint: "Enter your password",
                  nextFunction: () {
                    FocusScope.of(
                      context,
                    ).requestFocus(_confirmationPasswordFocusNode);
                  },
                  isPassword: true,
                  textEditingController: viewModel.passwordController,
                ),
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                viewModel: TextFieldWidgetViewModel(
                  focusNode: _confirmationPasswordFocusNode,
                  title: "Confirmation Password",
                  hint: "Re-enter your password",
                  nextFunction: () async {
                    await createAccountButtonFuction(context);
                  },
                  isPassword: true,
                  textEditingController:
                      viewModel.confirmationPasswordController,
                ),
              ),
              SizedBox(height: 20),
              ButtonWidget(
                viewModel: ButtonWidgetViewModel(
                  buttonText: "Create new account",
                  buttonFn: () async {
                    await createAccountButtonFuction(context);
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
