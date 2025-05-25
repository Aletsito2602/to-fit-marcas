import '/flutter_flow/flutter_flow_util.dart';
import 'historias_widget.dart' show HistoriasWidget;
import 'package:flutter/material.dart';

class HistoriasModel extends FlutterFlowModel<HistoriasWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for PageView widget.
  PageController? pageViewController;

  int get pageViewCurrentIndex => pageViewController != null &&
          pageViewController!.hasClients &&
          pageViewController!.page != null
      ? pageViewController!.page!.round()
      : 0;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {}
}
