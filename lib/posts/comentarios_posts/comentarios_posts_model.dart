import '/flutter_flow/flutter_flow_util.dart';
import 'comentarios_posts_widget.dart' show ComentariosPostsWidget;
import 'package:flutter/material.dart';

class ComentariosPostsModel extends FlutterFlowModel<ComentariosPostsWidget> {
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
