import 'package:connect/constants/my_colors.dart';
import 'package:connect/views/widgets/title/title_widget_config.dart';
import 'package:flutter/material.dart';

class TitleWidget extends StatelessWidget {
  final TitleWidgetConfig config;
  const TitleWidget({super.key, required this.config});

  @override
  Widget build(BuildContext context) {
    return Text(
      config.title,
      style: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: MyColors.black.value,
      ),
    );
  }
}
