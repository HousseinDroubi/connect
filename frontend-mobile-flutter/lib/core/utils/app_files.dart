import 'dart:io';
import 'package:image_picker/image_picker.dart';

class AppFiles {
  static Future<File?> pickUpImageFromGallery() async {
    final ImagePicker picker = ImagePicker();
    final XFile? pickedFile = await picker.pickImage(
      source: ImageSource.gallery,
    );

    if (pickedFile != null) {
      return File(pickedFile.path);
    }

    return null;
  }
}
