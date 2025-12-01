import 'package:connect/core/classes/person.dart';
import 'package:connect/core/widgets/title_widget.dart';
import 'package:connect/features/auth/views/widgets/text_field_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SearchScreen extends ConsumerStatefulWidget {
  const SearchScreen({super.key});

  @override
  ConsumerState<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends ConsumerState<SearchScreen> {
  TextEditingController searchController = TextEditingController();

  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }

  Future<List<Person>> searchForUsers() async {
    throw UnimplementedError();
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
          ],
        ),
      ),
    );
  }
}
