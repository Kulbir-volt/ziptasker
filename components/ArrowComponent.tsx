import React, { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { PostComponent } from "./PostComponent";
import { getWidthnHeight } from "./width";
import { ThemedMaterialIcons } from "./ThemedMaterialIcon";

type ArrowComponentProps = TouchableOpacityProps & {
  title: string;
  subtitle?: string;
  time?: string | null;
  style?: StyleProp<ViewStyle>;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  icon: ReactNode;
};

const ArrowComponent: React.FC<ArrowComponentProps> = ({
  title,
  subtitle,
  time = null,
  style,
  titleStyle,
  subtitleStyle,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0,
      }}
    >
      <View
        style={[
          {
            flex: 1,
            paddingVertical: getWidthnHeight(5)?.width,
            borderWidth: 0,
          },
          style,
        ]}
      >
        <PostComponent
          icon={icon}
          title={title}
          titleStyle={titleStyle}
          subtitle={subtitle}
          subtitleStyle={subtitleStyle}
          time={time}
        />
      </View>
      <ThemedMaterialIcons
        name={"keyboard-arrow-right"}
        colorType={"darkGray"}
        size={getWidthnHeight(5)?.width}
      />
    </TouchableOpacity>
  );
};

export { ArrowComponent };
