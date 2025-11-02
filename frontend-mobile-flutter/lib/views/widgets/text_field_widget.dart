import 'package:connect/constants/my_colors.dart';
import 'package:connect/view_models/widgets/text_field_widget_view_model.dart';
import 'package:flutter/material.dart';

class TextFieldWidget extends StatefulWidget {
  final TextFieldWidgetViewModel viewModel;
  const TextFieldWidget({super.key, required this.viewModel});

  @override
  State<TextFieldWidget> createState() => _TextFieldWidgetState();
}

class _TextFieldWidgetState extends State<TextFieldWidget> {
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
            color: MyColors.black.value,
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        Container(
          margin: EdgeInsets.only(top: 4),
          child: SizedBox(
            width: widget.viewModel.isFull ? double.infinity : 260,
            height: 40,
            child: TextField(
              focusNode: widget.viewModel.getFocusNode,
              onSubmitted: (String value) {
                if (value != "") {
                  widget.viewModel.nextFunction();
                }
              },

              controller: widget.viewModel.textEditingController,
              cursorHeight: 15,
              style: TextStyle(
                fontSize: 13,
                color: MyColors.dustyBlue.value,
                fontWeight: FontWeight.w500,
              ),
              obscureText: widget.viewModel.isPassword && !seen,
              cursorColor: MyColors.dustyBlue.value,
              decoration: InputDecoration(
                filled: true,
                fillColor: MyColors.iceBlue.value,
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
                              ? TextFieldWidgetViewModel.openedEyeIconPath
                              : TextFieldWidgetViewModel.closedEyeIconPath,
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
                              ? TextFieldWidgetViewModel.galleryIconPath
                              : TextFieldWidgetViewModel.sendMessageIconPath,
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
        ),
      ],
    );
  }
}
