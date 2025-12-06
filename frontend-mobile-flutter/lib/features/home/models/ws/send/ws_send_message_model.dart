// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/features/home/models/ws/ws_model.dart';

class WsSendNewMessageModel extends WsModel {
  @override
  final String event_name = "new_message";
  final bool is_text;
  final String content;
  final String? to;
  WsSendNewMessageModel({
    required this.is_text,
    required this.content,
    this.to,
  });

  WsSendNewMessageModel copyWith({bool? is_text, String? content, String? to}) {
    return WsSendNewMessageModel(
      is_text: is_text ?? this.is_text,
      content: content ?? this.content,
      to: to ?? this.to,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{'is_text': is_text, 'content': content, 'to': to};
  }

  factory WsSendNewMessageModel.fromMap(Map<String, dynamic> map) {
    return WsSendNewMessageModel(
      is_text: map['is_text'] as bool,
      content: map['content'] as String,
      to: map['to'] != null ? map['to'] as String : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory WsSendNewMessageModel.fromJson(String source) =>
      WsSendNewMessageModel.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() =>
      'WsSendNewMessageModel(is_text: $is_text, content: $content, to: $to)';

  @override
  bool operator ==(covariant WsSendNewMessageModel other) {
    if (identical(this, other)) return true;

    return other.is_text == is_text &&
        other.content == content &&
        other.to == to;
  }

  @override
  int get hashCode => is_text.hashCode ^ content.hashCode ^ to.hashCode;
}
