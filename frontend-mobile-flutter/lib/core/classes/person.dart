// ignore_for_file: public_member_api_docs, sort_constructors_first, unnecessary_brace_in_string_interps
import 'dart:convert';

// ignore_for_file: non_constant_identifier_names

class Person {
  final String id;
  final String username;
  final int pin;
  final String profile_url;
  final bool? is_online;

  const Person({
    required this.id,
    required this.username,
    required this.pin,
    required this.profile_url,
    this.is_online,
  });

  Person copyWith({
    String? id,
    String? username,
    int? pin,
    String? profile_url,
    bool? is_online,
  }) {
    return Person(
      id: id ?? this.id,
      username: username ?? this.username,
      pin: pin ?? this.pin,
      profile_url: profile_url ?? this.profile_url,
      is_online: is_online ?? this.is_online,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'id': id,
      'username': username,
      'pin': pin,
      'profile_url': profile_url,
      'is_online': is_online,
    };
  }

  factory Person.fromMap(Map<String, dynamic> map) {
    return Person(
      id: map['_id'] ?? "",
      username: map['username'] ?? "",
      pin: map['pin'] ?? 0,
      profile_url: map['profile_url'] ?? "",
      is_online: map['is_online'],
    );
  }

  String toJson() => json.encode(toMap());

  factory Person.fromJson(String source) =>
      Person.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() {
    return 'Person(id: $id, username: $username, pin: $pin, profile_url: $profile_url, is_online: ${is_online})';
  }

  @override
  bool operator ==(covariant Person other) {
    if (identical(this, other)) return true;

    return other.id == id &&
        other.username == username &&
        other.pin == pin &&
        other.profile_url == profile_url &&
        other.is_online == is_online;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        username.hashCode ^
        pin.hashCode ^
        profile_url.hashCode ^
        is_online.hashCode;
  }
}
