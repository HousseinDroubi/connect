// ignore_for_file: public_member_api_docs, sort_constructors_first
// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/features/home/models/ws/ws_model.dart';

class WsEditMessageModel extends WsModel {
  @override
  final String event_name = "edit_message";
  final String message_id;
  final String message_new_content;
  WsEditMessageModel({
    required this.message_id,
    required this.message_new_content,
  });

  WsEditMessageModel copyWith({
    String? message_id,
    String? message_new_content,
  }) {
    return WsEditMessageModel(
      message_id: message_id ?? this.message_id,
      message_new_content: message_new_content ?? this.message_new_content,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'event_name': event_name,
      'message_id': message_id,
      'message_new_content': message_new_content,
    };
  }

  factory WsEditMessageModel.fromMap(Map<String, dynamic> map) {
    return WsEditMessageModel(
      message_id: map['message_id'] as String,
      message_new_content: map['message_new_content'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory WsEditMessageModel.fromJson(String source) =>
      WsEditMessageModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() =>
      'WsEditMessageModel(message_id: $message_id, message_new_content: $message_new_content)';

  @override
  bool operator ==(covariant WsEditMessageModel other) {
    if (identical(this, other)) return true;

    return other.message_id == message_id &&
        other.message_new_content == message_new_content;
  }

  @override
  int get hashCode => message_id.hashCode ^ message_new_content.hashCode;
}
