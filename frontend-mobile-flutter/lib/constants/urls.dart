import 'package:flutter_dotenv/flutter_dotenv.dart';

final String apiBaseUrl = dotenv.env["API_BASE_URL"] ?? "";
final String wsBaseUrl = dotenv.env["WS_BASE_URL"] ?? "";
