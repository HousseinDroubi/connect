import 'package:connect/views/widgets/logo/logo_widget_model.dart';
import 'package:connect/views/widgets/logo/logo_widget_view_model.dart';
import 'package:flutter/material.dart';

class LogoView extends StatelessWidget {
  final LogoWidgetModel model;
  final LogoWidgetViewModel viewModel;
  LogoView({super.key, required this.model})
    : viewModel = LogoWidgetViewModel(model: model);

  @override
  Widget build(BuildContext context) {
    return IntrinsicWidth(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            viewModel.title,
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
          ),
          Container(
            margin: EdgeInsets.only(left: 10),
            child: Image.asset(viewModel.logoPath, width: 26, height: 26),
          ),
        ],
      ),
    );
  }
}
