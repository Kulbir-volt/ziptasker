import React from "react";
import {
  ButtonProps,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { fontSizeH4, getWidthnHeight } from "../width";
import { Colors } from "../../constants/Colors";

type FlatButtonProps = {
  title: string;
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  activeOpacity?: number;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

const FlatButton: React.FC<FlatButtonProps> = ({
  title,
  style,
  textStyle,
  activeOpacity = 0.7,
  lightColor,
  darkColor,
  colorType = "yellow",
  onPress,
}) => {
  return (
    <ThemedView colorType={colorType} style={[{ alignItems: "center" }, style]}>
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}
        style={{ borderWidth: 0, width: "100%", alignItems: "center" }}
      >
        <ThemedText
          style={[
            {
              fontWeight: "500",
              fontSize: fontSizeH4().fontSize + 5,
              paddingVertical: getWidthnHeight(3)?.width,
            },
            textStyle,
          ]}
        >
          {title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export { FlatButton };
