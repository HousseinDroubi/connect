import 'dart:async';
import 'package:app_links/app_links.dart';
import 'package:connect/views/screens/login/login.dart';
import 'package:connect/views/screens/update_forgotten_password/update_forgotten_password.dart';
import 'package:connect/views/screens/verify_account/verify_account.dart';
import 'package:flutter/material.dart';

Future<void> initDeepLinks(
  AppLinks appLinks,
  StreamSubscription<Uri>? sub,
    BuildContext context
) async {
  final initialLink = await appLinks.getInitialLink();
  if (initialLink == null) {
    Navigator.push(context, MaterialPageRoute(builder: (context) => Login()));
  }

  sub = appLinks.uriLinkStream.listen((uri) {
    Map<String,String>? map = handleUri(uri);
    navigateToDeepLinksOrLogin(map,context);
  });
}

void navigateToDeepLinksOrLogin(Map<String,String>? map,BuildContext context){
  if(map!=null){
    if (map["to"] == "verify_account") {
      Navigator.push(context,MaterialPageRoute(builder: (context) => VerifyAccount(token: map["token"])));
    } else if (map["to"] == "update_forgotten_password") {
      Navigator.push(context,MaterialPageRoute(builder: (context) => UpdateForgottenPassword(token: map["token"])));
    }
    return;
  }
  Navigator.push(context, MaterialPageRoute(builder: (context) => Login()));
}

Map<String, String>? handleUri(Uri uri) {
  Map<String, String> map = {};

  if (uri.path.startsWith("/verify_account/")) {
      map["token"] = uri.path.split("/verify_account/")[1];
      map["to"] = "verify_account";
      return map;
    } else if (uri.path.startsWith("/update_forgotten_password/")) {
      map["token"] = uri.path.split("/update_forgotten_password/")[1];
      map["to"] = "update_forgotten_password";
      return map;
    }
    return null;
}
