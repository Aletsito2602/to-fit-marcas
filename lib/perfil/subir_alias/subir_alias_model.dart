import '/flutter_flow/flutter_flow_util.dart';
import 'subir_alias_widget.dart' show SubirAliasWidget;
import 'package:flutter/material.dart';

class SubirAliasModel extends FlutterFlowModel<SubirAliasWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? textController;
  String? Function(BuildContext, String?)? textControllerValidator;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    textFieldFocusNode?.dispose();
    textController?.dispose();
  }
}
