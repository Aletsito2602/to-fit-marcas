import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'tienda_widget.dart' show TiendaWidget;
import 'package:flutter/material.dart';

class TiendaModel extends FlutterFlowModel<TiendaWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for TextField widget.
  FocusNode? textFieldFocusNode;
  TextEditingController? textController;
  String? Function(BuildContext, String?)? textControllerValidator;
  // State field(s) for TabBar widget.
  TabController? tabBarController;
  int get tabBarCurrentIndex =>
      tabBarController != null ? tabBarController!.index : 0;
  int get tabBarPreviousIndex =>
      tabBarController != null ? tabBarController!.previousIndex : 0;

  // Stores action output result for [Firestore Query - Query a collection] action in Image widget.
  MarcasRecord? marcaIDTienda;
  // Stores action output result for [Firestore Query - Query a collection] action in Image widget.
  MarcasRecord? marcaIDTiendal;
  // Stores action output result for [Firestore Query - Query a collection] action in Image widget.
  MarcasRecord? marcaIDTiendan;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    textFieldFocusNode?.dispose();
    textController?.dispose();

    tabBarController?.dispose();
  }
}
