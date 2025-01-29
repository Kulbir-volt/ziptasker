import React from "react";
import { TextStyle } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { useThemeColor } from "../hooks/useThemeColor";
import { Colors } from "../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  style?: TextStyle;
  onPress?: () => void;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export interface ThemedIconProps extends ThemeProps {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  style?: TextStyle;
  size?: number;
}

export const ThemedFontAwesome5: React.FC<ThemedIconProps> = ({
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

  return (
    <FontAwesome5 name={name} size={size} color={iconColor} {...otherProps} />
  );
};
