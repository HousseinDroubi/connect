import 'package:connect/views/screens/create_account/create_account.dart';
import 'package:connect/views/screens/deep_linking/deep_linking.dart';
import 'package:connect/views/screens/forgot_password/forgot_password.dart';
import 'package:connect/views/screens/login/login.dart';
import 'package:connect/views/screens/update_forgotten_password/update_forgotten_password.dart';
import 'package:connect/views/screens/verify_account/verify_account.dart';
import 'package:flutter/material.dart';

void main() {
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
        "/": (context) => DeepLinking(),
        "/login": (context) => Login(),
        "/create_account": (context) => CreateAccount(),
        "/forgot_password": (context) => ForgotPassword(),
        "/verify_account": (context) => VerifyAccount(),
        "/update_forgotten_password": (context) => UpdateForgottenPassword(),
      },
    );
  }
}
