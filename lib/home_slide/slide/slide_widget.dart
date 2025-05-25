import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart'
    as smooth_page_indicator;
import 'package:flutter/material.dart';
import 'slide_model.dart';
export 'slide_model.dart';

class SlideWidget extends StatefulWidget {
  const SlideWidget({
    super.key,
    this.posts,
  });

  final DocumentReference? posts;

  @override
  State<SlideWidget> createState() => _SlideWidgetState();
}

class _SlideWidgetState extends State<SlideWidget> {
  late SlideModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => SlideModel());

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<PostsRecord>(
      stream: PostsRecord.getDocument(widget.posts!),
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

        final containerPostsRecord = snapshot.data!;

        return InkWell(
          splashColor: Colors.transparent,
          focusColor: Colors.transparent,
          hoverColor: Colors.transparent,
          highlightColor: Colors.transparent,
          onTap: () async {
            await _model.pageViewController?.nextPage(
              duration: Duration(milliseconds: 300),
              curve: Curves.ease,
            );
          },
          child: Container(
            width: double.infinity,
            height: double.infinity,
            decoration: BoxDecoration(
              color: FlutterFlowTheme.of(context).secondaryBackground,
              borderRadius: BorderRadius.circular(15.0),
            ),
            child: StreamBuilder<List<ColeccionInternaRecord>>(
              stream: queryColeccionInternaRecord(
                parent: containerPostsRecord.reference,
              ),
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
                List<ColeccionInternaRecord>
                    pageViewColeccionInternaRecordList = snapshot.data!;

                return Container(
                  width: double.infinity,
                  height: double.infinity,
                  child: Stack(
                    children: [
                      PageView.builder(
                        controller: _model.pageViewController ??=
                            PageController(
                                initialPage: max(
                                    0,
                                    min(
                                        0,
                                        pageViewColeccionInternaRecordList
                                                .length -
                                            1))),
                        onPageChanged: (_) => safeSetState(() {}),
                        scrollDirection: Axis.horizontal,
                        itemCount: pageViewColeccionInternaRecordList.length,
                        itemBuilder: (context, pageViewIndex) {
                          final pageViewColeccionInternaRecord =
                              pageViewColeccionInternaRecordList[pageViewIndex];
                          return ClipRRect(
                            borderRadius: BorderRadius.circular(8.0),
                            child: Image.network(
                              pageViewColeccionInternaRecord.portada,
                              width: 200.0,
                              height: 200.0,
                              fit: BoxFit.cover,
                            ),
                          );
                        },
                      ),
                      Align(
                        alignment: AlignmentDirectional(0.0, 1.0),
                        child: Padding(
                          padding: EdgeInsetsDirectional.fromSTEB(
                              0.0, 0.0, 0.0, 100.0),
                          child: smooth_page_indicator.SmoothPageIndicator(
                            controller: _model.pageViewController ??=
                                PageController(
                                    initialPage: max(
                                        0,
                                        min(
                                            0,
                                            pageViewColeccionInternaRecordList
                                                    .length -
                                                1))),
                            count: pageViewColeccionInternaRecordList.length,
                            axisDirection: Axis.horizontal,
                            onDotClicked: (i) async {
                              await _model.pageViewController!.animateToPage(
                                i,
                                duration: Duration(milliseconds: 500),
                                curve: Curves.ease,
                              );
                              safeSetState(() {});
                            },
                            effect: smooth_page_indicator.SlideEffect(
                              spacing: 8.0,
                              radius: 15.0,
                              dotWidth: 25.0,
                              dotHeight: 1.0,
                              dotColor: Color(0xFF574F4F),
                              activeDotColor:
                                  FlutterFlowTheme.of(context).primaryText,
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
      },
    );
  }
}
