import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import {
  Picker,
  PickerProps,
  PickerItemProps,
} from "@react-native-picker/picker";

import { ThemedView } from "./ThemedView";
import { Colors } from "../constants/Colors";

interface ThemedPickerProps extends PickerProps {
  lightColor?: string;
  darkColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  items: Array<
    { label: string; value: string | number } & Partial<PickerItemProps>
  >;
  placeholder?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

const ThemedPicker: React.FC<ThemedPickerProps> = ({
  colorType = "background",
  lightColor,
  darkColor,
  containerStyle,
  placeholder,
  selectedValue,
  onValueChange,
  items,
  itemStyle,
  ...pickerProps
}) => {
  return (
    <ThemedView
      colorType={colorType}
      style={containerStyle}
      lightColor={lightColor}
      darkColor={darkColor}
    >
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        {...pickerProps}
      >
        <Picker.Item enabled={false} label={placeholder} />
        {items.map((item, index) => {
          return (
            <Picker.Item
              key={index}
              label={item.label}
              value={item.value}
              style={itemStyle}
            />
          );
        })}
      </Picker>
    </ThemedView>
  );
};

export { ThemedPicker };
