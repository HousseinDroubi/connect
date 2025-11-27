import 'package:connect/core/constants/app_colors.dart';
import 'package:flutter/material.dart';

class ButtonWidget extends StatelessWidget {
  final String buttonText;
  final VoidCallback buttonFn;
  final bool? isColoredRed;
  final bool? isDisabled;

  const ButtonWidget({
    super.key,
    required this.buttonText,
    required this.buttonFn,
    this.isColoredRed = false,
    this.isDisabled = false,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: buttonFn,
      child: Container(
        width: 150,
        height: 35,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(3),
          color: isDisabled == true
              ? AppColors.grey
              : isColoredRed == true
              ? AppColors.red
              : AppColors.blue,
        ),
        child: Text(
          buttonText,
          style: TextStyle(color: AppColors.white, fontWeight: FontWeight.w500),
        ),
      ),
    );
  }
}
