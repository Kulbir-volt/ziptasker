import React, { ReactNode, forwardRef } from "react";
import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";

import { ThemedView } from "./ThemedView";
import { ThemedIonicons } from "./ThemedIonicons";
import { getWidthnHeight } from "./width";
import { Colors } from "../constants/Colors";
import { ThemedAntDesign } from "./ThemedAntDesign";

type IconTextInputProps = TextInputProps & {
  showClearIcon?: boolean;
  lightColor?: string;
  darkColor?: string;
  icon?: ReactNode;
  style?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
  onClear?: () => void;
};

const IconTextInput = forwardRef<TextInput, IconTextInputProps>(
  (
    {
      showClearIcon = true,
      icon,
      style,
      lightColor,
      darkColor,
      placeholderTextColor = "darkGray",
      containerStyle,
      value,
      onClear,
      ...otherProps
    },
    ref
  ) => {
    const theme = useColorScheme() ?? "light";
    return (
      <ThemedView
        colorType={"screenBG"}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: getWidthnHeight(3)?.width,
            paddingVertical: getWidthnHeight(2)?.width,
            borderRadius: getWidthnHeight(3)?.width,
            elevation: 4,
            shadowColor:
              Platform.OS === "ios"
                ? `${Colors[theme]["iconColor"]}8F`
                : Colors[theme]["iconColor"],
            shadowOpacity: 0.6,
            shadowRadius: 6,
            shadowOffset: {
              width: 0,
              height: getWidthnHeight(0.3)?.width!,
            },
          },
          containerStyle,
        ]}
      >
        {icon && <View style={{ borderWidth: 0 }}>{icon}</View>}
        <TextInput
          ref={ref}
          value={value}
          placeholderTextColor={placeholderTextColor}
          style={style}
          {...otherProps}
        />
        {showClearIcon && value && (
          <View style={{ borderWidth: 0 }}>
            <ThemedAntDesign
              name={"closecircle"}
              colorType={"darkGray"}
              size={getWidthnHeight(6)?.width}
              onPress={onClear}
            />
          </View>
        )}
      </ThemedView>
    );
  }
);

export { IconTextInput };
