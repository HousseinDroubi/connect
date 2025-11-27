import 'package:connect/core/constants/app_colors.dart';
import 'package:flutter/material.dart';

class UnderlinedTextWidget extends StatelessWidget {
  final String text;
  final Widget to;
  const UnderlinedTextWidget({super.key, required this.text, required this.to});

  void navigateTo(BuildContext context) {
    Navigator.push(context, MaterialPageRoute(builder: (context) => to));
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
