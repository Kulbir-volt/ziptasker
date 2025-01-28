import React, { ReactNode } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedFontAwesome } from "./ThemedFontAwesome";
import { fontSizeH4, getWidthnHeight } from "./width";
import { View, ViewStyle, TextStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedMaterialIcons } from "./ThemedMaterialIcon";

type PostComponentProps = {
  lightColor?: string;
  darkColor?: string;
  icon: ReactNode;
  style?: ViewStyle;
  title?: string;
  subtitle?: string;
  time?: string | null;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  showDropdownIcon?: boolean;
};

const PostComponent: React.FC<PostComponentProps> = ({
  lightColor,
  darkColor,
  style,
  icon = (
    <ThemedFontAwesome
      name={"user-circle"}
      colorType={"lightYellow"}
      size={getWidthnHeight(5)?.width}
    />
  ),
  title = "POSTED BY",
  subtitle,
  time = "about 1 hour ago",
  titleStyle,
  subtitleStyle,
  showDropdownIcon = false,
  ...otherProps
}) => {
  return (
    <ThemedView
      lightColor={lightColor}
      darkColor={darkColor}
      style={style}
      {...otherProps}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {icon}
        <View
          style={{
            borderWidth: 0,
            flex: 1,
            paddingHorizontal: getWidthnHeight(3)?.width,
          }}
        >
          <ThemedText
            style={[{ fontSize: fontSizeH4().fontSize - 2 }, titleStyle]}
          >
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText
              style={[{ fontSize: fontSizeH4().fontSize + 4 }, subtitleStyle]}
            >
              {subtitle}
            </ThemedText>
          )}
        </View>
        {showDropdownIcon && (
          <ThemedMaterialIcons
            name={"keyboard-arrow-right"}
            colorType={"darkGray"}
            size={getWidthnHeight(5)?.width}
          />
        )}
        {/* <ThemedText
          colorType={"darkGray"}
          style={{ fontSize: fontSizeH4().fontSize - 1 }}
        >
          {time}
        </ThemedText> */}
      </View>
    </ThemedView>
  );
};

export { PostComponent };
