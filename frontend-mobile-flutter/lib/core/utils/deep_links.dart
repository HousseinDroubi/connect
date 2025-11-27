import 'dart:async';
import 'package:app_links/app_links.dart';
import 'package:connect/core/utils/app_nav.dart';
import 'package:flutter/material.dart';

Future<void> initDeepLinks(
  AppLinks appLinks,
  StreamSubscription<Uri>? sub,
  BuildContext context,
) async {
  final initialLink = await appLinks.getInitialLink();
  if (initialLink == null) {
    AppNav.push(context, "login");
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
      // TODO: add token to the state
      AppNav.push(context, "verify_account");
    } else if (map["to"] == "update_forgotten_password") {
      // TODO: add token to the state
      AppNav.push(context, "update_forgotten_password");
    }
    return;
  }
  AppNav.push(context, "login");
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
