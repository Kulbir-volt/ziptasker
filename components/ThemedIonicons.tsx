import React from "react";
import { TextStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useThemeColor } from "../hooks/useThemeColor";
import { Colors } from "../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  style?: TextStyle;
  onPress?: () => void;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

interface ThemedIconProps extends ThemeProps {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color?: string;
  style?: TextStyle;
  size?: number;
}

export const ThemedIonicons: React.FC<ThemedIconProps> = ({
  name,
  size,
  style,
  lightColor,
  darkColor,
  colorType = "defaultIconColor",
  ...otherProps
}) => {
  const iconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType
  );

  return <Ionicons name={name} size={size} color={iconColor} {...otherProps} />;
};
