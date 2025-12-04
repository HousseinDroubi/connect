import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/widgets/text_field_widget.dart';
import 'package:connect/features/home/views/widgets/user_widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ConversationScreen extends ConsumerStatefulWidget {
  final String? pin;
  const ConversationScreen({super.key, this.pin});

  @override
  ConsumerState<ConversationScreen> createState() => _ConversationScreenState();
}

class _ConversationScreenState extends ConsumerState<ConversationScreen> {
  TextEditingController messageController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            children: [
              UserWidget(is_for_chats: true, username: "123"),
              Divider(thickness: 0.4, color: AppColors.grey),
              Expanded(
                child: ListView.builder(
                  itemCount: 10,
                  itemBuilder: (BuildContext context, int index) {
                    return Text("Hi $index");
                  },
                ),
              ),
              TextFieldWidget(
                hint: "Type here",
                isForMessages: true,
                isFull: true,
                nextFunction: () {},
                textEditingController: messageController,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Column(
//             children: [
//               Column(
//                 children: [
//                   UserWidget(username: "Username"),
//                   Divider(thickness: 0.4),
//                 ],
//               ),
//               TextFieldWidget(
//                 title: "sad",
//                 isForMessages: true,
//                 isFull: true,
//                 hint: "Type here",
//                 nextFunction: () {},
//                 textEditingController: messageController,
//               ),
//             ],
//           ),
