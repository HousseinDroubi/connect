// ignore_for_file: public_member_api_docs, sort_constructors_first, overridden_fields
// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/features/home/models/ws/send/ws_edit_message_model.dart';

class WSReceiveEditMessageModel extends WSEditMessageModel {
  final String from;
  final String message_conversation_id;

  WSReceiveEditMessageModel({
    required super.message_id,
    required super.message_new_content,
    required this.from,
    required this.message_conversation_id,
  });

  @override
  WSReceiveEditMessageModel copyWith({
    String? message_id,
    String? message_new_content,
    String? from,
    String? message_conversation_id,
  }) {
    return WSReceiveEditMessageModel(
      message_id: message_id ?? this.message_id,
      message_new_content: message_new_content ?? this.message_new_content,
      from: from ?? this.from,
      message_conversation_id:
          message_conversation_id ?? this.message_conversation_id,
    );
  }

  @override
  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'message_id': message_id,
      'message_new_content': message_new_content,
      'from': from,
      'message_conversation_id': message_conversation_id,
    };
  }

  factory WSReceiveEditMessageModel.fromMap(Map<String, dynamic> map) {
    return WSReceiveEditMessageModel(
      message_id: map['message_id'] as String,
      message_new_content: map['message_new_content'] as String,
      from: map['from'] as String,
      message_conversation_id: map['message_conversation_id'] as String,
    );
  }

  @override
  String toJson() => json.encode(toMap());

  factory WSReceiveEditMessageModel.fromJson(String source) =>
      WSReceiveEditMessageModel.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() {
    return 'WSReceiveEditMessageModel(message_id: $message_id, message_new_content: $message_new_content, from: $from, message_conversation_id: $message_conversation_id)';
  }

  @override
  bool operator ==(covariant WSReceiveEditMessageModel other) {
    if (identical(this, other)) return true;

    return other.message_id == message_id &&
        other.message_new_content == message_new_content &&
        other.from == from &&
        other.message_conversation_id == message_conversation_id;
  }

  @override
  int get hashCode {
    return message_id.hashCode ^
        message_new_content.hashCode ^
        from.hashCode ^
        message_conversation_id.hashCode;
  }
}
