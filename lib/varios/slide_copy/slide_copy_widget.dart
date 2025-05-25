import '/backend/backend.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'slide_copy_model.dart';
export 'slide_copy_model.dart';

class SlideCopyWidget extends StatefulWidget {
  const SlideCopyWidget({
    super.key,
    this.posts,
  });

  final DocumentReference? posts;

  @override
  State<SlideCopyWidget> createState() => _SlideCopyWidgetState();
}

class _SlideCopyWidgetState extends State<SlideCopyWidget> {
  late SlideCopyModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => SlideCopyModel());

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

        return Container(
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
              List<ColeccionInternaRecord> carouselColeccionInternaRecordList =
                  snapshot.data!;

              return Container(
                width: double.infinity,
                height: 200.0,
                child: CarouselSlider.builder(
                  itemCount: carouselColeccionInternaRecordList.length,
                  itemBuilder: (context, carouselIndex, _) {
                    final carouselColeccionInternaRecord =
                        carouselColeccionInternaRecordList[carouselIndex];
                    return ClipRRect(
                      borderRadius: BorderRadius.circular(8.0),
                      child: Image.network(
                        carouselColeccionInternaRecord.portada,
                        width: 200.0,
                        height: 200.0,
                        fit: BoxFit.cover,
                      ),
                    );
                  },
                  carouselController: _model.carouselController ??=
                      CarouselSliderController(),
                  options: CarouselOptions(
                    initialPage: max(0,
                        min(0, carouselColeccionInternaRecordList.length - 1)),
                    viewportFraction: 1.0,
                    disableCenter: true,
                    enlargeCenterPage: true,
                    enlargeFactor: 0.25,
                    enableInfiniteScroll: true,
                    scrollDirection: Axis.horizontal,
                    autoPlay: true,
                    autoPlayAnimationDuration: Duration(milliseconds: 800),
                    autoPlayInterval: Duration(milliseconds: (800 + 4000)),
                    autoPlayCurve: Curves.linear,
                    pauseAutoPlayInFiniteScroll: true,
                    onPageChanged: (index, _) =>
                        _model.carouselCurrentIndex = index,
                  ),
                ),
              );
            },
          ),
        );
      },
    );
  }
}
