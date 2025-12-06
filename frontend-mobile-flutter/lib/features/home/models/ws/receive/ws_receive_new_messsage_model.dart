// ignore_for_file: public_member_api_docs, sort_constructors_first
// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/core/classes/message.dart';
import 'package:connect/features/home/models/ws/ws_model.dart';

class WsReceiveNewMesssageModel extends WsModel {
  @override
  final String event_name = "new_message";
  final String from;
  final Message message;
  WsReceiveNewMesssageModel({required this.from, required this.message});

  WsReceiveNewMesssageModel copyWith({String? from, Message? message}) {
    return WsReceiveNewMesssageModel(
      from: from ?? this.from,
      message: message ?? this.message,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{'from': from, 'message': message.toMap()};
  }

  factory WsReceiveNewMesssageModel.fromMap(Map<String, dynamic> map) {
    return WsReceiveNewMesssageModel(
      from: map['from'] as String,
      message: Message.fromMap(map['message'] as Map<String, dynamic>),
    );
  }

  String toJson() => json.encode(toMap());

  factory WsReceiveNewMesssageModel.fromJson(String source) =>
      WsReceiveNewMesssageModel.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() =>
      'WsReceiveNewMesssageModel(from: $from, message: $message)';

  @override
  bool operator ==(covariant WsReceiveNewMesssageModel other) {
    if (identical(this, other)) return true;

    return other.from == from && other.message == message;
  }

  @override
  int get hashCode => from.hashCode ^ message.hashCode;
}
