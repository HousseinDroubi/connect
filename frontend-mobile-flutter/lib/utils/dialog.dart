import 'package:connect/constants/my_colors.dart';
import 'package:connect/views/widgets/button/button_widget.dart';
import 'package:connect/views/widgets/button/button_widget_config.dart';
import 'package:flutter/material.dart';

void showPopup({
  required String popupFor,
  required BuildContext context,
  String? dialogText,
  Function? confirmationFunction,
  Function? deleteMessageForAll,
  Function? deleteMessageForMe,
}) {
  String title = "";
  Widget? content;
  TextStyle? textStyle;
  List<Widget>? actions = [];

  if (popupFor == "alert" || popupFor == "confirmation") {
    if (popupFor == "alert") {
      title = "Alert";
      actions = [
        TextButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Center(
            child: Text(
              "Got it",
              textAlign: TextAlign.center,
              style: TextStyle(color: MyColors.black.value),
            ),
          ),
        ),
      ];
    } else {
      title = "Confirmation";
      actions = [
        TextButton(
          onPressed: () async {
            await confirmationFunction!();
            Navigator.pop(context);
          },
          child: Text("Yes", style: TextStyle(color: MyColors.black.value)),
        ),
        TextButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text("No", style: TextStyle(color: MyColors.black.value)),
        ),
      ];
    }
    content = Text(dialogText!);
    textStyle = TextStyle(color: MyColors.black.value, fontSize: 18);
  } else if (popupFor == "loading") {
    content = Container(
      alignment: Alignment.center,
      width: 50,
      height: 50,
      child: CircularProgressIndicator(color: MyColors.blue.value),
    );
    title = "Loading";
  } else if (popupFor == "delete_message_for_me" ||
      popupFor == "delete_message_for_all") {
    title = "Delete Message";
    content = Container(
      alignment: Alignment.center,
      height: popupFor == "delete_message_for_me" ? 50 : 90,
      child: Column(
        mainAxisAlignment: popupFor == "delete_message_for_me"
            ? MainAxisAlignment.center
            : MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (popupFor == "delete_message_for_all")
            ButtonWidget(
              config: ButtonWidgetConifg(
                buttonText: "Delete for all",
                isColoredRed: true,
                buttonFn: () async {
                  await deleteMessageForAll!();
                },
              ),
            ),
          ButtonWidget(
            config: ButtonWidgetConifg(
              buttonText: "Delete for me",
              isColoredRed: true,
              buttonFn: () async {
                await deleteMessageForMe!();
              },
            ),
          ),
        ],
      ),
    );
    actions = [
      Center(
        child: TextButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text("Cancel", style: TextStyle(color: MyColors.black.value)),
        ),
      ),
    ];
  }

  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(title, textAlign: TextAlign.center),
      titleTextStyle: textStyle,
      content: content,
      actions: actions,
    ),
  );
}
