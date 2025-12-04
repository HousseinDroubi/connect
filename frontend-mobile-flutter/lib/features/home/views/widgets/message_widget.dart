// ignore_for_file: non_constant_identifier_names

import 'package:flutter/material.dart';

class MessageWidget extends StatelessWidget {
  final String id;
  final String content;
  final String sender_id;
  final bool is_text;
  final bool is_group;
  final DateTime created_at;
  final String? profile_url;

  const MessageWidget({
    super.key,
    required this.id,
    required this.content,
    required this.sender_id,
    required this.is_text,
    required this.is_group,
    required this.created_at,
    this.profile_url,
  });

  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
