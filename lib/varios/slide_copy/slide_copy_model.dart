import '/flutter_flow/flutter_flow_util.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'slide_copy_widget.dart' show SlideCopyWidget;
import 'package:flutter/material.dart';

class SlideCopyModel extends FlutterFlowModel<SlideCopyWidget> {
  ///  State fields for stateful widgets in this component.

  // State field(s) for Carousel widget.
  CarouselSliderController? carouselController;
  int carouselCurrentIndex = 0;

  @override
  void initState(BuildContext context) {}

  @override
  void dispose() {}
}
