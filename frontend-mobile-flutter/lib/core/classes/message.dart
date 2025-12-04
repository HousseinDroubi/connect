// ignore_for_file: public_member_api_docs, sort_constructors_first
// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/core/classes/person.dart';

class Message {
  final String id;
  final Person sender;
  final Person? receiver;
  final bool is_text;
  final String content;
  final String conversation_id;
  final DateTime? deleted_for_others_at;
  final DateTime created_at;

  Message({
    required this.id,
    required this.sender,
    this.receiver,
    required this.is_text,
    required this.content,
    required this.conversation_id,
    this.deleted_for_others_at,
    required this.created_at,
  });

  Message copyWith({
    String? id,
    Person? sender,
    Person? receiver,
    bool? is_text,
    String? content,
    String? conversation_id,
    DateTime? deleted_for_others_at,
    DateTime? created_at,
  }) {
    return Message(
      id: id ?? this.id,
      sender: sender ?? this.sender,
      receiver: receiver ?? this.receiver,
      is_text: is_text ?? this.is_text,
      content: content ?? this.content,
      conversation_id: conversation_id ?? this.conversation_id,
      deleted_for_others_at:
          deleted_for_others_at ?? this.deleted_for_others_at,
      created_at: created_at ?? this.created_at,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      '_id': id,
      'sender': sender.toMap(),
      'receiver': receiver?.toMap(),
      'is_text': is_text,
      'content': content,
      'conversation_id': conversation_id,
      'deleted_for_others_at': deleted_for_others_at,
      'created_at': created_at,
    };
  }

  factory Message.fromMap(Map<String, dynamic> map) {
    return Message(
      id: map['_id'] ?? "",
      sender: Person.fromMap(map['sender'] as Map<String, dynamic>),
      receiver: map['receiver'] != null
          ? Person.fromMap(map['receiver'] as Map<String, dynamic>)
          : null,
      is_text: map['is_text'] ?? true,
      content: map['content'] ?? "",
      conversation_id: map['conversation_id'] ?? "",
      deleted_for_others_at: map['deleted_for_others_at'] != null
          ? DateTime.parse(map['deleted_for_others_at'])
          : null,
      created_at: DateTime.parse(map['created_at']),
    );
  }

  String toJson() => json.encode(toMap());

  factory Message.fromJson(String source) =>
      Message.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'Message(id: $id, sender: $sender, receiver: $receiver, is_text: $is_text, content: $content, conversation_id: $conversation_id, deleted_for_others_at: $deleted_for_others_at, created_at: $created_at)';
  }

  @override
  bool operator ==(covariant Message other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.sender == sender &&
        other.receiver == receiver &&
        other.is_text == is_text &&
        other.content == content &&
        other.conversation_id == conversation_id &&
        other.deleted_for_others_at == deleted_for_others_at &&
        other.created_at == created_at;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        sender.hashCode ^
        receiver.hashCode ^
        is_text.hashCode ^
        content.hashCode ^
        conversation_id.hashCode ^
        deleted_for_others_at.hashCode ^
        created_at.hashCode;
  }
}
