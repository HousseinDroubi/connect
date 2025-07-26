import 'dart:async';
import 'package:app_links/app_links.dart';

Future<Map<String, String>?> initDeepLinks(
  AppLinks appLinks,
  StreamSubscription<Uri>? sub,
) async {
  final initialLink = await appLinks.getInitialLink();
  if (initialLink != null) {
    return handleUri(initialLink);
  }

  sub = appLinks.uriLinkStream.listen((uri) {
    handleUri(uri);
  });
  return null;
}

Map<String, String>? handleUri(Uri uri) {
  Map<String, String> map = {};
  if (uri.queryParameters.containsKey("token")) {
    map["token"] = uri.queryParameters["token"] ?? "";
    if (uri.pathSegments.last == "verify_account") {
      map["to"] = "verify_account";
    } else if (uri.pathSegments.last == "update_forgotten_password") {
      map["to"] = "update_forgotten_password";
    }
    return map;
  }
  return null;
}
