// ignore_for_file: public_member_api_docs, sort_constructors_first
// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/features/home/models/ws/ws_model.dart';

class WSReceiveToggleStatusModel extends WsModel {
  @override
  final String event_name = "toggle_user_status";
  final String from;
  final bool is_online;
  WSReceiveToggleStatusModel({required this.from, required this.is_online});

  WSReceiveToggleStatusModel copyWith({String? from, bool? is_online}) {
    return WSReceiveToggleStatusModel(
      from: from ?? this.from,
      is_online: is_online ?? this.is_online,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{'from': from, 'is_online': is_online};
  }

  factory WSReceiveToggleStatusModel.fromMap(Map<String, dynamic> map) {
    return WSReceiveToggleStatusModel(
      from: map['from'] as String,
      is_online: map['is_online'] as bool,
    );
  }

  String toJson() => json.encode(toMap());

  factory WSReceiveToggleStatusModel.fromJson(String source) =>
      WSReceiveToggleStatusModel.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() =>
      'WSReceiveToggleStatusModel(from: $from, is_online: $is_online)';

  @override
  bool operator ==(covariant WSReceiveToggleStatusModel other) {
    if (identical(this, other)) return true;

    return other.from == from && other.is_online == is_online;
  }

  @override
  int get hashCode => from.hashCode ^ is_online.hashCode;
}
