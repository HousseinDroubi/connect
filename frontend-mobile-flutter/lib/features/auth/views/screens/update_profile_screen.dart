import 'dart:io';

import 'package:connect/core/providers/current_user_notifier.dart';
import 'package:connect/core/utils/app_nav.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/core/utils/utils.dart';
import 'package:connect/core/utils/widgets.dart';
import 'package:connect/features/auth/view_models/auth_view_model.dart';
import 'package:connect/features/auth/views/widgets/button_widget.dart';
import 'package:connect/features/auth/views/widgets/image_picker_widget.dart';
import 'package:connect/core/widgets/text_field_widget.dart';
import 'package:connect/core/widgets/title_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';

class UpdateProfileScreen extends ConsumerStatefulWidget {
  const UpdateProfileScreen({super.key});

  @override
  ConsumerState<UpdateProfileScreen> createState() =>
      _UpdateProfileScreenState();
}

class _UpdateProfileScreenState extends ConsumerState<UpdateProfileScreen> {
  // image file
  File? imageFile;

  // Controller
  TextEditingController usernameController = TextEditingController();
  TextEditingController currentPasswordController = TextEditingController();
  TextEditingController newPasswordController = TextEditingController();
  TextEditingController newPasswordConfirmationController =
      TextEditingController();

  // Nodes
  final FocusNode newPasswordFocusNode = FocusNode();
  final FocusNode newPasswordConfirmationFocusNode = FocusNode();

  Future<void> updateProfile() async {
    showPopup(popupCase: PopupLoading(context: context));
    final notifier = ref.read(authViewModelProvider.notifier);
    final Either<AppFailure, AppSuccess> result = await notifier
        .updateProfileData(
          username: usernameController.text,
          imageFile: imageFile,
        );

    hidePopup(context);

    final String content;

    switch (result) {
      case Left(value: AppFailure(message: final message)):
        content = message;
        break;
      case Right(value: AppSuccess(message: final message)):
        content = message;
        imageFile = null;
    }

    showPopup(
      popupCase: PopupAlert(context: context, popupContent: content),
    );
    setState(() {});
  }

  Future<void> updatePassword() async {
    showPopup(popupCase: PopupLoading(context: context));
    final notifier = ref.read(authViewModelProvider.notifier);
    final Either<AppFailure, AppSuccess> result = await notifier.updatePassword(
      old_password: currentPasswordController.text,
      new_password: newPasswordController.text,
      new_password_confirmation: newPasswordConfirmationController.text,
    );

    hidePopup(context);

    final String content;

    switch (result) {
      case Left(value: AppFailure(message: final message)):
        content = message;
        break;
      case Right(value: AppSuccess(message: final message)):
        content = message;
        clearTextEditingControllers([
          currentPasswordController,
          newPasswordController,
          newPasswordConfirmationController,
        ]);
        break;
    }
    showPopup(
      popupCase: PopupAlert(context: context, popupContent: content),
    );
  }

  Future<void> deleteAccount() async {
    showPopup(popupCase: PopupLoading(context: context));
    final notifier = ref.read(authViewModelProvider.notifier);
    final Either<AppFailure, AppSuccess> result = await notifier
        .deleteAccount();

    hidePopup(context);

    switch (result) {
      case Left(value: AppFailure(message: final message)):
        showPopup(
          popupCase: PopupAlert(context: context, popupContent: message),
        );
        break;
      case Right(value: AppSuccess()):
        AppNav.pushAndRemoveUntil(context, "login");
        break;
    }
  }

  Future<void> logout() async {
    final notifier = ref.read(authViewModelProvider.notifier);
    await notifier.logout();
    hidePopup(context);
    AppNav.pushAndRemoveUntil(context, "login");
  }

  @override
  void initState() {
    usernameController.text = ref.read(
      currentUserNotifierProvider.select((user) => user!.username),
    );
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(currentUserNotifierProvider);
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(18),
              child: Column(
                children: [
                  Container(
                    alignment: Alignment.topLeft,
                    child: TitleWidget(title: "Edit Profile"),
                  ),
                  SizedBox(height: 10),
                  ImagePickerWidget(
                    imageNetworkSource: user?.profile_url,
                    isImageFileExisted: imageFile != null,
                    onChange: (File newImageFile) {
                      setState(() {
                        imageFile = newImageFile;
                      });
                    },
                  ),
                  SizedBox(height: 10),
                  TextFieldWidget(
                    title: "Name",
                    hint: "Enter your name",
                    nextFunction: updateProfile,
                    textEditingController: usernameController,
                  ),
                  SizedBox(height: 20),
                  ButtonWidget(
                    buttonText: "Save changes",
                    buttonFn: updateProfile,
                  ),
                  SizedBox(height: 30),
                  Container(
                    alignment: Alignment.centerLeft,
                    child: TitleWidget(title: "Update Password"),
                  ),
                  SizedBox(height: 20),
                  TextFieldWidget(
                    title: "Current Password",
                    hint: "Enter your current password",
                    nextFunction: () {
                      focusOn(context, newPasswordFocusNode);
                    },
                    textEditingController: currentPasswordController,
                    isPassword: true,
                  ),
                  SizedBox(height: 25),
                  TextFieldWidget(
                    title: "New Password",
                    hint: "Enter a new password",
                    nextFunction: () {
                      focusOn(context, newPasswordConfirmationFocusNode);
                    },
                    textEditingController: newPasswordController,
                    isPassword: true,
                  ),
                  SizedBox(height: 25),
                  TextFieldWidget(
                    title: "New Password Confirmation",
                    hint: "Re-enter a new password",
                    nextFunction: updateProfile,
                    textEditingController: newPasswordConfirmationController,
                    isPassword: true,
                  ),
                  SizedBox(height: 25),
                  ButtonWidget(
                    buttonText: "Update Password",
                    buttonFn: updatePassword,
                  ),
                  SizedBox(height: 20),
                  ButtonWidget(
                    buttonText: "Delete my account",
                    buttonFn: () async {
                      showPopup(
                        popupCase: PopupConfirmation(
                          context: context,
                          popupContent:
                              "Are you sure you want to delete your account?",
                          confirmationFunction: deleteAccount,
                        ),
                      );
                    },
                    isColoredRed: true,
                  ),
                  SizedBox(height: 20),
                  ButtonWidget(
                    isColoredRed: true,
                    buttonText: "Logout",
                    buttonFn: () {
                      showPopup(
                        popupCase: PopupConfirmation(
                          context: context,
                          popupContent: "Are you sure you want to logout?",
                          confirmationFunction: () async {
                            await logout();
                          },
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
