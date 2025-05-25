import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/index.dart';
import 'registro_widget.dart' show RegistroWidget;
import 'package:flutter/material.dart';

class RegistroModel extends FlutterFlowModel<RegistroWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode1;
  TextEditingController? emailTextController;
  String? Function(BuildContext, String?)? emailTextControllerValidator;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode2;
  TextEditingController? textController1;
  String? Function(BuildContext, String?)? textController1Validator;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode3;
  TextEditingController? textController2;
  String? Function(BuildContext, String?)? textController2Validator;
  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode4;
  TextEditingController? textController3;
  String? Function(BuildContext, String?)? textController3Validator;
  // Stores action output result for [Firestore Query - Query a collection] action in TextField widget.
  List<UsersRecord>? po;
  // State field(s) for TextFieldPass widget.
  FocusNode? textFieldPassFocusNode;
  TextEditingController? textFieldPassTextController;
  late bool textFieldPassVisibility;
  String? Function(BuildContext, String?)? textFieldPassTextControllerValidator;
  // State field(s) for TextFieldPass2 widget.
  FocusNode? textFieldPass2FocusNode;
  TextEditingController? textFieldPass2TextController;
  late bool textFieldPass2Visibility;
  String? Function(BuildContext, String?)?
      textFieldPass2TextControllerValidator;

  @override
  void initState(BuildContext context) {
    textFieldPassVisibility = false;
    textFieldPass2Visibility = false;
  }

  @override
  void dispose() {
    textFieldFocusNode1?.dispose();
    emailTextController?.dispose();

    textFieldFocusNode2?.dispose();
    textController1?.dispose();

    textFieldFocusNode3?.dispose();
    textController2?.dispose();

    textFieldFocusNode4?.dispose();
    textController3?.dispose();

    textFieldPassFocusNode?.dispose();
    textFieldPassTextController?.dispose();

    textFieldPass2FocusNode?.dispose();
    textFieldPass2TextController?.dispose();
  }
}
