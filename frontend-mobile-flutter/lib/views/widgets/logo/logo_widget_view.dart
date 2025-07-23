import 'package:connect/views/widgets/logo/logo_widget_model.dart';
import 'package:connect/views/widgets/logo/logo_widget_view_model.dart';
import 'package:flutter/material.dart';

class LogoView extends StatelessWidget {
  final LogoModel logoModel;
  final LogoViewModel logoViewModel;
  LogoView({super.key, required this.logoModel})
    : logoViewModel = LogoViewModel(logoModel: logoModel);

  @override
  Widget build(BuildContext context) {
    return IntrinsicWidth(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            logoViewModel.title,
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
          ),
          Container(
            margin: EdgeInsets.only(left: 10),
            child: Image.asset(logoViewModel.logoPath, width: 26, height: 26),
          ),
        ],
      ),
    );
  }
}
