import React, { forwardRef } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { Colors } from "../constants/Colors";

interface InputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  placeholderTextColor?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

const PrimaryInput = forwardRef<TextInput, InputProps>(
  (
    {
      containerStyle,
      colorType = "background",
      placeholderTextColor = "gradeOut",
      ...props
    },
    ref
  ) => {
    const theme = useColorScheme() ?? "light";
    return (
      <ThemedView colorType={colorType} style={containerStyle}>
        <TextInput
          ref={ref}
          placeholderTextColor={Colors[theme][placeholderTextColor]}
          {...props}
        />
      </ThemedView>
    );
  }
);

export { PrimaryInput };
