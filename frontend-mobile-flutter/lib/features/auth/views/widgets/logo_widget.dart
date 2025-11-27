import 'package:connect/core/constants/app_icons.dart';
import 'package:connect/features/auth/views/widgets/title_widget.dart';
import 'package:flutter/material.dart';

class LogoWidget extends StatelessWidget {
  final String title;

  const LogoWidget({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return IntrinsicWidth(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TitleWidget(title: title),
          Container(
            margin: EdgeInsets.only(left: 10),
            child: Image.asset(AppIcons.logoPath, width: 26, height: 26),
          ),
        ],
      ),
    );
  }
}
