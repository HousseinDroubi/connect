import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/features/auth/views/widgets/text_field_widget.dart';
import 'package:flutter/material.dart';

class PopupCase {
  final BuildContext context;
  const PopupCase({required this.context});
}

class PopupLoading extends PopupCase {
  const PopupLoading({required super.context});
}

class PopupEditMessage extends PopupCase {
  final TextEditingController controller;
  final VoidCallback nextFunction;
  const PopupEditMessage({
    required super.context,
    required this.controller,
    required this.nextFunction,
  });
}

class PopupDialog extends PopupCase {
  const PopupDialog({required super.context});
}

class PopupAlert extends PopupCase {
  final String popupContent;
  const PopupAlert({required super.context, required this.popupContent});
}

class PopupConfirmation extends PopupAlert {
  final Function confirmationFunction;
  const PopupConfirmation({
    required super.context,
    required super.popupContent,
    required this.confirmationFunction,
  });
}

class PopupDeleteMessageForMe extends PopupCase {
  final Function deleteMessageForMeFunction;
  const PopupDeleteMessageForMe({
    required super.context,
    required this.deleteMessageForMeFunction,
  });
}

class PopupDeleteMessageForAll extends PopupDeleteMessageForMe {
  final Function deleteMessageForAllFunction;
  const PopupDeleteMessageForAll({
    required super.context,
    required super.deleteMessageForMeFunction,
    required this.deleteMessageForAllFunction,
  });
}

void showPopup({required PopupCase popupCase}) {
  String title = "";
  Widget? content;
  TextStyle? textStyle;
  List<Widget>? actions = [];

  if (popupCase is PopupAlert || popupCase is PopupConfirmation) {
    if (popupCase is PopupAlert) {
      final PopupAlert popupAlert = popupCase;
      content = Text(popupAlert.popupContent);
      title = "Alert";
      actions = [
        TextButton(
          onPressed: () {
            Navigator.pop(popupAlert.context);
          },
          child: Center(
            child: Text(
              "Got it",
              textAlign: TextAlign.center,
              style: TextStyle(color: AppColors.black),
            ),
          ),
        ),
      ];
    } else {
      final PopupConfirmation popupConfirmation =
          popupCase as PopupConfirmation;
      content = Text(popupConfirmation.popupContent);
      title = "Confirmation";
      actions = [
        TextButton(
          onPressed: () async {
            await popupConfirmation.confirmationFunction();
            Navigator.pop(popupConfirmation.context);
          },
          child: Text("Yes", style: TextStyle(color: AppColors.black)),
        ),
        TextButton(
          onPressed: () {
            Navigator.pop(popupConfirmation.context);
          },
          child: Text("No", style: TextStyle(color: AppColors.black)),
        ),
      ];
    }
    textStyle = TextStyle(color: AppColors.black, fontSize: 18);
  } else if (popupCase is PopupLoading) {
    content = Container(
      alignment: Alignment.center,
      width: 50,
      height: 50,
      child: CircularProgressIndicator(color: AppColors.blue),
    );
    title = "Loading";
  } else if (popupCase is PopupDeleteMessageForMe ||
      popupCase is PopupDeleteMessageForAll) {
    title = "Delete Message";
    content = Container(
      alignment: Alignment.center,
      height: popupCase is PopupDeleteMessageForMe ? 50 : 90,
      child: Column(
        mainAxisAlignment: popupCase is PopupDeleteMessageForMe
            ? MainAxisAlignment.center
            : MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (popupCase is PopupDeleteMessageForAll)
            ButtonWidget(
              buttonText: "Delete for all",
              isColoredRed: true,
              buttonFn: () async {
                await popupCase.deleteMessageForAllFunction();
              },
            ),
          ButtonWidget(
            buttonText: "Delete for me",
            isColoredRed: true,
            buttonFn: () async {
              PopupDeleteMessageForMe popupDeleteMessageForMe =
                  popupCase as PopupDeleteMessageForMe;
              await popupDeleteMessageForMe.deleteMessageForMeFunction();
            },
          ),
        ],
      ),
    );
    actions = [
      Center(
        child: TextButton(
          onPressed: () {
            Navigator.pop(popupCase.context);
          },
          child: Text("Cancel", style: TextStyle(color: AppColors.black)),
        ),
      ),
    ];
  } else if (popupCase is PopupEditMessage) {
    title = "Edit Message";
    PopupEditMessage popupEditMessage = popupCase;
    content = Container(
      height: 70,
      alignment: Alignment.center,
      child: TextFieldWidget(
        title: "Edit Message",
        hint: "Edit your message",
        nextFunction: popupEditMessage.nextFunction,
        textEditingController: popupEditMessage.controller,
      ),
    );

    actions = [
      TextButton(
        onPressed: () async {
          await popupEditMessage.nextFunction;
          Navigator.pop(popupEditMessage.context);
        },
        child: Text("Yes", style: TextStyle(color: AppColors.black)),
      ),
      TextButton(
        onPressed: () {
          Navigator.pop(popupEditMessage.context);
        },
        child: Text("No", style: TextStyle(color: AppColors.black)),
      ),
    ];
  }

  showDialog(
    context: popupCase.context,
    builder: (context) => AlertDialog(
      title: Text(title, textAlign: TextAlign.center),
      titleTextStyle: textStyle,
      content: content,
      actions: actions,
    ),
  );
}

void hidePopup(BuildContext context) {
  Navigator.pop(context);
}
