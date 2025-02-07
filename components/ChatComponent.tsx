import React, { useEffect } from "react";
import { ThemedView } from "./ThemedView";
import { Image, StyleProp, ViewStyle } from "react-native";
import { fontSizeH4, getMarginLeft, getWidthnHeight } from "./width";
import { ThemedText } from "./ThemedText";

type ChatComponentProps = {
  style?: StyleProp<ViewStyle>;
  name?: string | undefined;
  image?: string | undefined;
  message?: string | undefined;
};

const ChatComponent: React.FC<ChatComponentProps> = ({
  style,
  name,
  image,
  message,
}) => {
  const splitName = name ? name.split(" ") : [];
  let userName = "";
  if (splitName.length === 1) {
    userName = splitName[0];
  } else if (splitName.length > 1) {
    userName = `${splitName[0]} ${splitName[1].substring(0, 1)}.`;
  } else {
    userName = "No name";
  }

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
        source={image ? { uri: image } : require("../assets/login2.jpg")}
        resizeMode="contain"
        resizeMethod="resize"
        style={{
          width: getWidthnHeight(10)?.width,
          height: getWidthnHeight(10)?.width,
          borderRadius: getWidthnHeight(5)?.width,
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
        <ThemedText
          style={{ fontSize: fontSizeH4().fontSize + 2 }}
          colorType={"darkGray"}
        >
          {userName || "--"}
        </ThemedText>
        <ThemedText style={{ fontSize: fontSizeH4().fontSize + 2 }}>
          {message}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

export { ChatComponent };
