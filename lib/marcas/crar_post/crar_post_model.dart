import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'crar_post_widget.dart' show CrarPostWidget;
import 'package:flutter/material.dart';

class CrarPostModel extends FlutterFlowModel<CrarPostWidget> {
  ///  State fields for stateful widgets in this page.

  bool isDataUploading1 = false;
  FFUploadedFile uploadedLocalFile1 =
      FFUploadedFile(bytes: Uint8List.fromList([]));
  String uploadedFileUrl1 = '';

  bool isDataUploading2 = false;
  List<FFUploadedFile> uploadedLocalFiles2 = [];
  List<String> uploadedFileUrls2 = [];

  // Stores action output result for [Backend Call - Create Document] action in Button widget.
  PostsRecord? postUup;
  // Stores action output result for [Backend Call - Create Document] action in Button widget.
  ColeccionInternaRecord? postsInfo;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {}
}
