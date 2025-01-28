import React, { useState } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
  View,
  Image,
} from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedIonicons } from "../ThemedIonicons";
import { getMarginBottom, getWidthnHeight } from "../width";
import { Colors } from "../../constants/Colors";

type AddImageButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

const AddImageButton: React.FC<AddImageButtonProps> = ({
  onPress,
  ...otherProps
}) => {
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView
      {...otherProps}
      colorType={"gradeOut"}
      style={[
        {
          width: getWidthnHeight(20)?.width,
          height: getWidthnHeight(20)?.width,
          elevation: 4,
          opacity: 0.7,
          shadowColor: Colors[theme]["iconColor"],
          shadowOpacity: 0.6,
          shadowRadius: 6,
          borderRadius: getWidthnHeight(2)?.width,
        },
        // getMarginBottom(1.5),
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThemedIonicons
          name={"add-circle-outline"}
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
        />
      </TouchableOpacity>
    </ThemedView>
  );
};

export { AddImageButton };
