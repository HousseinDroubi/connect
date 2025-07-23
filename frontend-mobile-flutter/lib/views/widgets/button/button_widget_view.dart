import 'package:connect/views/widgets/button/button_widget_model.dart';
import 'package:connect/views/widgets/button/button_widget_view_model.dart';
import 'package:flutter/material.dart';

class ButtonWidgetView extends StatelessWidget {
  ButtonWidgetModel model;
  ButtonWidgetViewModel viewModel;
  ButtonWidgetView({super.key, required this.model})
    : viewModel = ButtonWidgetViewModel(model: model);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        model.buttonFn();
      },
      child: Container(
        width: 100,
        height: 35,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(3),
          color: model.isDisabled == true
              ? Colors.grey
              : model.isColoredRed == true
              ? Colors.red
              : Colors.blue,
        ),
        child: Text(
          model.buttonText,
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w500),
        ),
      ),
    );
  }
}
