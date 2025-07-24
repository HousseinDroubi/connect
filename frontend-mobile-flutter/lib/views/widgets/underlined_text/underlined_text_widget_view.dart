import 'package:connect/constants/my_colors.dart';
import 'package:connect/views/widgets/underlined_text/underlined_text_widget_model.dart';
import 'package:connect/views/widgets/underlined_text/underlined_text_widget_view_model.dart';
import 'package:flutter/material.dart';

class UnderlinedTextWidgetView extends StatelessWidget {
  UnderlinedTextWidgetModel model;
  UnderlinedTextWidgetViewModel viewModel;
  UnderlinedTextWidgetView({super.key, required this.model})
    : viewModel = UnderlinedTextWidgetViewModel(model: model);

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
