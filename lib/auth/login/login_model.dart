import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'login_widget.dart' show LoginWidget;
import 'package:flutter/material.dart';

class LoginModel extends FlutterFlowModel<LoginWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? emailTextController;
  String? Function(BuildContext, String?)? emailTextControllerValidator;
  // State field(s) for TextFieldPass widget.
  FocusNode? textFieldPassFocusNode;
  TextEditingController? textFieldPassTextController;
  late bool textFieldPassVisibility;
  String? Function(BuildContext, String?)? textFieldPassTextControllerValidator;

  @override
  void initState(BuildContext context) {
    textFieldPassVisibility = false;
  }

  @override
  void dispose() {
    textFieldFocusNode?.dispose();
    emailTextController?.dispose();

    textFieldPassFocusNode?.dispose();
    textFieldPassTextController?.dispose();
  }
}
