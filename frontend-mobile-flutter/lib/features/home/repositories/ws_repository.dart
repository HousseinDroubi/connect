import 'package:connect/core/constants/server_urls.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

part 'ws_repository.g.dart';

@Riverpod(keepAlive: true)
class WsRepository extends _$WsRepository {
  late WebSocketChannel _channel;

  @override
  void build() {
    _channel = WebSocketChannel.connect(Uri.parse(ServerUrls.wsBaseUrl));

    weListenToNewMessages();

    ref.onDispose(() {
      _channel.sink.close();
    });
  }

  void weListenToNewMessages() {
    _channel.stream.listen((dynamic data) {
      print(data);
    });
  }
}
