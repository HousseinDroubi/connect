// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/constants/server_urls.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

part 'ws_repository.g.dart';

@Riverpod(keepAlive: true)
WsRepository wsRepository(WsRepositoryRef ref) {
  return WsRepository();
}

class WsRepository {
  late WebSocketChannel _channel;
  bool is_connected = false;

  void wsConnect({required String token}) {
    if (!is_connected) {
      _channel = WebSocketChannel.connect(
        Uri.parse("${ServerUrls.wsBaseUrl}?token=$token"),
      );
      is_connected = true;
      wsListenToNewMessages();
    }
  }

  void wsListenToNewMessages() {
    _channel.stream.listen((dynamic data) {
      print(data);
    });
  }
}
