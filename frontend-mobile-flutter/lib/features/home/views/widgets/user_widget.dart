// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/features/home/views/widgets/user_image_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class UserWidget extends ConsumerWidget {
  final String? username;
  final bool is_for_search;
  final bool is_for_chats;
  final bool is_for_conversation;
  final bool is_online;
  final bool is_group;
  final bool is_deleted;
  final String? image_source;
  final String? chats_last_mesasage;
  final String? pin;
  const UserWidget({
    super.key,
    this.username,
    this.is_for_search = false,
    this.is_for_chats = false,
    this.image_source,
    this.chats_last_mesasage,
    this.pin,
    this.is_for_conversation = false,
    this.is_online = false,
    this.is_group = false,
    this.is_deleted = false,
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
                username ?? "Connected users",
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
                    fontStyle: chats_last_mesasage == null || is_deleted
                        ? FontStyle.italic
                        : FontStyle.normal,
                  ),
                ),
              if (is_for_conversation)
                is_group
                    ? Text(
                        "All connected users",
                        style: TextStyle(fontStyle: FontStyle.italic),
                      )
                    : Row(
                        children: [
                          Container(
                            width: 12,
                            height: 12,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: is_online
                                  ? AppColors.onlineColor
                                  : AppColors.offlineColor,
                            ),
                          ),
                          SizedBox(width: 8),
                          Text(is_online ? "Online" : "Offline"),
                        ],
                      ),
            ],
          ),
        ],
      ),
    );
  }
}
