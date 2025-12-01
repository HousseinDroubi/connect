import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/features/auth/models/user_model.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'home_view_model.g.dart';

@riverpod
class HomeViewModel extends _$HomeViewModel {
  late UserModel? _currentUserNotifier;
  @override
  AsyncValue? build() {
    _currentUserNotifier = ref.read(currentUserNotifierProvider);
    return null;
  }
}
