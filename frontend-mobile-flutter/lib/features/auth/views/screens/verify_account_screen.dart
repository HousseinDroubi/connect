import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/utils/app_nav.dart';
import 'package:connect/features/auth/view_models/screens/verify_account_screen_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:flutter/material.dart';

class VerifyAccountScreen extends StatefulWidget {
  final String? token;
  const VerifyAccountScreen({super.key, this.token});

  @override
  State<VerifyAccountScreen> createState() => _VerifyAccountScreenState();
}

class _VerifyAccountScreenState extends State<VerifyAccountScreen> {
  final VerifyAccountScreenViewModel viewModel = VerifyAccountScreenViewModel();

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) async {
      if (widget.token == null) {
        AppNav.pushAndRemoveUntil(context, "login");
      } else {
        await viewModel.verifyAccount(widget.token!, context);
        setState(() {});
      }
    });
  }

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
              style: TextStyle(fontSize: 16, color: AppColors.black),
            ),
            if (viewModel.isDone)
              Container(
                margin: EdgeInsets.only(top: 20),
                child: ButtonWidget(
                  buttonText: "Login now",
                  buttonFn: () {
                    viewModel.navigateToLogin(context);
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}
