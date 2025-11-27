import 'package:flutter/widgets.dart';

void focusOn(BuildContext context, FocusNode node) {
  FocusScope.of(context).requestFocus(node);
}
