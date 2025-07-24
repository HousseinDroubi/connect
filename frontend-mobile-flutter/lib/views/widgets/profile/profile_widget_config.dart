import 'dart:io';

class ProfileWidgetConfig {
  static const String imageDefaultSource = "assets/icons/profile_default.png";
  File? _imageFile;
  String? _imageSource;

  ProfileWidgetConfig({File? imageFile, String? imageSource})
    : _imageFile = imageFile,
      _imageSource = imageSource;

  File? get imageFile => _imageFile;
  String? get imageSource => _imageSource;

  set imageFile(File? imageFile) {
    _imageFile = imageFile;
  }

  set imageSource(String? imageSource) {
    _imageSource = imageSource;
  }
}
