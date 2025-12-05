// ignore_for_file: non_constant_identifier_names, constant_identifier_names

import 'dart:typed_data';

import 'package:connect/core/providers/current_conversation.dart';
import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/features/auth/repositories/auth_local_repository.dart';
import 'package:connect/features/home/models/conversation_model.dart';
import 'package:connect/features/home/repositories/conversation_repository.dart';
import 'package:connect/features/home/repositories/messages_repository.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'conversation_view_model.g.dart';

@riverpod
class ConversationViewModel extends _$ConversationViewModel {
  late AuthLocalRepository _authLocalRepository;
  late MessagesRepository _messagesRepository;
  late ConversationRepository _conversationRepository;
  late CurrentConversation _currentConversationNotifier;
  late CurrentUserNotifier _currentUserNotifier;

  @override
  void build() {
    _authLocalRepository = ref.read(authLocalRepositoryProvider);
    _conversationRepository = ref.read(conversationRepositoryProvider);
    _messagesRepository = ref.read(messagesRepositoryProvider);
    _currentConversationNotifier = ref.read(
      currentConversationProvider.notifier,
    );
    _currentUserNotifier = ref.read(currentUserNotifierProvider.notifier);
  }

  Future<Either<AppFailure, ConversationModel>> getConversationMessages(
    String pin,
  ) async {
    String token = _authLocalRepository.getToken()!;
    Either<AppFailure, ConversationModel> result = await _conversationRepository
        .getConversationMessages(token: token, pin: pin);

    switch (result) {
      case Left(value: AppFailure(message: final message)):
        return Left(AppFailure(message: message));
      case Right(value: final conversation):
        _currentConversationNotifier.addConversation(conversation);
        return Right(conversation);
    }
  }

  Future<Uint8List?> viewImage(String message_id) async {
    return await _messagesRepository.viewImage(
      token: _authLocalRepository.getToken()!,
      message_id: message_id,
    );
  }

  Future<Either<AppFailure, AppSuccess>> deleteChat(String pin) async {
    final result = await _conversationRepository.deleteConversation(
      token: _authLocalRepository.getToken()!,
      pin: pin,
    );

    switch (result) {
      case Left(value: AppFailure(message: final message)):
        return Left(AppFailure(message: message));
      case Right(value: final conversation_id):
        _currentUserNotifier.deleteChat(conversation_id);
        return Right(AppSuccess());
    }
  }

  Future<Either<AppFailure, AppSuccess>> deleteMessage(
    String message_id,
  ) async {
    final Either<AppFailure, AppSuccess> result = await _messagesRepository
        .deleteMessageForSender(
          token: _authLocalRepository.getToken()!,
          message_id: message_id,
        );
    switch (result) {
      case Left(value: AppFailure(message: final message)):
        return Left(AppFailure(message: message));
      case Right(value: AppSuccess()):
        _currentConversationNotifier.deleteMessage(message_id);
        return Right(AppSuccess());
    }
  }
}
