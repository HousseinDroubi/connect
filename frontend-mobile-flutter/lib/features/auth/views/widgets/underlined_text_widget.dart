import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/utils/app_nav.dart';
import 'package:flutter/material.dart';

class UnderlinedTextWidget extends StatelessWidget {
  final String text;
  final String to;
  const UnderlinedTextWidget({super.key, required this.text, required this.to});

  void navigateTo(BuildContext context) {
    AppNav.push(context, to);
  }

  @override
  Widget build(BuildContext context) {
    return TextButton(
      child: Text(
        text,
        style: TextStyle(
          color: AppColors.dustyBlue,
          decoration: TextDecoration.underline,
        ),
      ),
      onPressed: () {
        navigateTo(context);
      },
    );
  }
}
