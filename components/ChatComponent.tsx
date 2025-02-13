import React, { useEffect, useRef, useState } from "react";
import { ThemedView } from "./ThemedView";
import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
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
  const imageRef = useRef<Image>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
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
      <View style={{ borderWidth: 0 }}>
        <Image
          ref={imageRef}
          source={{ uri: image, cache: "force-cache" }}
          resizeMode="contain"
          resizeMethod="resize"
          onLoad={() => setImageLoaded(true)}
          style={{
            width: getWidthnHeight(10)?.width,
            height: getWidthnHeight(10)?.width,
            borderRadius: getWidthnHeight(5)?.width,
          }}
        />

        {/* {!imageLoaded && (
          <ThemedView
            colorType="gradeOut"
            style={[
              {
                width: getWidthnHeight(10)?.width,
                height: getWidthnHeight(10)?.width,
                borderRadius: getWidthnHeight(5)?.width,
                borderWidth: 0.5,
              },
              StyleSheet.absoluteFillObject,
            ]}
          />
        )} */}
      </View>
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
