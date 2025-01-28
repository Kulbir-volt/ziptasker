import React from "react";
import { View, TextInput, useColorScheme } from "react-native";
import { ThemedView } from "./ThemedView";
import { Colors } from "../constants/Colors";
import { getMarginTop, getWidthnHeight } from "./width";

function PhoneInput({ inputProps = {}, containerStyle = {} }) {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView
      style={[
        {
          borderWidth: 1,
          borderColor: Colors[theme]["buttonBorder"],
          backgroundColor: Colors[theme]["background"],
          borderRadius: getWidthnHeight(10)?.width,
          paddingHorizontal: getWidthnHeight(3)?.width,
          paddingVertical: getWidthnHeight(1)?.width,
        },
        containerStyle,
      ]}
    >
      <TextInput {...inputProps} />
    </ThemedView>
  );
}

export { PhoneInput };
