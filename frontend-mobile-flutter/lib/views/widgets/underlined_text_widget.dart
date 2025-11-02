import 'package:connect/constants/my_colors.dart';
import 'package:connect/view_models/widgets/underlined_text_widget_view_model.dart';
import 'package:flutter/material.dart';

class UnderlinedTextWidget extends StatelessWidget {
  final UnderlinedTextWidgetViewModel viewModel;
  const UnderlinedTextWidget({super.key, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    return TextButton(
      child: Text(
        viewModel.text,
        style: TextStyle(
          color: MyColors.dustyBlue.value,
          decoration: TextDecoration.underline,
        ),
      ),
      onPressed: () {
        viewModel.navigateTo(context);
      },
    );
  }
}
