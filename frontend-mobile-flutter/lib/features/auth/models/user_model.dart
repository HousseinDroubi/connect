// ignore_for_file: public_member_api_docs, sort_constructors_first, non_constant_identifier_names
import 'dart:convert';

import 'package:flutter/foundation.dart';

import 'package:connect/core/classes/person.dart';
import 'package:connect/features/home/models/conversation_model.dart';

class UserModel extends Person {
  final String email;
  final String token;
  final bool is_online;
  final List<ConversationModel> conversations;

  UserModel({
    required super.id,
    required super.username,
    required super.profile_url,
    required super.pin,
    required this.email,
    required this.token,
    required this.is_online,
    required this.conversations,
  });

  @override
  UserModel copyWith({
    String? id,
    String? username,
    String? profile_url,
    int? pin,
    String? email,
    String? token,
    bool? is_online,
    List<ConversationModel>? conversations,
  }) {
    return UserModel(
      id: id ?? this.id,
      username: username ?? this.username,
      profile_url: profile_url ?? this.profile_url,
      pin: pin ?? this.pin,
      email: email ?? this.email,
      token: token ?? this.token,
      is_online: is_online ?? this.is_online,
      conversations: conversations ?? this.conversations,
    );
  }

  @override
  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      '_id': id,
      'username': username,
      'profile_url': profile_url,
      'pin': pin,
      'email': email,
      'token': token,
      'is_online': is_online,
      'conversations': conversations.map((x) => x.toMap()).toList(),
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      id: map['_id'] ?? "",
      username: map['username'] ?? "",
      profile_url: map['profile_url'] ?? "",
      pin: map['pin'] ?? -1,
      email: map['email'] as String,
      token: map['token'] as String,
      is_online: map['is_online'] as bool,
      conversations: List<ConversationModel>.from(
        (map['conversations'] as List<int>).map<ConversationModel>(
          (x) => ConversationModel.fromMap(x as Map<String, dynamic>),
        ),
      ),
    );
  }

  @override
  String toJson() => json.encode(toMap());

  factory UserModel.fromJson(String source) =>
      UserModel.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'UserModel(email: $email, token: $token, is_online: $is_online, conversations: $conversations)';
  }

  @override
  bool operator ==(covariant UserModel other) {
    if (identical(this, other)) return true;

    return other.email == email &&
        other.token == token &&
        other.is_online == is_online &&
        listEquals(other.conversations, conversations);
  }

  @override
  int get hashCode {
    return email.hashCode ^
        token.hashCode ^
        is_online.hashCode ^
        conversations.hashCode;
  }
}
