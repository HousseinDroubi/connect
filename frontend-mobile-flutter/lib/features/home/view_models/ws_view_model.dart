// ignore_for_file: non_constant_identifier_names

import 'dart:convert';

import 'package:connect/core/classes/person.dart';
import 'package:connect/core/providers/current_conversation.dart';
import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/features/auth/repositories/auth_local_repository.dart';
import 'package:connect/features/home/models/conversation_model.dart';
import 'package:connect/features/home/models/ws/receive/ws_receive_delete_message_model.dart';
import 'package:connect/features/home/models/ws/receive/ws_receive_edit_message_model.dart';
import 'package:connect/features/home/models/ws/receive/ws_receive_new_messsage_model.dart';
import 'package:connect/features/home/models/ws/receive/ws_receive_toggle_status_model.dart';
import 'package:connect/features/home/models/ws/send/ws_delete_message_model.dart';
import 'package:connect/features/home/models/ws/send/ws_edit_message_model.dart';
import 'package:connect/features/home/models/ws/send/ws_send_message_model.dart';
import 'package:connect/features/home/repositories/ws_repository.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part "ws_view_model.g.dart";

@Riverpod(keepAlive: true)
class WsViewModel extends _$WsViewModel {
  late CurrentUserNotifier _currentUserNotifier;
  late CurrentConversation _currentConversation;
  late WsRepository _wsRepository;

  @override
  void build() {
    _wsRepository = ref.read(wsRepositoryProvider);
    _currentUserNotifier = ref.read(currentUserNotifierProvider.notifier);
    _currentConversation = ref.read(currentConversationProvider.notifier);
    _wsRepository.wsConnect(
      token: ref.read(authLocalRepositoryProvider).getToken()!,
    );
    wsListenToMessages();
  }

  void wsListenToMessages() {
    _wsRepository.stream.listen((data) {
      try {
        final event_map = jsonDecode(data);
        final event_name = event_map["event_name"];
        switch (event_name) {
          case "toggle_user_status":
            final WsReceiveToggleStatusModel event =
                WsReceiveToggleStatusModel.fromMap(event_map);
            _currentUserNotifier.toggleUserStatusInChat(event);
            _currentConversation.toggleUserStatus(event.is_online);
            break;
          case "edit_message":
            final WsReceiveEditMessageModel event =
                WsReceiveEditMessageModel.fromMap(event_map);
            _currentUserNotifier.updateLastMessageInChat(event);
            _currentConversation.updateMessage(event);
            break;
          case "delete_message":
            final WsReceiveDeleteMessageModel event =
                WsReceiveDeleteMessageModel.fromMap(event_map);
            _currentUserNotifier.deleteLastMessageInChat(event);
            _currentConversation.deleteMessageForAll(event);
            break;
          case "new_message":
            final WsReceiveNewMesssageModel event =
                WsReceiveNewMesssageModel.fromMap(event_map);
            _currentUserNotifier.addNewMessageInChat(event);
            _currentUserNotifier.addNewChat(
              ConversationModel(
                conversation_id: event.message.conversation_id,
                messages: [event.message],
                is_group: false,
                recipient:
                    ref.read(currentUserNotifierProvider)!.id ==
                        event.message.sender.id
                    ? event.message.receiver
                    : event.message.sender,
              ),
            );
            _currentConversation.addNewMessageInConversation(event);
            break;
        }
      } catch (e) {}
    });
  }

  void deleteMessage({required WsDeleteMessageModel wsDeleteMessageModel}) {
    _wsRepository.sendMessage(wsDeleteMessageModel.toJson());
  }

  void editMessage({required WsEditMessageModel wsEditMessageModel}) {
    _wsRepository.sendMessage(wsEditMessageModel.toJson());
  }

  void sendMessage({required WsSendNewMessageModel wsSendNewMessageModel}) {
    _wsRepository.sendMessage(wsSendNewMessageModel.toJson());
  }
}
