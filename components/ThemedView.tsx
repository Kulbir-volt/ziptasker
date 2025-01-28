import { View, type ViewProps } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";
import { Colors } from "../constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

interface ColorTypeProps extends ThemedViewProps {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

export function ThemedView({
  style,
  lightColor,
  darkColor,
  colorType = "background",
  ...otherProps
}: ColorTypeProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
