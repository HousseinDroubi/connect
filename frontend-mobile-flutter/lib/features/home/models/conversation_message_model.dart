// ignore_for_file: public_member_api_docs, sort_constructors_first, non_constant_identifier_names
import 'dart:convert';

class ConversationMessageModel {
  final String id;
  final String sender;
  final String receiver;
  final bool is_text;
  final String content;
  final String conversation_id;
  final bool deleted;
  final DateTime created_at;

  ConversationMessageModel({
    required this.id,
    required this.sender,
    required this.receiver,
    required this.is_text,
    required this.content,
    required this.conversation_id,
    required this.deleted,
    required this.created_at,
  });

  ConversationMessageModel copyWith({
    String? id,
    String? sender,
    String? receiver,
    bool? is_text,
    String? content,
    String? conversation_id,
    bool? deleted,
    DateTime? created_at,
  }) {
    return ConversationMessageModel(
      id: id ?? this.id,
      sender: sender ?? this.sender,
      receiver: receiver ?? this.receiver,
      is_text: is_text ?? this.is_text,
      content: content ?? this.content,
      conversation_id: conversation_id ?? this.conversation_id,
      deleted: deleted ?? this.deleted,
      created_at: created_at ?? this.created_at,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      '_id': id,
      'sender': sender,
      'receiver': receiver,
      'is_text': is_text,
      'content': content,
      'conversation_id': conversation_id,
      'deleted': deleted,
      'created_at': created_at,
    };
  }

  factory ConversationMessageModel.fromMap(Map<String, dynamic> map) {
    return ConversationMessageModel(
      id: map['_id'] ?? "",
      sender: map['sender'] ?? "",
      receiver: map['receiver'] ?? "",
      is_text: map['is_text'] ?? false,
      content: map['content'] ?? "",
      conversation_id: map['conversation_id'] ?? "",
      deleted: map['deleted'] ?? false,
      created_at: DateTime.parse(map['created_at']),
    );
  }

  String toJson() => json.encode(toMap());

  factory ConversationMessageModel.fromJson(String source) =>
      ConversationMessageModel.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() {
    return 'MessageModel(id: $id, sender: $sender, receiver: $receiver, is_text: $is_text, content: $content, conversation_id: $conversation_id, deleted: $deleted, created_at: $created_at)';
  }

  @override
  bool operator ==(covariant ConversationMessageModel other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.sender == sender &&
        other.receiver == receiver &&
        other.is_text == is_text &&
        other.content == content &&
        other.conversation_id == conversation_id &&
        other.deleted == deleted &&
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
        deleted.hashCode ^
        created_at.hashCode;
  }
}
