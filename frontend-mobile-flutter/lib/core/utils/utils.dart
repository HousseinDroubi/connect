import 'package:flutter/widgets.dart';

void focusOn(BuildContext context, FocusNode node) {
  FocusScope.of(context).requestFocus(node);
}

Map<String, String?> handleUri(Uri uri) {
  Map<String, String?> map = {"to": "login", "token": null};
  if (uri.path.startsWith("/verify_account/")) {
    map["token"] = uri.path.split("/verify_account/")[1];
    map["to"] = "verify_account";
  } else if (uri.path.startsWith("/update_forgotten_password/")) {
    map["token"] = uri.path.split("/update_forgotten_password/")[1];
    map["to"] = "update_forgotten_password";
  }
  return map;
}
