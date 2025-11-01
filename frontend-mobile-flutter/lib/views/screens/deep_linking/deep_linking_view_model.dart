import 'dart:async';

import 'package:app_links/app_links.dart';
import 'package:connect/utils/deep_links.dart';
import 'package:connect/views/screens/login/login.dart';
import 'package:connect/views/screens/update_forgotten_password/update_forgotten_password.dart';
import 'package:connect/views/screens/verify_account/verify_account.dart';
import 'package:flutter/material.dart';

class DeepLinkingViewModel {
  final AppLinks _appLinks = AppLinks();
  StreamSubscription<Uri>? _sub;

  void getTokenAndPageFromDeepLinking(BuildContext context) async {
    await initDeepLinks(_appLinks, _sub,context);
  }

  AppLinks get appLinks => _appLinks;
  StreamSubscription<Uri>? get sub => _sub;
}
