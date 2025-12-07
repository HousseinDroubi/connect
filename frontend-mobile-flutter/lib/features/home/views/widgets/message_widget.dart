// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/constants/app_icons.dart';
import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/widgets/loader_widget.dart';
import 'package:connect/features/home/view_models/conversation_view_model.dart';
import 'package:connect/features/home/views/widgets/user_image_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MessageWidget extends ConsumerStatefulWidget {
  final String id;
  final String content;
  final String sender_id;
  final bool is_text;
  final bool is_group;
  final bool is_deleted;
  final DateTime created_at;
  final String? profile_url;
  final Function onDeleteMessage;
  final VoidCallback onEditMessage;

  const MessageWidget({
    super.key,
    required this.id,
    required this.content,
    required this.sender_id,
    required this.is_text,
    required this.is_group,
    required this.created_at,
    required this.onDeleteMessage,
    required this.onEditMessage,
    this.profile_url,
    this.is_deleted = false,
  });
  @override
  ConsumerState<MessageWidget> createState() => _MessageWidgetState();
}

class _MessageWidgetState extends ConsumerState<MessageWidget> {
  bool is_edit_icon_visible = false;
  bool is_delete_icon_visible = false;

  @override
  Widget build(BuildContext context) {
    final bool is_current_user =
        ref.read(currentUserNotifierProvider)!.id == widget.sender_id;
    return InkWell(
      onLongPress: () {
        setState(() {
          if (is_current_user) {
            is_edit_icon_visible = !is_edit_icon_visible;
          }
          is_delete_icon_visible = !is_delete_icon_visible;
        });
      },
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: MainAxisAlignment.start,
        textDirection: is_current_user ? TextDirection.rtl : TextDirection.ltr,
        children: [
          if (widget.is_group)
            UserImageWidget(image_source: widget.profile_url),
          SizedBox(width: 10),
          IntrinsicWidth(
            child: IntrinsicHeight(
              child: Container(
                alignment: Alignment.centerLeft,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: is_current_user ? AppColors.blue : AppColors.iceBlue,
                ),
                constraints: BoxConstraints(
                  minHeight: 38,
                  maxHeight: 200,
                  minWidth: 70,
                  maxWidth: 200,
                ),
                padding: EdgeInsets.symmetric(
                  horizontal: widget.is_text ? 10 : 6,
                  vertical: 6,
                ),
                child: widget.is_text
                    ? Text(
                        widget.content,
                        style: TextStyle(
                          color: is_current_user
                              ? AppColors.white
                              : AppColors.black,
                          fontSize: 16,
                          fontWeight: widget.is_deleted
                              ? FontWeight.w400
                              : FontWeight.w500,
                          fontStyle: widget.is_deleted
                              ? FontStyle.italic
                              : null,
                        ),
                      )
                    : FutureBuilder(
                        future: ref
                            .read(conversationViewModelProvider.notifier)
                            .viewImage(widget.id),
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            return Image.memory(
                              fit: BoxFit.cover,
                              snapshot.data!,
                            );
                          }
                          if (snapshot.hasError) {
                            return Image.asset(AppIcons.groupIconPath);
                          }
                          return LoaderWidget();
                        },
                      ),
              ),
            ),
          ),
          if (is_delete_icon_visible)
            GestureDetector(
              onTap: () {
                widget.onDeleteMessage();
                is_delete_icon_visible = false;
                is_edit_icon_visible = false;
                setState(() {});
              },
              child: Container(
                margin: EdgeInsets.only(
                  left: is_current_user ? 0 : 7,
                  right: is_current_user ? 7 : 0,
                ),
                child: Image.asset(
                  AppIcons.deleteIconPath,
                  width: 25,
                  height: 25,
                ),
              ),
            ),
          if (is_edit_icon_visible && !widget.is_deleted && widget.is_text)
            GestureDetector(
              onTap: () {
                widget.onEditMessage();
                is_delete_icon_visible = false;
                is_edit_icon_visible = false;
                setState(() {});
              },
              child: Container(
                margin: EdgeInsets.only(right: 7),
                child: Image.asset(
                  AppIcons.editIconPath,
                  width: 25,
                  height: 25,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
