import 'dart:convert';

import 'package:connect/features/home/models/ws/ws_model.dart';

class WSSendNewMessageModel extends WsModel {
  @override
  final String event_name = "new_message";
  final bool is_text;
  final String content;
  final String? to;
  WSSendNewMessageModel({
    required this.is_text,
    required this.content,
    this.to,
  });

  WSSendNewMessageModel copyWith({bool? is_text, String? content, String? to}) {
    return WSSendNewMessageModel(
      is_text: is_text ?? this.is_text,
      content: content ?? this.content,
      to: to ?? this.to,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{'is_text': is_text, 'content': content, 'to': to};
  }

  factory WSSendNewMessageModel.fromMap(Map<String, dynamic> map) {
    return WSSendNewMessageModel(
      is_text: map['is_text'] as bool,
      content: map['content'] as String,
      to: map['to'] != null ? map['to'] as String : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory WSSendNewMessageModel.fromJson(String source) =>
      WSSendNewMessageModel.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() =>
      'WSSendNewMessageModel(is_text: $is_text, content: $content, to: $to)';

  @override
  bool operator ==(covariant WSSendNewMessageModel other) {
    if (identical(this, other)) return true;

    return other.is_text == is_text &&
        other.content == content &&
        other.to == to;
  }

  @override
  int get hashCode => is_text.hashCode ^ content.hashCode ^ to.hashCode;
}
