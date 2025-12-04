// ignore_for_file: public_member_api_docs, sort_constructors_first, non_constant_identifier_names
import 'dart:convert';

import 'package:flutter/foundation.dart';

import 'package:connect/core/classes/message.dart';
import 'package:connect/core/classes/person.dart';

class ConversationModel {
  final String conversation_id;
  final List<Message> messages;
  final bool is_group;
  final Person recipirent;

  ConversationModel({
    required this.conversation_id,
    required this.messages,
    required this.is_group,
    required this.recipirent,
  });

  ConversationModel copyWith({
    String? conversation_id,
    List<Message>? messages,
    bool? is_group,
    Person? recipirent,
  }) {
    return ConversationModel(
      conversation_id: conversation_id ?? this.conversation_id,
      messages: messages ?? this.messages,
      is_group: is_group ?? this.is_group,
      recipirent: recipirent ?? this.recipirent,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'conversation_id': conversation_id,
      'messages': messages.map((x) => x.toMap()).toList(),
      'is_group': is_group,
      'recipirent': recipirent.toMap(),
    };
  }

  factory ConversationModel.fromMap(Map<String, dynamic> map) {
    return ConversationModel(
      conversation_id: map['conversation_id'] ?? "",
      messages: List<Message>.from(
        (map['messages'] as List<int>).map<Message>(
          (x) => Message.fromMap(x as Map<String, dynamic>),
        ),
      ),
      is_group: map['is_group'] ?? false,
      recipirent: Person.fromMap(map['recipirent'] as Map<String, dynamic>),
    );
  }

  String toJson() => json.encode(toMap());

  factory ConversationModel.fromJson(String source) =>
      ConversationModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'ConversationModel(conversation_id: $conversation_id, messages: $messages, is_group: $is_group, recipirent: $recipirent)';
  }

  @override
  bool operator ==(covariant ConversationModel other) {
    if (identical(this, other)) return true;

    return other.conversation_id == conversation_id &&
        listEquals(other.messages, messages) &&
        other.is_group == is_group &&
        other.recipirent == recipirent;
  }

  @override
  int get hashCode {
    return conversation_id.hashCode ^
        messages.hashCode ^
        is_group.hashCode ^
        recipirent.hashCode;
  }
}
