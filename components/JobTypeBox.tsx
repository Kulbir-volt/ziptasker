import React from "react";
import {
  ButtonProps,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { fontSizeH4, getMarginBottom, getWidthnHeight } from "./width";
import { ThemedEvilIcons } from "./ThemedEvilicons";
import { ThemedIonicons } from "./ThemedIonicons";
import { Colors } from "../constants/Colors";

type JobTypeBoxProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  subtitle?: string;
  style?: TextStyle;
  textColor?: string | null;
};

const JobTypeBox: React.FC<JobTypeBoxProps> = ({
  lightColor,
  darkColor,
  title,
  subtitle,
  textColor,
  onPress,
  ...otherProps
}) => {
  const theme = useColorScheme() ?? "light";
  let icon = (
    <ThemedEvilIcons
      lightColor={Colors[theme]["iconColor"]}
      darkColor={Colors[theme]["iconColor"]}
      size={getWidthnHeight(10)?.width}
      name="location"
    />
  );
  if (title.toLowerCase() === "online") {
    icon = (
      <ThemedIonicons
        lightColor={Colors[theme]["iconColor"]}
        darkColor={Colors[theme]["iconColor"]}
        size={getWidthnHeight(8)?.width}
        name="phone-portrait-sharp"
      />
    );
  }
  return (
    <ThemedView {...otherProps} lightColor={lightColor} darkColor={darkColor}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          paddingVertical: getWidthnHeight(5)?.width,
          borderWidth: 0,
          alignItems: "center",
        }}
      >
        <View style={[getMarginBottom(1)]}>{icon}</View>
        <ThemedText
          style={[
            {
              fontSize: fontSizeH4().fontSize + 5,
              fontWeight: "500",
              textAlign: "center",
            },
            textColor && { color: textColor },
          ]}
        >
          {title}
        </ThemedText>
        <ThemedText
          numberOfLines={3}
          style={[
            {
              textAlign: "center",
              // lineHeight: -1,
              paddingHorizontal: getWidthnHeight(3)?.width,
            },
            textColor && { color: textColor },
            fontSizeH4(),
          ]}
        >
          {subtitle}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export { JobTypeBox };
