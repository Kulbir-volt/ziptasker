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
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "./width";
import { ThemedFontAwesome } from "./ThemedFontAwesome";
import { Colors } from "../constants/Colors";
import { ThemedMaterialIcons } from "./ThemedMaterialIcon";
import { SaveDetailsProps } from "../screens/AuthStack/CreateTask/CreateTask";
import moment from "moment";
import { ThemedFeather } from "./ThemedFeather";
import { ThemedFontAwesome5 } from "./ThemedFontAwesome5";
import { ThemedMaterialCommunityIcons } from "./ThemedMaterialCommunityIcon";

type TaskCardProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  status?: string;
  title?: string;
  task: SaveDetailsProps;
};

const TaskCard: React.FC<TaskCardProps> = ({
  onPress,
  task,
  ...otherProps
}) => {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView
      // colorType={"blackShade"}
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
        <View style={[getMarginBottom(1)]}>
          <View style={[{ flexDirection: "row", borderWidth: 0 }]}>
            <View style={{ borderWidth: 0, flex: 1 }}>
              <ThemedText
                colorType={"buttonBorder"}
                numberOfLines={1}
                style={{
                  fontWeight: "500",
                  fontSize: fontSizeH4().fontSize + 5,
                }}
              >
                {task.title}
              </ThemedText>
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  getMarginTop(0.5),
                ]}
              >
                <ThemedMaterialIcons
                  size={getWidthnHeight(4)?.width}
                  name={"computer"}
                  colorType={"buttonBorder"}
                />
                <ThemedText
                  numberOfLines={1}
                  style={[
                    { fontSize: fontSizeH4().fontSize + 2 },
                    getMarginLeft(2),
                  ]}
                  colorType={"buttonBorder"}
                >
                  {task.online_job ? "Remote" : task.location?.description}
                </ThemedText>
              </View>
            </View>
            <View
              style={{
                borderWidth: 0,
                alignItems: "center",
              }}
            >
              <ThemedText
                colorType={"black"}
                style={[
                  {
                    fontWeight: "600",
                    fontSize: fontSizeH4().fontSize + 6,
                    backgroundColor: Colors[theme]["yellow"],
                    paddingHorizontal: getWidthnHeight(3)?.width,
                    borderRadius: getWidthnHeight(5)?.width,
                  },
                ]}
              >
                ${task.budget}
              </ThemedText>
            </View>
          </View>
          <ThemedView
            colorType={"lightBlack"}
            style={[
              {
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: getWidthnHeight(1)?.width,
                paddingHorizontal: getWidthnHeight(3)?.width,
                paddingVertical: getWidthnHeight(1.5)?.width,
                borderRadius: getWidthnHeight(2)?.width,
              },
              getMarginTop(1),
            ]}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ThemedFontAwesome5
                size={getWidthnHeight(5)?.width}
                name={"calendar-week"}
                colorType={"yellow"}
              />
              <ThemedText
                style={[
                  { fontSize: fontSizeH4().fontSize + 1 },
                  getMarginLeft(2),
                ]}
                colorType={"white"}
              >
                {task.flexible_date
                  ? "Flexible"
                  : task.on_date
                  ? `On ${moment(task.on_date, "DD/MM/YYYY").format(
                      "ddd, DD MMM"
                    )}`
                  : task.before_date &&
                    `Before ${moment(task.before_date, "DD/MM/YYYY").format(
                      "ddd, DD MMM"
                    )}`}
              </ThemedText>
            </View>
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 0,
                },
              ]}
            >
              <ThemedMaterialCommunityIcons
                size={getWidthnHeight(5)?.width}
                name={"clock"}
                colorType={"yellow"}
              />
              <ThemedText
                numberOfLines={1}
                style={[
                  { fontSize: fontSizeH4().fontSize + 1 },
                  getMarginLeft(2),
                ]}
                colorType={"white"}
              >
                {task?.certain_time?.title ?? "Anytime"}
              </ThemedText>
            </View>
          </ThemedView>
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
              {task.status.replace(/^\w/, (c) => c.toUpperCase())}
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
    shadowOffset: {
      width: 0,
      height: getWidthnHeight(0.5)?.width!,
    },
  },
});

export { TaskCard };
