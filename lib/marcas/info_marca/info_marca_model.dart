import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'info_marca_widget.dart' show InfoMarcaWidget;
import 'package:flutter/material.dart';

class InfoMarcaModel extends FlutterFlowModel<InfoMarcaWidget> {
  ///  State fields for stateful widgets in this component.

  // Stores action output result for [Firestore Query - Query a collection] action in Button widget.
  TiendasRecord? tiendai;
  // State field(s) for TabBar widget.
  TabController? tabBarController;
  int get tabBarCurrentIndex =>
      tabBarController != null ? tabBarController!.index : 0;
  int get tabBarPreviousIndex =>
      tabBarController != null ? tabBarController!.previousIndex : 0;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {
    tabBarController?.dispose();
  }
}
