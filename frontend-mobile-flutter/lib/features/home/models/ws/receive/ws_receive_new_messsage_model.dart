// ignore_for_file: public_member_api_docs, sort_constructors_first
// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/core/classes/message.dart';
import 'package:connect/features/home/models/ws/ws_model.dart';

class WSReceiveNewMesssageModel extends WsModel {
  @override
  final String event_name = "new_message";
  final String from;
  final Message message;
  WSReceiveNewMesssageModel({required this.from, required this.message});

  WSReceiveNewMesssageModel copyWith({String? from, Message? message}) {
    return WSReceiveNewMesssageModel(
      from: from ?? this.from,
      message: message ?? this.message,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{'from': from, 'message': message.toMap()};
  }

  factory WSReceiveNewMesssageModel.fromMap(Map<String, dynamic> map) {
    return WSReceiveNewMesssageModel(
      from: map['from'] as String,
      message: Message.fromMap(map['message'] as Map<String, dynamic>),
    );
  }

  String toJson() => json.encode(toMap());

  factory WSReceiveNewMesssageModel.fromJson(String source) =>
      WSReceiveNewMesssageModel.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() =>
      'WSReceiveNewMesssageModel(from: $from, message: $message)';

  @override
  bool operator ==(covariant WSReceiveNewMesssageModel other) {
    if (identical(this, other)) return true;

    return other.from == from && other.message == message;
  }

  @override
  int get hashCode => from.hashCode ^ message.hashCode;
}
