import React from "react";
import { ThemedView } from "./ThemedView";
import {
  Image,
  StyleProp,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { fontSizeH4, getMarginLeft, getWidthnHeight } from "./width";
import { ThemedText } from "./ThemedText";
import { Colors } from "../constants/Colors";

type ConversationProps = {
  style?: StyleProp<ViewStyle>;
  showDate?: boolean;
  numberOfLines?: number;
  title?: string;
  enableRight?: boolean;
};

const Conversation: React.FC<ConversationProps> = ({
  style,
  showDate = true,
  numberOfLines = 3,
  title = "Remove a radiator",
  enableRight = true,
}) => {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView
      colorType={"screenBG"}
      style={[
        {
          flexDirection: "row",
          alignItems: "flex-end",
          borderWidth: 0,
        },
        style,
      ]}
    >
      {enableRight ? (
        <>
          <View style={{ marginLeft: getWidthnHeight(10)?.width }} />
          <ThemedView
            lightColor={Colors[theme]["yellow"]}
            darkColor={Colors[theme]["commonScreenBG"]}
            style={[
              {
                flex: 1,
                borderWidth: 0,
                borderTopLeftRadius: getWidthnHeight(3)?.width,
                borderTopRightRadius: getWidthnHeight(3)?.width,
                borderBottomLeftRadius: getWidthnHeight(3)?.width,
                paddingHorizontal: getWidthnHeight(5)?.width,
                paddingVertical: getWidthnHeight(3)?.width,
              },
            ]}
          >
            <ThemedText
              style={{ fontSize: fontSizeH4().fontSize + 2 }}
              colorType={"iconColor"}
            >
              Hi Janice, I'm happy to do this for 70% of your offer ($21). I
              just need to know what the exact part is, as your link is to the
              entire machine.
            </ThemedText>
          </ThemedView>
          <ThemedView colorType={"yellow"}>
            <ThemedView
              colorType={"screenBG"}
              style={[
                {
                  paddingLeft: getWidthnHeight(3)?.width,
                  borderBottomLeftRadius: getWidthnHeight(4)?.width,
                },
              ]}
            >
              <Image
                source={require("../assets/login2.jpg")}
                resizeMode="contain"
                style={{
                  width: getWidthnHeight(12)?.width,
                  height: getWidthnHeight(12)?.width,
                  borderRadius: getWidthnHeight(10)?.width,
                }}
              />
            </ThemedView>
          </ThemedView>
        </>
      ) : (
        <>
          <ThemedView colorType={"background"}>
            <ThemedView
              colorType={"screenBG"}
              style={{
                paddingRight: getWidthnHeight(3)?.width,
                borderBottomRightRadius: getWidthnHeight(4)?.width,
              }}
            >
              <Image
                source={require("../assets/login2.jpg")}
                resizeMode="contain"
                style={{
                  width: getWidthnHeight(12)?.width,
                  height: getWidthnHeight(12)?.width,
                  borderRadius: getWidthnHeight(10)?.width,
                }}
              />
            </ThemedView>
          </ThemedView>
          <ThemedView
            lightColor={Colors[theme]["white"]}
            darkColor={Colors[theme]["commonScreenBG"]}
            style={[
              {
                flex: 1,
                borderWidth: 0,
                borderTopLeftRadius: getWidthnHeight(3)?.width,
                borderTopRightRadius: getWidthnHeight(3)?.width,
                borderBottomRightRadius: getWidthnHeight(3)?.width,
                paddingHorizontal: getWidthnHeight(5)?.width,
                paddingVertical: getWidthnHeight(3)?.width,
              },
            ]}
          >
            <ThemedText
              style={{ fontSize: fontSizeH4().fontSize + 2 }}
              colorType={"iconColor"}
            >
              Hi Janice, I'm happy to do this for 70% of your offer ($21). I
              just need to know what the exact part is, as your link is to the
              entire machine.
            </ThemedText>
          </ThemedView>
          <View style={{ marginLeft: getWidthnHeight(10)?.width }} />
        </>
      )}
    </ThemedView>
  );
};

export { Conversation };
