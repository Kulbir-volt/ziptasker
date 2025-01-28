import React, { ReactNode } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";

import { ThemedView } from "./ThemedView";
import { ThemedIonicons } from "./ThemedIonicons";
import { fontSizeH4, getWidthnHeight } from "./width";
import { Colors } from "../constants/Colors";
import { ThemedText } from "./ThemedText";

type DummyTextInputProps = {
  lightColor?: string;
  darkColor?: string;
  icon?: ReactNode;
  style?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  value: string | undefined;
  placeholder: string;
  placeholderTextColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  onPress: () => void;
};

const DummyTextInput: React.FC<DummyTextInputProps> = ({
  icon,
  style,
  lightColor,
  darkColor,
  value,
  placeholder,
  placeholderTextColor = "darkGray",
  containerStyle,
  onPress,
}) => {
  const theme = useColorScheme() ?? "light";
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <ThemedView
        colorType={"screenBG"}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "space-between",
            paddingHorizontal: getWidthnHeight(3)?.width,
            paddingVertical: getWidthnHeight(4)?.width,
            borderRadius: getWidthnHeight(3)?.width,
            elevation: 4,
            shadowColor: Colors[theme]["iconColor"],
            shadowOpacity: 0.6,
            shadowRadius: 6,
          },
          containerStyle,
        ]}
      >
        {icon && <View style={{ borderWidth: 0 }}>{icon}</View>}
        {value ? (
          <ThemedText
            numberOfLines={1}
            style={{
              fontSize: fontSizeH4().fontSize + 4,
              paddingHorizontal: getWidthnHeight(2)?.width,
            }}
            colorType={"black"}
          >
            {value}
          </ThemedText>
        ) : (
          <ThemedText
            style={{
              fontSize: fontSizeH4().fontSize + 4,
              paddingLeft: getWidthnHeight(2)?.width,
            }}
            colorType={placeholderTextColor}
          >
            {placeholder}
          </ThemedText>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

export { DummyTextInput };
