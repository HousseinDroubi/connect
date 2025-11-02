import 'package:connect/constants/my_colors.dart';
import 'package:connect/view_models/widgets/title_widget_view_model.dart';
import 'package:flutter/material.dart';

class TitleWidget extends StatelessWidget {
  final TitleWidgetViewModel viewModel;
  const TitleWidget({super.key, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    return Text(
      viewModel.title,
      style: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: MyColors.black.value,
      ),
    );
  }
}
