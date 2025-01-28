import React from "react";
import {
  ButtonProps,
  TextStyle,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedMaterialIcons } from "./ThemedMaterialIcon";
import { Colors } from "../constants/Colors";
import { useThemeColor } from "../hooks/useThemeColor";
import { getWidthnHeight } from "./width";

type RoundedDropdownProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: TextStyle;
  onPress?: () => void;
  iconSize?: number | null;
};

const RoundedDropdown: React.FC<RoundedDropdownProps> = ({
  title,
  style,
  lightColor,
  darkColor,
  iconSize = getWidthnHeight(6)?.width,
  onPress,
  titleStyle,
  ...otherProps
}) => {
  const color = useThemeColor(
    {
      light: lightColor,
      dark: darkColor,
    },
    "iconColor"
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        style,
      ]}
    >
      <ThemedText style={[{ borderWidth: 0, borderColor: "red" }, titleStyle]}>
        {title}
      </ThemedText>
      {iconSize && (
        <ThemedMaterialIcons
          size={iconSize}
          name="arrow-drop-down"
          color={color}
        />
      )}
    </TouchableOpacity>
  );
};

export { RoundedDropdown };
