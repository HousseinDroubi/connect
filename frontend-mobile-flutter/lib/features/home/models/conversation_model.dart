// ignore_for_file: public_member_api_docs, sort_constructors_first, non_constant_identifier_names
import 'dart:convert';

import 'package:connect/core/classes/person.dart';
import 'package:connect/features/home/models/message_model.dart';

class ConversationModel {
  final String id;
  final MessageModel last_message;
  final DateTime created_at;
  final Person recipient;
  ConversationModel({
    required this.id,
    required this.last_message,
    required this.created_at,
    required this.recipient,
  });

  ConversationModel copyWith({
    String? id,
    MessageModel? last_message,
    DateTime? created_at,
    Person? recipient,
  }) {
    return ConversationModel(
      id: id ?? this.id,
      last_message: last_message ?? this.last_message,
      created_at: created_at ?? this.created_at,
      recipient: recipient ?? this.recipient,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      '_id': id,
      'last_message': last_message.toMap(),
      'created_at': created_at,
      'recipient': recipient.toMap(),
    };
  }

  factory ConversationModel.fromMap(Map<String, dynamic> map) {
    return ConversationModel(
      id: map['_id'] ?? "",
      last_message: MessageModel.fromMap(
        map['last_message'] as Map<String, dynamic>,
      ),
      created_at: DateTime.parse(map['created_at']),
      recipient: Person.fromMap(map['recipient'] as Map<String, dynamic>),
    );
  }

  String toJson() => json.encode(toMap());

  factory ConversationModel.fromJson(String source) =>
      ConversationModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'ConversationModel(id: $id, last_message: $last_message, created_at: $created_at, recipient: $recipient)';
  }

  @override
  bool operator ==(covariant ConversationModel other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.last_message == last_message &&
        other.created_at == created_at &&
        other.recipient == recipient;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        last_message.hashCode ^
        created_at.hashCode ^
        recipient.hashCode;
  }
}
