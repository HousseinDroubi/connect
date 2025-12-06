// ignore_for_file: public_member_api_docs, sort_constructors_first
// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/features/home/models/ws/ws_model.dart';

class WSDeleteMessageModel extends WsModel {
  @override
  final String event_name = "delete_message";
  final String message_id;
  WSDeleteMessageModel({required this.message_id});

  WSDeleteMessageModel copyWith({String? message_id}) {
    return WSDeleteMessageModel(message_id: message_id ?? this.message_id);
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{'message_id': message_id};
  }

  factory WSDeleteMessageModel.fromMap(Map<String, dynamic> map) {
    return WSDeleteMessageModel(message_id: map['message_id'] as String);
  }

  String toJson() => json.encode(toMap());

  factory WSDeleteMessageModel.fromJson(String source) =>
      WSDeleteMessageModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() => 'WSDeleteMessageModel(message_id: $message_id)';

  @override
  bool operator ==(covariant WSDeleteMessageModel other) {
    if (identical(this, other)) return true;

    return other.message_id == message_id;
  }

  @override
  int get hashCode => message_id.hashCode;
}
