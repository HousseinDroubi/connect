import 'package:flutter_dotenv/flutter_dotenv.dart';

final String api_base_url = dotenv.env["API_BASE_URL"] ?? "";
final String ws_base_url = dotenv.env["WS_BASE_URL"] ?? "";
