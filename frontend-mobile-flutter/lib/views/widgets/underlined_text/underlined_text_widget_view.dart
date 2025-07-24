import 'package:connect/constants/my_colors.dart';
import 'package:connect/views/widgets/underlined_text/underlined_text_widget_config.dart';
import 'package:flutter/material.dart';

class UnderlinedTextWidget extends StatelessWidget {
  final UnderlinedTextWidgetConfig config;
  const UnderlinedTextWidget({super.key, required this.config});

  @override
  Widget build(BuildContext context) {
    return TextButton(
      child: Text(
        config.text,
        style: TextStyle(
          color: MyColors.dustyBlue.value,
          decoration: TextDecoration.underline,
        ),
      ),
      onPressed: () {
        config.navigateTo(context);
      },
    );
  }
}
