import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'dart:async';
import 'package:smooth_page_indicator/smooth_page_indicator.dart'
    as smooth_page_indicator;
import 'package:flutter/material.dart';
import 'historias_model.dart';
export 'historias_model.dart';

class HistoriasWidget extends StatefulWidget {
  const HistoriasWidget({
    super.key,
    required this.historias,
  });

  final DocumentReference? historias;

  @override
  State<HistoriasWidget> createState() => _HistoriasWidgetState();
}

class _HistoriasWidgetState extends State<HistoriasWidget> {
  late HistoriasModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => HistoriasModel());

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: AlignmentDirectional(0.0, 1.0),
      child: Container(
        width: double.infinity,
        height: MediaQuery.sizeOf(context).height * 0.95,
        decoration: BoxDecoration(
          color: FlutterFlowTheme.of(context).primaryBackground,
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(0.0),
            bottomRight: Radius.circular(0.0),
            topLeft: Radius.circular(20.0),
            topRight: Radius.circular(20.0),
          ),
        ),
        child: StreamBuilder<List<HistoriasRecord>>(
          stream: queryHistoriasRecord(),
          builder: (context, snapshot) {
            // Customize what your widget looks like when it's loading.
            if (!snapshot.hasData) {
              return Center(
                child: SizedBox(
                  width: 50.0,
                  height: 50.0,
                  child: CircularProgressIndicator(
                    valueColor: AlwaysStoppedAnimation<Color>(
                      FlutterFlowTheme.of(context).primary,
                    ),
                  ),
                ),
              );
            }
            List<HistoriasRecord> pageViewHistoriasRecordList = snapshot.data!;

            return Container(
              width: double.infinity,
              height: double.infinity,
              child: Stack(
                children: [
                  PageView.builder(
                    controller: _model.pageViewController ??= PageController(
                        initialPage: max(
                            0, min(0, pageViewHistoriasRecordList.length - 1))),
                    onPageChanged: (_) => safeSetState(() {}),
                    scrollDirection: Axis.horizontal,
                    itemCount: pageViewHistoriasRecordList.length,
                    itemBuilder: (context, pageViewIndex) {
                      final pageViewHistoriasRecord =
                          pageViewHistoriasRecordList[pageViewIndex];
                      return InkWell(
                        splashColor: Colors.transparent,
                        focusColor: Colors.transparent,
                        hoverColor: Colors.transparent,
                        highlightColor: Colors.transparent,
                        onTap: () async {
                          unawaited(
                            () async {
                              await _model.pageViewController?.nextPage(
                                duration: Duration(milliseconds: 300),
                                curve: Curves.ease,
                              );
                            }(),
                          );
                        },
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(8.0),
                          child: Image.network(
                            valueOrDefault<String>(
                              pageViewHistoriasRecord.foto,
                              'https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/to-fit-fzcmqe/assets/rrj3kkmzyatj/blusa_f58d9376_241005153326_1280x1920.webp',
                            ),
                            width: double.infinity,
                            height: double.infinity,
                            fit: BoxFit.cover,
                          ),
                        ),
                      );
                    },
                  ),
                  Align(
                    alignment: AlignmentDirectional(0.0, -1.0),
                    child: Padding(
                      padding:
                          EdgeInsetsDirectional.fromSTEB(15.0, 16.0, 0.0, 0.0),
                      child: smooth_page_indicator.SmoothPageIndicator(
                        controller: _model.pageViewController ??=
                            PageController(
                                initialPage: max(
                                    0,
                                    min(
                                        0,
                                        pageViewHistoriasRecordList.length -
                                            1))),
                        count: pageViewHistoriasRecordList.length,
                        axisDirection: Axis.horizontal,
                        onDotClicked: (i) async {
                          await _model.pageViewController!.animateToPage(
                            i,
                            duration: Duration(milliseconds: 500),
                            curve: Curves.ease,
                          );
                          safeSetState(() {});
                        },
                        effect: smooth_page_indicator.ExpandingDotsEffect(
                          expansionFactor: 5.0,
                          spacing: 5.0,
                          radius: 8.0,
                          dotWidth: 30.0,
                          dotHeight: 2.0,
                          dotColor: Color(0x4DFFFFFF),
                          activeDotColor: Colors.white,
                          paintStyle: PaintingStyle.fill,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
