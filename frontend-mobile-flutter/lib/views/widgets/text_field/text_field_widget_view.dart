import 'package:connect/views/widgets/text_field/text_field_widget_model.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_view_model.dart';
import 'package:flutter/material.dart';

class TextFieldWidgetView extends StatefulWidget {
  TextFieldWidgetModel model;
  TextFieldWidgetViewModel viewModel;
  TextFieldWidgetView({super.key, required this.model})
    : viewModel = TextFieldWidgetViewModel(model: model);

  @override
  State<TextFieldWidgetView> createState() => _TextFieldWidgetViewState();
}

class _TextFieldWidgetViewState extends State<TextFieldWidgetView> {
  bool seen = false;

  @override
  void dispose() {
    widget.viewModel.textEditingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Text(
          widget.viewModel.title,
          style: TextStyle(
            color: Color(0xFF0D141C),
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(
          width: widget.viewModel.isFull ? double.infinity : 260,
          height: 40,
          child: TextField(
            controller: widget.viewModel.textEditingController,
            cursorHeight: 15,
            style: TextStyle(
              color: Color(0xFF49739C),
              fontWeight: FontWeight.w500,
            ),
            obscureText: widget.viewModel.isPassword && !seen,
            cursorColor: Color(0xFF49739C),
            decoration: InputDecoration(
              filled: true,
              fillColor: Color(0xFFE7EDF4),
              border: InputBorder.none,
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
                borderSide: BorderSide.none,
              ),
              focusedBorder: InputBorder.none,
              hintText: widget.viewModel.hint,
              hintStyle: TextStyle(fontSize: 12),
              suffixIcon: widget.viewModel.isPassword
                  ? IconButton(
                      icon: Image.asset(
                        seen
                            ? widget.viewModel.openedEyeIconPath
                            : widget.viewModel.closedEyeIconPath,
                      ),
                      onPressed: () {
                        setState(() {
                          seen = !seen;
                        });
                      },
                    )
                  : widget.viewModel.isForMessages
                  ? IconButton(
                      icon: Image.asset(
                        widget.viewModel.textEditingController.text.isEmpty
                            ? widget.viewModel.galleryIconPath
                            : widget.viewModel.sendMessageIconPath,
                      ),
                      onPressed: () {
                        widget.viewModel.textEditingController.text.isEmpty
                            ? widget.viewModel.sendMessage()
                            : widget.viewModel.pickUpImage();
                      },
                    )
                  : null,
            ),
            onChanged: (newValue) {
              if (newValue.length <= 1) setState(() {});
            },
          ),
        ),
      ],
    );
  }
}
