import 'package:connect/constants/my_colors.dart';
import 'package:connect/views/screens/verify_account/verify_account_screen_view_model.dart';
import 'package:connect/views/widgets/button/button_widget.dart';
import 'package:connect/views/widgets/button/button_widget_config.dart';
import 'package:connect/views/widgets/title/title_widget.dart';
import 'package:flutter/material.dart';

class VerifyAccountScreen extends StatefulWidget {
  const VerifyAccountScreen({super.key});

  @override
  State<VerifyAccountScreen> createState() => _VerifyAccountScreenState();
}

class _VerifyAccountScreenState extends State<VerifyAccountScreen> {
  final VerifyAccountScreenViewModel viewModel = VerifyAccountScreenViewModel();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              viewModel.isError
                  ? VerifyAccountScreenViewModel.errorIconPath
                  : viewModel.isDone
                  ? VerifyAccountScreenViewModel.doneIconPath
                  : VerifyAccountScreenViewModel.waitingIconPath,
              width: 150,
              height: 150,
            ),
            SizedBox(height: 20),
            Text(
              viewModel.isError
                  ? "Something went wrong!"
                  : viewModel.isDone
                  ? "Account verified."
                  : "Verifying token...",
              style: TextStyle(fontSize: 16, color: MyColors.black.value),
            ),
            if (viewModel.isDone)
              Container(
                margin: EdgeInsets.only(top: 20),
                child: ButtonWidget(
                  config: ButtonWidgetConifg(
                    buttonText: "Login now",
                    buttonFn: () {
                      viewModel.navigateToLogin(context);
                    },
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
