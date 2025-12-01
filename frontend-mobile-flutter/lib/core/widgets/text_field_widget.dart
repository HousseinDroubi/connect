// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/constants/app_icons.dart';
import 'package:flutter/material.dart';

class TextFieldWidget extends StatefulWidget {
  final String hint;
  final VoidCallback nextFunction;
  final TextEditingController textEditingController;
  final String? title;
  final bool? isPassword;
  final bool? isFull;
  final bool isForMessages;
  final FocusNode? focusNode;
  const TextFieldWidget({
    super.key,
    required this.hint,
    required this.nextFunction,
    required this.textEditingController,
    this.title,
    this.isPassword = false,
    this.isFull = false,
    this.isForMessages = false,
    this.focusNode,
  });

  @override
  State<TextFieldWidget> createState() => _TextFieldWidgetState();
}

class _TextFieldWidgetState extends State<TextFieldWidget> {
  bool seen = false;

  @override
  void dispose() {
    widget.textEditingController.dispose();
    widget.focusNode?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        if (!widget.isForMessages)
          Text(
            widget.title!,
            style: TextStyle(
              color: AppColors.black,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
        Container(
          margin: EdgeInsets.only(top: 4),
          child: SizedBox(
            width: widget.isFull! ? double.infinity : 260,
            height: 40,
            child: TextField(
              focusNode: widget.focusNode,
              onSubmitted: (String value) {
                if (value != "") {
                  widget.nextFunction();
                }
              },
              controller: widget.textEditingController,
              cursorHeight: 15,
              style: TextStyle(
                fontSize: 13,
                color: AppColors.dustyBlue,
                fontWeight: FontWeight.w500,
              ),
              obscureText: widget.isPassword! && !seen,
              cursorColor: AppColors.dustyBlue,
              decoration: InputDecoration(
                filled: true,
                fillColor: AppColors.iceBlue,
                border: InputBorder.none,
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(4),
                  borderSide: BorderSide.none,
                ),
                focusedBorder: InputBorder.none,
                hintText: widget.hint,
                hintStyle: TextStyle(fontSize: 12),
                suffixIcon: widget.isPassword!
                    ? IconButton(
                        icon: Image.asset(
                          seen
                              ? AppIcons.openedEyeIconPath
                              : AppIcons.closedEyeIconPath,
                        ),
                        onPressed: () {
                          setState(() {
                            seen = !seen;
                          });
                        },
                      )
                    : widget.isForMessages
                    ? IconButton(
                        icon: Image.asset(
                          widget.textEditingController.text.isEmpty
                              ? AppIcons.galleryIconPath
                              : AppIcons.sendMessageIconPath,
                        ),
                        onPressed: () {},
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
