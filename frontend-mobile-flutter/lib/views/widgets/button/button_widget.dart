import 'package:connect/constants/my_colors.dart';
import 'package:connect/views/widgets/button/button_widget_config.dart';
import 'package:flutter/material.dart';

class ButtonWidget extends StatelessWidget {
  final ButtonWidgetConifg config;
  const ButtonWidget({super.key, required this.config});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        config.buttonFn();
      },
      child: Container(
        width: 100,
        height: 35,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(3),
          color: config.isDisabled == true
              ? MyColors.grey.value
              : config.isColoredRed == true
              ? MyColors.red.value
              : MyColors.blue.value,
        ),
        child: Text(
          config.buttonText,
          style: TextStyle(
            color: MyColors.white.value,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
