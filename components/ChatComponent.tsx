import React from "react";
import { ThemedView } from "./ThemedView";
import { Image, StyleProp, ViewStyle } from "react-native";
import { getMarginLeft, getWidthnHeight } from "./width";
import { ThemedText } from "./ThemedText";

type ChatComponentProps = {
  style?: StyleProp<ViewStyle>;
};

const ChatComponent: React.FC<ChatComponentProps> = ({ style }) => {
  return (
    <ThemedView
      style={[
        {
          flexDirection: "row",
          flex: 1,
        },
        style,
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
      <ThemedView
        style={[
          {
            flex: 1,
            borderRadius: getWidthnHeight(2)?.width,
            padding: getWidthnHeight(3)?.width,
          },
          getMarginLeft(2),
        ]}
        colorType={"commonScreenBG"}
      >
        <ThemedText colorType={"darkGray"}>Bijan K.</ThemedText>
        <ThemedText>
          Hi Janice, I'm happy to do this for 70% of your offer ($21). I just
          need to know what the exact part is, as your link is to the entire
          machine.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export { ChatComponent };
