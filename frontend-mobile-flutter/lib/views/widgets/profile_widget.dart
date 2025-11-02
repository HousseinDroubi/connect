import 'package:connect/constants/my_colors.dart';
import 'package:connect/view_models/widgets/profile_widget_view_model.dart';
import 'package:flutter/material.dart';

class ProfileWidget extends StatefulWidget {
  final ProfileWidgetViewModel viewModel;

  const ProfileWidget({super.key, required this.viewModel});

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
        widget.viewModel.imageFile != null
            ? ClipRRect(
                borderRadius: BorderRadiusGeometry.circular(50),
                child: Image.file(
                  widget.viewModel.imageFile!,
                  width: 100,
                  height: 100,
                  fit: BoxFit.cover,
                ),
              )
            : widget.viewModel.imageSource != null
            ? ClipRRect(
                borderRadius: BorderRadiusGeometry.circular(50),
                child: Image.network(
                  widget.viewModel.imageSource!,
                  width: 100,
                  height: 100,
                  fit: BoxFit.cover,
                ),
              )
            : Image.asset(
                ProfileWidgetViewModel.imageDefaultPath,
                width: 48,
                height: 48,
              ),
        Positioned(
          bottom: 8,
          right: 0,
          child: InkWell(
            onTap: () async {
              await widget.viewModel.pickUpImage();
              setState(() {});
            },
            child: Image.asset(
              ProfileWidgetViewModel.addIconPath,
              width: 22,
              height: 22,
            ),
          ),
        ),
      ],
    );
  }
}
