import 'dart:io';

import 'package:connect/core/constants/app_colors.dart';
import 'package:connect/core/utils/app_files.dart';
import 'package:connect/core/constants/app_icons.dart';
import 'package:flutter/material.dart';

class ProfileWidget extends StatefulWidget {
  final String? imageSource;
  final void Function(File imageFile) onChange;
  const ProfileWidget({super.key, required this.onChange, this.imageSource});

  @override
  State<ProfileWidget> createState() => _ProfileWidgetState();
}

class _ProfileWidgetState extends State<ProfileWidget> {
  File? imageFile;

  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        Container(
          width: 100,
          height: 100,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(50),
            border: Border.all(color: AppColors.blue),
          ),
        ),
        imageFile != null
            ? ClipRRect(
                borderRadius: BorderRadiusGeometry.circular(50),
                child: Image.file(
                  imageFile!,
                  width: 100,
                  height: 100,
                  fit: BoxFit.cover,
                ),
              )
            : widget.imageSource != null
            ? ClipRRect(
                borderRadius: BorderRadiusGeometry.circular(50),
                child: Image.network(
                  widget.imageSource!,
                  width: 100,
                  height: 100,
                  fit: BoxFit.cover,
                ),
              )
            : Image.asset(AppIcons.imageDefaultPath, width: 48, height: 48),
        Positioned(
          bottom: 8,
          right: 0,
          child: InkWell(
            onTap: () async {
              imageFile = await AppFiles.pickUpImageFromGallery();
              if (imageFile != null) {
                widget.onChange(imageFile!);
              }
            },
            child: Image.asset(AppIcons.addIconPath, width: 22, height: 22),
          ),
        ),
      ],
    );
  }
}
