import 'dart:async';

import 'package:connect/features/auth/repositories/auth_local_repository.dart';
import 'package:connect/features/auth/view_models/auth_view_model.dart';
import 'package:connect/features/auth/views/screens/create_account_screen.dart';
import 'package:connect/features/auth/views/screens/forgot_password_screen.dart';
import 'package:connect/features/auth/views/screens/login_screen.dart';
import 'package:connect/features/auth/views/screens/update_forgotten_password_screen.dart';
import 'package:connect/features/auth/views/screens/verify_account_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  final ProviderContainer container = ProviderContainer();
  final notifier = container.read(authLocalRepositoryProvider);
  await notifier.initSharedPreferences();
  runApp(ProviderScope(child: const MyApp()));
}

class MyApp extends ConsumerStatefulWidget {
  const MyApp({super.key});

  @override
  ConsumerState<MyApp> createState() => _MyAppState();
}

class _MyAppState extends ConsumerState<MyApp> {
  final _navigatorKey = GlobalKey<NavigatorState>();
  StreamSubscription<Uri>? _linkSubscription;

  @override
  void initState() {
    super.initState();
    ref
        .read(authViewModelProvider)
        .getTokenAndPageFromDeepLinking(_navigatorKey, _linkSubscription);
  }

  @override
  void dispose() {
    _linkSubscription?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: _navigatorKey,
      title: "Connect",
      initialRoute: "/login",
      routes: {
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
