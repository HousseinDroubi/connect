import 'package:flutter/material.dart';

enum MyColors {
  blue(Color(0xFF0C7FF2)),
  black(Color(0xFF0D141C)),
  iceBlue(Color(0xFFE7EDF4)),
  dustyBlue(Color(0xFF49739C)),
  white(Color(0xFFF8FAFC)),
  body(Color(0xFFf5f5f5)),
  grey(Color(0xFF9E9E9E)),
  red(Color(0xFFF44336));

  final Color value;

  const MyColors(this.value);
}
