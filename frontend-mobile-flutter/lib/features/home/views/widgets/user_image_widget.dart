// ignore_for_file: non_constant_identifier_names

import 'package:connect/core/constants/app_icons.dart';
import 'package:flutter/material.dart';

class UserImageWidget extends StatelessWidget {
  final String? image_source;
  final bool is_small;
  const UserImageWidget({super.key, this.image_source, this.is_small = true});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: is_small ? 25 : 70,
      height: is_small ? 25 : 70,
      decoration: BoxDecoration(
        image: DecorationImage(
          image: image_source == null
              ? AssetImage(AppIcons.groupIconPath)
              : NetworkImage(image_source!),

          fit: image_source == null ? BoxFit.contain : BoxFit.cover,
        ),
        shape: BoxShape.circle,
      ),
    );
  }
}
