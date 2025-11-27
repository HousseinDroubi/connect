import 'package:connect/features/auth/view_models/deep_linking_screen_view_model.dart';
import 'package:flutter/material.dart';

class DeepLinkingScreen extends StatefulWidget {
  const DeepLinkingScreen({super.key});

  @override
  State<DeepLinkingScreen> createState() => _DeepLinkingScreenState();
}

class _DeepLinkingScreenState extends State<DeepLinkingScreen> {
  DeepLinkingScreenViewModel viewModel = DeepLinkingScreenViewModel();

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) async {
      try {
        viewModel.getTokenAndPageFromDeepLinking(context);
      } catch (e) {
        debugPrint("error: ${e.toString()}");
      }
    });
  }

  @override
  void dispose() {
    viewModel.sub?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold();
  }
}
