import 'package:connect/features/auth/views/screens/create_account_screen.dart';
import 'package:connect/features/auth/views/screens/deep_linking_screen.dart';
import 'package:connect/features/auth/views/screens/forgot_password_screen.dart';
import 'package:connect/features/auth/views/screens/login_screen.dart';
import 'package:connect/features/auth/views/screens/update_forgotten_password_screen.dart';
import 'package:connect/features/auth/views/screens/verify_account_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Connect",
      initialRoute: "/",
      routes: {
        "/": (context) => DeepLinkingScreen(),
        "/login": (context) => LoginScreen(),
        "/create_account": (context) => CreateAccountScreen(),
        "/forgot_password": (context) => ForgotPasswordScreen(),
        "/verify_account": (context) => VerifyAccountScreen(),
        "/update_forgotten_password": (context) =>
            UpdateForgottenPasswordScreen(),
      },
    );
  }
}
