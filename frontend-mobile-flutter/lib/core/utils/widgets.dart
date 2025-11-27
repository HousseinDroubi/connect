import 'package:flutter/cupertino.dart';

void clearTextEditingControllers(List<TextEditingController> list) {
  for (TextEditingController textEditingController in list) {
    textEditingController.text = "";
  }
}
