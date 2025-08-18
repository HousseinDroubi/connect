import 'package:connect/utils/dialog.dart';
import 'package:connect/views/screens/create_account/create_account_view_model.dart';
import 'package:connect/views/widgets/button/button_widget.dart';
import 'package:connect/views/widgets/button/button_widget_config.dart';
import 'package:connect/views/widgets/profile/profile_widget.dart';
import 'package:connect/views/widgets/profile/profile_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_config.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_view.dart';
import 'package:connect/views/widgets/title/title_widget.dart';
import 'package:connect/views/widgets/title/title_widget_config.dart';
import 'package:flutter/material.dart';

class CreateAccount extends StatefulWidget {
  const CreateAccount({super.key});

  @override
  State<CreateAccount> createState() => _CreateAccountState();
}

class _CreateAccountState extends State<CreateAccount> {
  CreateAccountViewModel viewModel = CreateAccountViewModel();

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
                config: TitleWidgetConfig(title: "Create New Account"),
              ),
              SizedBox(height: 5),
              ProfileWidget(config: viewModel.profileWidgetConfig),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
                  title: "Email",
                  hint: "Enter your email",
                  nextFunction: () {},
                  textEditingController: viewModel.emailController,
                ),
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
                  title: "username",
                  hint: "Enter your username",
                  nextFunction: () {},
                  textEditingController: viewModel.usernameController,
                ),
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
                  title: "Pin",
                  hint: "Enter your pin",
                  nextFunction: () {},
                  textEditingController: viewModel.pinController,
                ),
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
                  title: "Password",
                  hint: "Enter your password",
                  nextFunction: () {},
                  textEditingController: viewModel.passwordController,
                ),
              ),
              SizedBox(height: 15),
              TextFieldWidget(
                config: TextFieldWidgetConfig(
                  title: "Confirmation Password",
                  hint: "Re-enter your password",
                  nextFunction: () {},
                  textEditingController:
                      viewModel.confirmationPasswordController,
                ),
              ),
              SizedBox(height: 20),
              ButtonWidget(
                config: ButtonWidgetConifg(
                  buttonText: "Create new account",
                  buttonFn: () {
                    viewModel.createAccountRequest(context);
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
