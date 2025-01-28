import React from "react";
import {
  TouchableOpacityProps,
  Pressable,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import {
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "./width";
import { ThemedFontAwesome } from "./ThemedFontAwesome";
import { Colors } from "../constants/Colors";
import { ThemedMaterialIcons } from "./ThemedMaterialIcon";

type TaskCardProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  status?: string;
  title?: string;
};

const TaskCard: React.FC<TaskCardProps> = ({
  onPress,
  title,
  status = "Open",
  ...otherProps
}) => {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView
      {...otherProps}
      style={[
        {
          borderRadius: getWidthnHeight(2)?.width,
          padding: getWidthnHeight(3)?.width,
        },
        styles.shadow,
      ]}
    >
      <View style={{ flex: 1 }}>
        <View style={[{ flexDirection: "row" }, getMarginBottom(1)]}>
          <View style={{ borderWidth: 0, flex: 1 }}>
            <ThemedText style={{ fontWeight: "500" }}>{title}</ThemedText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ThemedMaterialIcons name={"computer"} colorType={"darkGray"} />
              <ThemedText
                style={[fontSizeH4(), getMarginLeft(2)]}
                colorType={"darkGray"}
              >
                Remote
              </ThemedText>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ThemedMaterialIcons
                name={"calendar-today"}
                colorType={"darkGray"}
              />
              <ThemedText
                style={[fontSizeH4(), getMarginLeft(2)]}
                colorType={"darkGray"}
              >
                Flexible
              </ThemedText>
            </View>
          </View>
          <View
            style={{
              borderWidth: 0,
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <ThemedText
              style={[
                {
                  paddingLeft: getWidthnHeight(5)?.width,
                  fontWeight: "500",
                  fontSize: fontSizeH4().fontSize + 4,
                },
              ]}
            >
              $700
            </ThemedText>
          </View>
        </View>
        <Pressable onPress={onPress}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderTopWidth: 1,
              borderTopColor: Colors[theme]["gradeOut"],
              paddingTop: getWidthnHeight(2)?.width,
            }}
          >
            <ThemedText
              colorType={"darkYellow"}
              style={[
                {
                  fontWeight: "500",
                  fontSize: fontSizeH4().fontSize + 4,
                },
              ]}
            >
              {status}
            </ThemedText>
            <ThemedFontAwesome
              name={"user-circle"}
              colorType={"darkYellow"}
              size={getWidthnHeight(7)?.width}
            />
          </View>
        </Pressable>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
});

export { TaskCard };
