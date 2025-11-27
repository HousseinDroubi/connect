import 'package:flutter_dotenv/flutter_dotenv.dart';

class ServerUrls {
  static final String apiBaseUrl = dotenv.env["API_BASE_URL"] ?? "";
  static final String wsBaseUrl = dotenv.env["WS_BASE_URL"] ?? "";
}
