import '/flutter_flow/flutter_flow_util.dart';
import 'home_copy_widget.dart' show HomeCopyWidget;
import 'package:flutter/material.dart';
import 'package:flutter_card_swiper/flutter_card_swiper.dart';

class HomeCopyModel extends FlutterFlowModel<HomeCopyWidget> {
  ///  State fields for stateful widgets in this page.

  // State field(s) for TabBar widget.
  TabController? tabBarController;
  int get tabBarCurrentIndex =>
      tabBarController != null ? tabBarController!.index : 0;
  int get tabBarPreviousIndex =>
      tabBarController != null ? tabBarController!.previousIndex : 0;

  // State field(s) for SwipeableStack widget.
  late CardSwiperController swipeableStackController1;
  // State field(s) for SwipeableStack widget.
  late CardSwiperController swipeableStackController2;

  @override
  void initState(BuildContext context) {
    swipeableStackController1 = CardSwiperController();
    swipeableStackController2 = CardSwiperController();
  }

  @override
  void dispose() {
    tabBarController?.dispose();
  }
}
