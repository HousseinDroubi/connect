// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/constants/app_icons.dart';
import 'package:connect/core/utils/app_nav.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/features/home/view_models/conversation_view_model.dart';
import 'package:connect/features/home/views/widgets/user_image_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class UserWidget extends ConsumerStatefulWidget {
  final String? username;
  final bool is_for_search;
  final bool is_for_chats;
  final bool is_for_conversation;
  final bool is_online;
  final bool is_group;
  final bool is_deleted;
  final VoidCallback? onDeleteIconPressed;
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
    this.onDeleteIconPressed,
  });

  @override
  ConsumerState<UserWidget> createState() => _UserWidgetState();
}

class _UserWidgetState extends ConsumerState<UserWidget> {
  bool is_delete_icon_visible = false;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onLongPress: !widget.is_group && widget.is_for_chats
          ? () {
              is_delete_icon_visible = !is_delete_icon_visible;
              setState(() {});
            }
          : null,
      onTap: widget.pin != null
          ? () async {
              showPopup(popupCase: PopupLoading(context: context));
              await ref
                  .read(conversationViewModelProvider.notifier)
                  .getConversationMessages(widget.pin!);
              hidePopup(context);
              setState(() {
                is_delete_icon_visible = false;
              });
              AppNav.push(context, "conversation");
            }
          : null,
      child: SizedBox(
        width: double.infinity,
        height: 60,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                if (widget.is_for_conversation)
                  GestureDetector(
                    onTap: () {
                      AppNav.pop(context);
                    },
                    child: Icon(Icons.keyboard_arrow_left),
                  ),
                UserImageWidget(
                  image_source: widget.image_source,
                  is_small: false,
                ),
                SizedBox(width: 7),
                Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.username ?? "Connected users",
                      style: TextStyle(
                        fontSize: 17,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    if (widget.is_for_search && widget.pin != null)
                      Text(
                        "pin: #$widget.pin",
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    if (widget.is_for_chats)
                      SizedBox(
                        width: 150,
                        child: Text(
                          widget.chats_last_mesasage == null
                              ? "No messages yet"
                              : widget.chats_last_mesasage!,
                          style: TextStyle(
                            overflow: TextOverflow.ellipsis,
                            fontSize: 15,
                            fontWeight: widget.chats_last_mesasage == null
                                ? FontWeight.w300
                                : FontWeight.w500,
                            fontStyle:
                                widget.chats_last_mesasage == null ||
                                    widget.is_deleted
                                ? FontStyle.italic
                                : FontStyle.normal,
                          ),
                        ),
                      ),
                    if (widget.is_for_conversation)
                      widget.is_group
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
                                    color: widget.is_online
                                        ? AppColors.onlineColor
                                        : AppColors.offlineColor,
                                  ),
                                ),
                                SizedBox(width: 8),
                                Text(widget.is_online ? "Online" : "Offline"),
                              ],
                            ),
                  ],
                ),
              ],
            ),
            AnimatedOpacity(
              duration: Duration(milliseconds: 500),
              opacity: is_delete_icon_visible ? 1 : 0,
              child: IconButton(
                onPressed: () {
                  widget.onDeleteIconPressed!();
                  setState(() {
                    is_delete_icon_visible = false;
                  });
                },
                icon: Image.asset(
                  AppIcons.deleteChatIconPath,
                  width: 27,
                  height: 27,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
