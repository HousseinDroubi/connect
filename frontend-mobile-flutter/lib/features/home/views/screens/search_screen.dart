// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/classes/person.dart';
import 'package:connect/core/utils/app_responses.dart';
import 'package:connect/core/utils/dialog.dart';
import 'package:connect/core/widgets/title_widget.dart';
import 'package:connect/features/auth/views/widgets/text_field_widget.dart';
import 'package:connect/features/home/view_models/home_view_model.dart';
import 'package:connect/features/home/views/widgets/user_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:fpdart/fpdart.dart';

class SearchScreen extends ConsumerStatefulWidget {
  const SearchScreen({super.key});

  @override
  ConsumerState<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends ConsumerState<SearchScreen> {
  TextEditingController searchController = TextEditingController();

  List<Person> search_users = [];

  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }

  Future<void> searchForUsers() async {
    showPopup(popupCase: PopupLoading(context: context));
    final Either<AppFailure, List<Person>> result = await ref
        .read(homeViewModelProvider.notifier)
        .searchUsers(searchController.text);
    hidePopup(context);

    switch (result) {
      case Left(value: AppFailure(message: final message)):
        showPopup(
          popupCase: PopupAlert(context: context, popupContent: message),
        );
        break;
      case Right(value: List<Person> users):
        setState(() {
          search_users = users;
        });
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          children: [
            Container(
              alignment: Alignment.centerLeft,
              child: TitleWidget(title: "Search by pin or username"),
            ),
            SizedBox(height: 20),
            TextFieldWidget(
              isFull: true,
              title: "Search",
              hint: "Search by pin or username",
              nextFunction: searchForUsers,
              textEditingController: searchController,
            ),
            SizedBox(height: 20),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: search_users
                      .map(
                        (Person p) => Container(
                          margin: EdgeInsets.only(bottom: 15),
                          child: UserWidget(
                            image_source: p.profile_url,
                            username: p.username,
                            pin: p.pin.toString(),
                            is_for_search: true,
                          ),
                        ),
                      )
                      .toList(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
