// ignore_for_file: non_constant_identifier_names

import 'package:flutter/material.dart';

class UserImageWidget extends StatelessWidget {
  final String image_source;
  const UserImageWidget({super.key, required this.image_source});

  @override
  Widget build(BuildContext context) {
    return ClipOval(
      child: Container(
        width: 25,
        height: 25,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: NetworkImage(image_source),
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
