import { useColorScheme, View, type ViewProps, StyleSheet } from "react-native";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";

import { Colors } from "../constants/Colors";

export type ThemedGradientProps = LinearGradientProps & {
  lightColor?: [string, string, ...string[]];
  darkColor?: [string, string, ...string[]];
};

export function ThemedGradientView({
  style,
  colors,
  ...otherProps
}: // ...otherProps
ThemedGradientProps) {
  // return <View style={[{ backgroundColor }, style]} {...otherProps} />;
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={colors}
      style={[style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
});
