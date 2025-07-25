import 'dart:async';

import 'package:app_links/app_links.dart';
import 'package:connect/utils/deep_links.dart';

class DeepLinkingViewModel {
  final AppLinks _appLinks = AppLinks();
  StreamSubscription<Uri>? _sub;

  Future<Map<String, String>?> getTokenAndPageFromDeepLinking() async {
    return await initDeepLinks(_appLinks, _sub);
  }

  AppLinks get appLinks => _appLinks;
  StreamSubscription<Uri>? get sub => _sub;
}
