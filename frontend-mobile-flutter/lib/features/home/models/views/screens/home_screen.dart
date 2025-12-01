// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/constants/app_icons.dart';
import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/features/home/models/views/widgets/user_image_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    final user_image = ref.watch(
      currentUserNotifierProvider.select((user) => user!.profile_url),
    );
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: AppColors.black,
        showSelectedLabels: true,
        currentIndex: currentIndex,
        onTap: (int newIndex) {
          setState(() {
            currentIndex = newIndex;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Image.asset(
              AppIcons.conversationsIconPath,
              width: 25,
              height: 25,
            ),
            label: "Chats",
          ),
          BottomNavigationBarItem(
            icon: Image.asset(AppIcons.searchIconPath, width: 25, height: 25),
            label: "Search",
          ),
          BottomNavigationBarItem(
            icon: UserImageWidget(image_source: user_image),
            label: "You",
          ),
        ],
      ),
    );
  }
}
