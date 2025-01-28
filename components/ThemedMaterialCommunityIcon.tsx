import React from "react";
import { TextStyle } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeColor } from "../hooks/useThemeColor";
import { Colors } from "../constants/Colors";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  style?: TextStyle;
  onPress?: () => void;
};

export interface ThemedIconProps extends ThemeProps {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color?: string;
  style?: TextStyle;
  size?: number;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

export const ThemedMaterialCommunityIcons: React.FC<ThemedIconProps> = ({
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
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={iconColor}
      {...otherProps}
    />
  );
};
