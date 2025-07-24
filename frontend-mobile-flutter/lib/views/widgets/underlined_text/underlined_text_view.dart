import 'package:connect/constants/my_colors.dart';
import 'package:connect/views/widgets/underlined_text/underlined_text_model.dart';
import 'package:connect/views/widgets/underlined_text/underlined_text_view_model.dart';
import 'package:flutter/material.dart';

class UnderlinedTextView extends StatelessWidget {
  UnderlinedTextModel model;
  UnderlinedTextViewModel viewModel;
  UnderlinedTextView({super.key, required this.model})
    : viewModel = UnderlinedTextViewModel(model: model);

  @override
  Widget build(BuildContext context) {
    return TextButton(
      child: Text(
        model.text,
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
