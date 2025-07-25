import 'package:connect/views/screens/deep_linking/deep_linking_view_model.dart';
import 'package:flutter/material.dart';

class DeepLinking extends StatefulWidget {
  const DeepLinking({super.key});

  @override
  State<DeepLinking> createState() => _DeepLinkingState();
}

class _DeepLinkingState extends State<DeepLinking> {
  DeepLinkingViewModel viewModel = DeepLinkingViewModel();

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      try {
        viewModel.getTokenAndPageFromDeepLinking();
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
