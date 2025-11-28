import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/constants/app_icons.dart';
import 'package:connect/core/utils/app_nav.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/features/auth/view_models/auth_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';

class VerifyAccountScreen extends ConsumerStatefulWidget {
  const VerifyAccountScreen({super.key});

  @override
  ConsumerState<VerifyAccountScreen> createState() =>
      _VerifyAccountScreenState();
}

class _VerifyAccountScreenState extends ConsumerState<VerifyAccountScreen> {
  bool isDone = false;
  bool isError = false;

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await init();
    });
  }

  Future<void> init() async {
    final String? token = ref.watch(authViewModelProvider);
    final notifier = ref.watch(authViewModelProvider.notifier);
    if (token == null) {
      AppNav.pushAndRemoveUntil(context, "login");
    } else {
      showPopup(popupCase: PopupLoading(context: context));
      final Either<AppFailure, AppSuccess> result = await notifier
          .verifyAccount(token);
      hidePopup(context);

      final String popupContent;
      switch (result) {
        case Left(value: AppFailure(message: final message)):
          isError = true;
          isDone = false;
          popupContent = message;
          break;
        case Right(value: AppSuccess(message: final message)):
          isError = false;
          isDone = true;
          popupContent = message;
          break;
      }

      setState(() {});

      showPopup(
        popupCase: PopupAlert(context: context, popupContent: popupContent),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              isError
                  ? AppIcons.errorIconPath
                  : isDone
                  ? AppIcons.doneIconPath
                  : AppIcons.waitingIconPath,
              width: 150,
              height: 150,
            ),
            SizedBox(height: 20),
            Text(
              isError
                  ? "Something went wrong!"
                  : isDone
                  ? "Account verified."
                  : "Verifying token...",
              style: TextStyle(fontSize: 16, color: AppColors.black),
            ),
            if (isDone)
              Container(
                margin: EdgeInsets.only(top: 20),
                child: ButtonWidget(
                  buttonText: "Login now",
                  buttonFn: () {
                    AppNav.pushAndRemoveUntil(context, "login");
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}
