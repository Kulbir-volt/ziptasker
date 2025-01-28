import React from "react";
import { ThemedView } from "./ThemedView";
import { ButtonProps, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import { ThemedText } from "./ThemedText";
import { ThemedMaterialIcons } from "./ThemedMaterialIcon";
import { fontSizeH3, fontSizeH4, getMarginTop, getWidthnHeight } from "./width";
import { ThemedMaterialCommunityIcons } from "./ThemedMaterialCommunityIcon";

type DropdownFieldProps = ButtonProps & {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  selectionText: string | undefined;
};

const DropdownField: React.FC<DropdownFieldProps> = ({
  colorType = "screenBG",
  title,
  selectionText,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <ThemedText
        style={[
          {
            fontSize: fontSizeH4().fontSize + 5,
            fontWeight: "500",
          },
        ]}
      >
        {title}
      </ThemedText>
      <ThemedView
        colorType={colorType}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: getWidthnHeight(2)?.width,
            padding: getWidthnHeight(3.5)?.width,
          },
          getMarginTop(1.5),
        ]}
      >
        <ThemedText style={{ fontSize: fontSizeH4().fontSize + 4 }}>
          {selectionText}
        </ThemedText>
        <ThemedMaterialCommunityIcons
          name={"menu-down"}
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
        />
      </ThemedView>
    </TouchableOpacity>
  );
};

export { DropdownField };
