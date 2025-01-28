import React from "react";
import { ThemedView } from "./ThemedView";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { fontSizeH4, getMarginLeft, getWidthnHeight } from "./width";
import { ThemedText } from "./ThemedText";

type MessageComponentProps = {
  style?: StyleProp<ViewStyle>;
  showDate?: boolean;
  numberOfLines?: number;
  title?: string;
};

const MessageComponent: React.FC<MessageComponentProps> = ({
  style,
  showDate = true,
  numberOfLines = 3,
  title = "Remove a radiator",
}) => {
  return (
    <ThemedView
      style={[
        {
          flexDirection: "row",
          borderWidth: 0,
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
      <ThemedView style={[{ flex: 1, borderWidth: 0 }, getMarginLeft(2)]}>
        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ThemedText
            style={{ flex: 1 }}
            type={"defaultSemiBold"}
            colorType={"iconColor"}
          >
            {title}
          </ThemedText>
          {showDate && (
            <ThemedText
              style={{ fontSize: fontSizeH4().fontSize + 2 }}
              colorType={"darkGray"}
            >
              20 Nov 2024
            </ThemedText>
          )}
        </View>
        <ThemedText
          numberOfLines={numberOfLines}
          style={{ fontSize: fontSizeH4().fontSize + 2 }}
          colorType={"darkGray"}
        >
          Me: Hi Janice, I'm happy to do this for 70% of your offer ($21). I
          just need to know what the exact part is, as your link is to the
          entire machine.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export { MessageComponent };
