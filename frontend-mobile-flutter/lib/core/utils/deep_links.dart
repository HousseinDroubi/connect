import 'dart:async';
import 'package:app_links/app_links.dart';
import 'package:connect/features/auth/views/screens/login_screen.dart';
import 'package:connect/features/auth/views/screens/update_forgotten_password_screen.dart';
import 'package:connect/features/auth/views/screens/verify_account_screen.dart';
import 'package:flutter/material.dart';

Future<void> initDeepLinks(
  AppLinks appLinks,
  StreamSubscription<Uri>? sub,
  BuildContext context,
) async {
  final initialLink = await appLinks.getInitialLink();
  if (initialLink == null) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => LoginScreen()),
    );
  }

  sub = appLinks.uriLinkStream.listen((uri) {
    Map<String, String>? map = handleUri(uri);
    navigateToDeepLinksOrLogin(map, context);
  });
}

void navigateToDeepLinksOrLogin(
  Map<String, String>? map,
  BuildContext context,
) {
  if (map != null) {
    if (map["to"] == "verify_account") {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => VerifyAccountScreen(token: map["token"]),
        ),
      );
    } else if (map["to"] == "update_forgotten_password") {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) =>
              UpdateForgottenPasswordScreen(token: map["token"]),
        ),
      );
    }
    return;
  }
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => LoginScreen()),
  );
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
