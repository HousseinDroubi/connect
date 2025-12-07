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
    }
  }

  void sendMessage(String json) {
    if (!is_connected) return;
    _channel.sink.add(json);
  }

  Stream<dynamic> get stream => _channel.stream;
}
