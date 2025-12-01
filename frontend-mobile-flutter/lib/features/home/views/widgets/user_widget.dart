// ignore_for_file: non_constant_identifier_names

import 'package:connect/features/home/views/widgets/user_image_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class UserWidget extends ConsumerWidget {
  final String username;
  final bool is_for_search;
  final bool is_for_chats;
  final String? image_source;
  final String? chats_last_mesasage;
  final String? pin;
  const UserWidget({
    super.key,
    required this.username,
    this.is_for_search = false,
    this.is_for_chats = false,
    this.image_source,
    this.chats_last_mesasage,
    this.pin,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SizedBox(
      width: double.infinity,
      height: 60,
      child: Row(
        children: [
          UserImageWidget(image_source: image_source, is_small: false),
          SizedBox(width: 7),
          Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                username,
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.w600),
              ),
              if (is_for_search && pin != null)
                Text(
                  "pin: #$pin",
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.w400),
                ),
              if (is_for_chats)
                Text(
                  chats_last_mesasage == null
                      ? "No messages yet"
                      : chats_last_mesasage!,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: chats_last_mesasage == null
                        ? FontWeight.w300
                        : FontWeight.w500,
                    fontStyle: chats_last_mesasage == null
                        ? FontStyle.italic
                        : FontStyle.normal,
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
