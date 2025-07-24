import 'package:connect/constants/my_colors.dart';
import 'package:connect/views/widgets/profile/profile_widget_config.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class ProfileWidget extends StatefulWidget {
  final ProfileWidgetConfig config;

  const ProfileWidget({super.key, required this.config});

  @override
  State<ProfileWidget> createState() => _ProfileWidgetState();
}

class _ProfileWidgetState extends State<ProfileWidget> {
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
            border: Border.all(color: MyColors.blue.value),
          ),
        ),
        widget.config.imageFile != null
            ? ClipRRect(
                borderRadius: BorderRadiusGeometry.circular(50),
                child: Image.file(
                  widget.config.imageFile!,
                  width: 100,
                  height: 100,
                  fit: BoxFit.cover,
                ),
              )
            : widget.config.imageSource != null
            ? ClipRRect(
                borderRadius: BorderRadiusGeometry.circular(50),
                child: Image.network(
                  widget.config.imageSource!,
                  width: 100,
                  height: 100,
                  fit: BoxFit.cover,
                ),
              )
            : Image.asset(
                ProfileWidgetConfig.imageDefaultPath,
                width: 48,
                height: 48,
              ),
        Positioned(
          bottom: 8,
          right: 0,
          child: InkWell(
            onTap: () {
              widget.config.pickUpImage();
            },
            child: Image.asset(
              ProfileWidgetConfig.addIconPath,
              width: 22,
              height: 22,
            ),
          ),
        ),
      ],
    );
  }
}
