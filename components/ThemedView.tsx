import {
  View,
  type ViewProps,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";
import { Colors } from "../constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
  animate?: boolean;
};

interface ColorTypeProps extends ThemedViewProps {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorType = "background",
  animate,
  ...otherProps
}: ColorTypeProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType
  );

  if (!animate) {
    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
  }

  return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />;
}
