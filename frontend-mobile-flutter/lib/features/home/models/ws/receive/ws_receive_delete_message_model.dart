// ignore_for_file: public_member_api_docs, sort_constructors_first, overridden_fields, annotate_overrides
// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/features/home/models/ws/send/ws_delete_message_model.dart';

class WsReceiveDeleteMessageModel extends WSDeleteMessageModel {
  final String from;
  final String message_conversation_id;

  WsReceiveDeleteMessageModel({
    required super.message_id,
    required this.from,
    required this.message_conversation_id,
  });

  WsReceiveDeleteMessageModel copyWith({
    String? message_id,
    String? message_new_content,
    String? from,
    String? message_conversation_id,
  }) {
    return WsReceiveDeleteMessageModel(
      message_id: message_id ?? this.message_id,
      from: from ?? this.from,
      message_conversation_id:
          message_conversation_id ?? this.message_conversation_id,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'message_id': message_id,
      'from': from,
      'message_conversation_id': message_conversation_id,
    };
  }

  factory WsReceiveDeleteMessageModel.fromMap(Map<String, dynamic> map) {
    return WsReceiveDeleteMessageModel(
      message_id: map['message_id'] as String,
      from: map['from'] as String,
      message_conversation_id: map['message_conversation_id'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory WsReceiveDeleteMessageModel.fromJson(String source) =>
      WsReceiveDeleteMessageModel.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() {
    return 'WsReceiveDeleteMessageModel(message_id: $message_id, from: $from, message_conversation_id: $message_conversation_id)';
  }

  @override
  bool operator ==(covariant WsReceiveDeleteMessageModel other) {
    if (identical(this, other)) return true;

    return other.message_id == message_id &&
        other.from == from &&
        other.message_conversation_id == message_conversation_id;
  }

  @override
  int get hashCode {
    return message_id.hashCode ^
        from.hashCode ^
        message_conversation_id.hashCode;
  }
}
