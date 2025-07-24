import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface BackgroundPatternProps {
  opacity?: number;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ opacity = 0.05 }) => {
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const scale = new Animated.Value(1);

  useEffect(() => {
    // Animación de movimiento lento y sutil usando Animated de React Native
    const startAnimations = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateX, {
            toValue: 20,
            duration: 8000,
            useNativeDriver: true,
          }),
          Animated.timing(translateX, {
            toValue: 0,
            duration: 8000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: 15,
            duration: 12000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 12000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.02,
            duration: 10000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimations();
  }, []);

  // Crear múltiples capas del patrón para mayor riqueza visual
  const renderPatternLayer = (translateOffset: number, scaleOffset: number) => {
    return (
      <Animated.View 
        style={[
          styles.patternLayer,
          {
            transform: [
              { translateX: Animated.add(translateX, translateOffset) },
              { translateY: Animated.add(translateY, translateOffset) },
              { scale: Animated.add(scale, scaleOffset) },
            ],
          },
        ]}
      >
        <Svg width={width * 1.5} height={height * 1.5} viewBox="0 0 390 844">
          {/* Algunos paths seleccionados del SVG original para crear el patrón */}
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M46.4897 675.925C36.2536 667.302 43.2571 662.63 47.348 657.768C48.3417 656.586 48.3575 656.268 49.4726 654.858C51.8751 657.174 53.9522 660.3 56.499 661.981L46.4897 675.926V675.925ZM79.1855 669.278C85.7212 670.133 84.8981 667.787 87.9584 663.498C90.7144 666.652 98.5234 669.543 103.608 672.386C97.6915 685.264 88.5106 694.264 75.4921 684.126L72.9594 680.789C70.0451 674.607 70.272 675.385 72.8574 670.73C75.4499 666.062 80.0561 661.096 83.6194 659.206C84.9438 666.113 79.7571 659.743 79.1838 669.278H79.1855Z"
            fill="#FFFFFF"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M125.434 181.42C126.219 183.149 126.249 182.456 126.17 183.321C125.711 188.251 122.663 185.629 120.86 184.273L125.434 181.42ZM125.434 181.42L132.777 174.776C139.929 170.224 155.096 159.15 162.636 160.918C162.747 168.048 160.689 165.405 157.042 163.981C157.48 173.515 151.081 167.302 151.076 167.298C151.299 169.439 151.762 169.639 150.673 170.742L130.19 182.289C130.034 182.524 129.842 183.079 129.606 183.439C128.169 182.735 127.505 182.536 125.434 181.421V181.42Z"
            fill="#FFFFFF"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M46.4898 253.847C35.311 247.049 45.3114 238.212 49.23 232.434C52.9903 235.323 54.7456 237.292 56.3302 241.947L46.4898 253.847ZM84.6748 236.157C83.4542 244.722 79.9402 238.93 79.4389 247.07C85.6474 248.057 84.7241 245.454 87.656 241.298C91.8489 244.195 97.8323 247.797 104.083 249.731C89.9266 285.319 51.337 256.158 84.6748 236.156V236.157Z"
            fill="#FFFFFF"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M125.459 603.46L125.822 607.055C125.779 607.215 125.468 607.607 125.301 607.888L120.593 606.857L125.461 603.46H125.459ZM125.459 603.46L132.82 596.82C139.874 592.367 154.82 581.089 162.614 582.945C162.695 586.171 164.184 585.145 161.156 586.768C155.644 589.724 161.984 583.28 157.362 587.659C154.177 590.676 160.646 588.228 154.657 590.254C149.794 591.9 154.56 587.932 151.268 591.432C148.258 594.632 151.171 591.571 145.844 594.701L140.85 597.546C139.06 598.692 142.59 599.193 135.989 598.106C137.424 604.99 133.775 601.313 133.453 601.441C130.009 602.807 129.898 604.551 127.616 605.62C126.247 602.48 128.351 605.348 125.459 603.459V603.46Z"
            fill="#FFFFFF"
          />
        </Svg>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.overlay, { opacity }]}>
        {/* Múltiples capas con diferentes animaciones para crear profundidad */}
        {renderPatternLayer(0, 0)}
        {renderPatternLayer(10, -0.01)}
        {renderPatternLayer(-5, 0.005)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  overlay: {
    flex: 1,
    backgroundColor: '#000000',
  },
  patternLayer: {
    position: 'absolute',
    top: -50,
    left: -50,
    right: -50,
    bottom: -50,
  },
});

export default BackgroundPattern;