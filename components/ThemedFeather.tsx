import React from "react";
import { TextStyle } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { useThemeColor } from "../hooks/useThemeColor";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  style?: TextStyle;
  onPress?: () => void;
};

export interface ThemedIconProps extends ThemeProps {
  name: React.ComponentProps<typeof Feather>["name"];
  color?: string;
  style?: TextStyle;
  size?: number;
}

export const ThemedFeather: React.FC<ThemedIconProps> = ({
  name,
  size,
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const iconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "defaultIconColor"
  );

  return <Feather name={name} size={size} color={iconColor} {...otherProps} />;
};
