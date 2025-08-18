import 'package:connect/constants/my_colors.dart';
import 'package:connect/views/widgets/text_field/text_field_widget_config.dart';
import 'package:flutter/material.dart';

class TextFieldWidget extends StatefulWidget {
  final TextFieldWidgetConfig config;
  const TextFieldWidget({super.key, required this.config});

  @override
  State<TextFieldWidget> createState() => _TextFieldWidgetState();
}

class _TextFieldWidgetState extends State<TextFieldWidget> {
  bool seen = false;

  @override
  void dispose() {
    widget.config.textEditingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Text(
          widget.config.title,
          style: TextStyle(
            color: MyColors.black.value,
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        Container(
          margin: EdgeInsets.only(top: 4),
          child: SizedBox(
            width: widget.config.isFull ? double.infinity : 260,
            height: 40,
            child: TextField(
              controller: widget.config.textEditingController,
              cursorHeight: 15,
              style: TextStyle(
                fontSize: 13,
                color: MyColors.dustyBlue.value,
                fontWeight: FontWeight.w500,
              ),
              obscureText: widget.config.isPassword && !seen,
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
                hintText: widget.config.hint,
                hintStyle: TextStyle(fontSize: 12),
                suffixIcon: widget.config.isPassword
                    ? IconButton(
                        icon: Image.asset(
                          seen
                              ? TextFieldWidgetConfig.openedEyeIconPath
                              : TextFieldWidgetConfig.closedEyeIconPath,
                        ),
                        onPressed: () {
                          setState(() {
                            seen = !seen;
                          });
                        },
                      )
                    : widget.config.isForMessages
                    ? IconButton(
                        icon: Image.asset(
                          widget.config.textEditingController.text.isEmpty
                              ? TextFieldWidgetConfig.galleryIconPath
                              : TextFieldWidgetConfig.sendMessageIconPath,
                        ),
                        onPressed: () {
                          widget.config.textEditingController.text.isEmpty
                              ? widget.config.sendMessage()
                              : widget.config.pickUpImage();
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
