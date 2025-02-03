import { View, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useThemeColor } from "../hooks/useThemeColor";
import { Colors } from "../constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  edit?: boolean;
};

interface ColorTypeProps extends ThemedViewProps {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

export function ThemedSafe({
  style,
  lightColor,
  darkColor,
  colorType = "background",
  edit = false,
  ...otherProps
}: ColorTypeProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType
  );

  if (edit) {
    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
  }

  return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}
