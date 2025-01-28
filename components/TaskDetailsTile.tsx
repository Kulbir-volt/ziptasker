import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ThemedEntypo } from "./ThemedEntypo";
import { fontSizeH4, getMarginLeft, getWidthnHeight } from "./width";
import { Colors } from "../constants/Colors";

type TaskDetailsTileProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

const TaskDetailsTile: React.FC<TaskDetailsTileProps> = ({
  leftIcon,
  rightIcon = (
    <ThemedEntypo
      name="chevron-small-right"
      size={getWidthnHeight(6)?.width}
      lightColor={Colors.light.iconColor}
      darkColor={Colors.dark.white}
    />
  ),
  title,
  style,
  onPress,
}) => {
  return (
    <ThemedView style={[styles.container, styles.container, style]}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.5}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            padding: getWidthnHeight(4)?.width,
          },
        ]}
      >
        {leftIcon}
        <View style={{ flex: 1 }}>
          <ThemedText
            numberOfLines={1}
            style={[{ fontSize: fontSizeH4().fontSize + 4 }, getMarginLeft(2)]}
          >
            {title}
          </ThemedText>
        </View>
        {rightIcon}
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 4,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    borderRadius: getWidthnHeight(3)?.width,
  },
});

export { TaskDetailsTile };
