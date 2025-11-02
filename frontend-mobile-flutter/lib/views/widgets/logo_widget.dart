import 'package:connect/view_models/widgets/logo_widget_view_model.dart';
import 'package:connect/views/widgets/title_widget.dart';
import 'package:connect/view_models/widgets/title_widget_view_model.dart';
import 'package:flutter/material.dart';

class LogoWidget extends StatelessWidget {
  final LogoWidgetViewModel viewModel;
  const LogoWidget({super.key, required this.viewModel});

  @override
  Widget build(BuildContext context) {
    return IntrinsicWidth(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TitleWidget(viewModel: TitleWidgetViewModel(title: viewModel.title)),
          Container(
            margin: EdgeInsets.only(left: 10),
            child: Image.asset(
              LogoWidgetViewModel.logoPath,
              width: 26,
              height: 26,
            ),
          ),
        ],
      ),
    );
  }
}
