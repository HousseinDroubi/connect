// ignore_for_file: public_member_api_docs, sort_constructors_first, non_constant_identifier_names
import 'dart:convert';

class ChatMessageModel {
  final String id;
  final String sender;
  final String receiver;
  final bool is_text;
  final String content;
  final String chat_id;
  final bool deleted;
  final DateTime created_at;

  ChatMessageModel({
    required this.id,
    required this.sender,
    required this.receiver,
    required this.is_text,
    required this.content,
    required this.chat_id,
    required this.deleted,
    required this.created_at,
  });

  ChatMessageModel copyWith({
    String? id,
    String? sender,
    String? receiver,
    bool? is_text,
    String? content,
    String? chat_id,
    bool? deleted,
    DateTime? created_at,
  }) {
    return ChatMessageModel(
      id: id ?? this.id,
      sender: sender ?? this.sender,
      receiver: receiver ?? this.receiver,
      is_text: is_text ?? this.is_text,
      content: content ?? this.content,
      chat_id: chat_id ?? this.chat_id,
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
      'chat_id': chat_id,
      'deleted': deleted,
      'created_at': created_at,
    };
  }

  factory ChatMessageModel.fromMap(Map<String, dynamic> map) {
    return ChatMessageModel(
      id: map['_id'] ?? "",
      sender: map['sender'] ?? "",
      receiver: map['receiver'] ?? "",
      is_text: map['is_text'] ?? false,
      content: map['content'] ?? "",
      chat_id: map['chat_id'] ?? "",
      deleted: map['deleted'] ?? false,
      created_at: DateTime.parse(map['created_at']),
    );
  }

  String toJson() => json.encode(toMap());

  factory ChatMessageModel.fromJson(String source) =>
      ChatMessageModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'MessageModel(id: $id, sender: $sender, receiver: $receiver, is_text: $is_text, content: $content, chat_id: $chat_id, deleted: $deleted, created_at: $created_at)';
  }

  @override
  bool operator ==(covariant ChatMessageModel other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.sender == sender &&
        other.receiver == receiver &&
        other.is_text == is_text &&
        other.content == content &&
        other.chat_id == chat_id &&
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
        chat_id.hashCode ^
        deleted.hashCode ^
        created_at.hashCode;
  }
}
