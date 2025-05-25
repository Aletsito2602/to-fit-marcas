import '/flutter_flow/flutter_flow_util.dart';
import 'pin_code_widget.dart' show PinCodeWidget;
import 'package:flutter/material.dart';

class PinCodeModel extends FlutterFlowModel<PinCodeWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for PinCode widget.
  TextEditingController? pinCodeController;
  FocusNode? pinCodeFocusNode;
  String? Function(BuildContext, String?)? pinCodeControllerValidator;

  @override
  void initState(BuildContext context) {
    pinCodeController = TextEditingController();
  }

  @override
  void dispose() {
    pinCodeFocusNode?.dispose();
    pinCodeController?.dispose();
  }
}
