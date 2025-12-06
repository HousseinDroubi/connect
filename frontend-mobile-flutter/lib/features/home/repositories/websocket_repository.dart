import 'package:connect/core/constants/server_urls.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

part 'websocket_repository.g.dart';

@Riverpod(keepAlive: true)
class WebsocketRepository extends _$WebsocketRepository {
  late WebSocketChannel _channel;

  @override
  void build(Object other) {
    _channel = WebSocketChannel.connect(Uri.parse(ServerUrls.wsBaseUrl));

    ref.onDispose(() {
      _channel.sink.close();
    });
  }
}
