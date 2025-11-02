import 'package:connect/constants/my_colors.dart';
import 'package:connect/view_models/widgets/button_widget_view_model.dart';
import 'package:flutter/material.dart';

class ButtonWidget extends StatelessWidget {
  final ButtonWidgetViewModel viewModel;
  const ButtonWidget({super.key, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        viewModel.buttonFn();
      },
      child: Container(
        width: 150,
        height: 35,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(3),
          color: viewModel.isDisabled == true
              ? MyColors.grey.value
              : viewModel.isColoredRed == true
              ? MyColors.red.value
              : MyColors.blue.value,
        ),
        child: Text(
          viewModel.buttonText,
          style: TextStyle(
            color: MyColors.white.value,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
