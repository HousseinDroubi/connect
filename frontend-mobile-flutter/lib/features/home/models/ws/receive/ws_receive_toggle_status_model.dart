// ignore_for_file: public_member_api_docs, sort_constructors_first
// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/features/home/models/ws/ws_model.dart';

class WsReceiveToggleStatusModel extends WsModel {
  @override
  final String event_name = "toggle_user_status";
  final String from;
  final bool is_online;
  WsReceiveToggleStatusModel({required this.from, required this.is_online});

  WsReceiveToggleStatusModel copyWith({String? from, bool? is_online}) {
    return WsReceiveToggleStatusModel(
      from: from ?? this.from,
      is_online: is_online ?? this.is_online,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{'from': from, 'is_online': is_online};
  }

  factory WsReceiveToggleStatusModel.fromMap(Map<String, dynamic> map) {
    return WsReceiveToggleStatusModel(
      from: map['from'] as String,
      is_online: map['is_online'] as bool,
    );
  }

  String toJson() => json.encode(toMap());

  factory WsReceiveToggleStatusModel.fromJson(String source) =>
      WsReceiveToggleStatusModel.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() =>
      'WsReceiveToggleStatusModel(from: $from, is_online: $is_online)';

  @override
  bool operator ==(covariant WsReceiveToggleStatusModel other) {
    if (identical(this, other)) return true;

    return other.from == from && other.is_online == is_online;
  }

  @override
  int get hashCode => from.hashCode ^ is_online.hashCode;
}
