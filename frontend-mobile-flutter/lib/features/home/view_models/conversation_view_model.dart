import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/features/auth/repositories/auth_local_repository.dart';
import 'package:connect/features/home/models/conversation_model.dart';
import 'package:connect/features/home/repositories/conversation_repository.dart';
import 'package:fpdart/fpdart.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'conversation_view_model.g.dart';

@riverpod
class ConversationViewModel extends _$ConversationViewModel {
  late AuthLocalRepository _authLocalRepository;
  late ConversationRepository _conversationRepository;

  @override
  void build() {
    _authLocalRepository = ref.read(authLocalRepositoryProvider);
    _conversationRepository = ref.read(conversationRepositoryProvider);
  }

  Future<Either<AppFailure, ConversationModel>> getConversationMessages(
    String pin,
  ) async {
    String token = _authLocalRepository.getToken()!;
    Either<AppFailure, ConversationModel> result = await _conversationRepository
        .getConversationMessages(token: token, pin: pin);

    return result;
  }
}
