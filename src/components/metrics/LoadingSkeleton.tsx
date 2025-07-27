import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface LoadingSkeletonProps {
  type: 'card' | 'quickStat' | 'list';
  size?: 'small' | 'medium' | 'large';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type,
  size = 'medium',
  count = 1,
}) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = () => {
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => shimmer());
    };

    shimmer();
  }, [shimmerAnimation]);

  const shimmerOpacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const getCardWidth = () => {
    switch (size) {
      case 'small':
        return (screenWidth - 76) / 3;
      case 'medium':
        return (screenWidth - 56) / 2;
      case 'large':
        return screenWidth - 40;
      default:
        return (screenWidth - 56) / 2;
    }
  };

  const renderCardSkeleton = () => (
    <View style={[styles.card, { width: getCardWidth() }]}>
      <View style={styles.cardHeader}>
        <Animated.View style={[styles.iconSkeleton, { opacity: shimmerOpacity }]} />
      </View>
      <View style={styles.cardContent}>
        <Animated.View style={[styles.valueSkeleton, { opacity: shimmerOpacity }]} />
        <Animated.View style={[styles.titleSkeleton, { opacity: shimmerOpacity }]} />
        <Animated.View style={[styles.changeSkeleton, { opacity: shimmerOpacity }]} />
      </View>
      <Animated.View style={[styles.accentSkeleton, { opacity: shimmerOpacity }]} />
    </View>
  );

  const renderQuickStatSkeleton = () => (
    <View style={styles.quickStatCard}>
      <View style={styles.quickStatHeader}>
        <Animated.View style={[styles.quickStatIcon, { opacity: shimmerOpacity }]} />
        <Animated.View style={[styles.quickStatChange, { opacity: shimmerOpacity }]} />
      </View>
      <View style={styles.quickStatContent}>
        <Animated.View style={[styles.quickStatValue, { opacity: shimmerOpacity }]} />
        <Animated.View style={[styles.quickStatTitle, { opacity: shimmerOpacity }]} />
      </View>
      <Animated.View style={[styles.quickStatAccent, { opacity: shimmerOpacity }]} />
    </View>
  );

  const renderListSkeleton = () => (
    <View style={styles.listContainer}>
      <View style={styles.listHeader}>
        <Animated.View style={[styles.listTitleSkeleton, { opacity: shimmerOpacity }]} />
        <Animated.View style={[styles.listSeeMoreSkeleton, { opacity: shimmerOpacity }]} />
      </View>
      {Array.from({ length: 3 }).map((_, index) => (
        <View key={index} style={styles.listItem}>
          <Animated.View style={[styles.listImageSkeleton, { opacity: shimmerOpacity }]} />
          <View style={styles.listItemContent}>
            <Animated.View style={[styles.listItemTitle, { opacity: shimmerOpacity }]} />
            <Animated.View style={[styles.listItemSubtitle, { opacity: shimmerOpacity }]} />
          </View>
          <Animated.View style={[styles.listItemValue, { opacity: shimmerOpacity }]} />
        </View>
      ))}
    </View>
  );

  const renderSkeletons = () => {
    switch (type) {
      case 'card':
        return Array.from({ length: count }).map((_, index) => (
          <View key={index}>{renderCardSkeleton()}</View>
        ));
      case 'quickStat':
        return Array.from({ length: count }).map((_, index) => (
          <View key={index}>{renderQuickStatSkeleton()}</View>
        ));
      case 'list':
        return renderListSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return <>{renderSkeletons()}</>;
};

const styles = StyleSheet.create({
  // Card Skeleton
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    marginVertical: 6,
    minHeight: 130,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  cardHeader: {
    marginBottom: 14,
  },
  iconSkeleton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  valueSkeleton: {
    width: '70%',
    height: 24,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 8,
  },
  titleSkeleton: {
    width: '90%',
    height: 16,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 6,
  },
  changeSkeleton: {
    width: '40%',
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  accentSkeleton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  // Quick Stat Skeleton
  quickStatCard: {
    width: (screenWidth - 70) / 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 14,
    marginRight: 10,
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  quickStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickStatIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  quickStatChange: {
    width: 40,
    height: 14,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickStatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  quickStatValue: {
    width: '60%',
    height: 20,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 6,
  },
  quickStatTitle: {
    width: '80%',
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickStatAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  // List Skeleton
  listContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 22,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitleSkeleton: {
    width: 150,
    height: 18,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  listSeeMoreSkeleton: {
    width: 60,
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  listImageSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginRight: 14,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    width: '80%',
    height: 15,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 6,
  },
  listItemSubtitle: {
    width: '60%',
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  listItemValue: {
    width: 60,
    height: 17,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});

export default LoadingSkeleton;