import 'package:connect/views/widgets/logo/logo_widget_config.dart';
import 'package:connect/views/widgets/title/title_widget.dart';
import 'package:connect/views/widgets/title/title_widget_config.dart';
import 'package:flutter/material.dart';

class LogoWidget extends StatelessWidget {
  final LogoWidgetConfig config;
  const LogoWidget({super.key, required this.config});

  @override
  Widget build(BuildContext context) {
    return IntrinsicWidth(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TitleWidget(config: TitleWidgetConfig(title: config.title)),
          Container(
            margin: EdgeInsets.only(left: 10),
            child: Image.asset(
              LogoWidgetConfig.logoPath,
              width: 26,
              height: 26,
            ),
          ),
        ],
      ),
    );
  }
}
