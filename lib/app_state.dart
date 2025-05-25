import 'package:flutter/material.dart';

class FFAppState extends ChangeNotifier {
  static FFAppState _instance = FFAppState._internal();

  factory FFAppState() {
    return _instance;
  }

  FFAppState._internal();

  static void reset() {
    _instance = FFAppState._internal();
  }

  Future initializePersistedState() async {}

  void update(VoidCallback callback) {
    callback();
    notifyListeners();
  }

  String _infoPosts = 'POST';
  String get infoPosts => _infoPosts;
  set infoPosts(String value) {
    _infoPosts = value;
  }

  String _nombreChange = '';
  String get nombreChange => _nombreChange;
  set nombreChange(String value) {
    _nombreChange = value;
  }
}
