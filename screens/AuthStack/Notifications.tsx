import React from "react";
import { ThemedSafe } from "../../components/ThemedSafe";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import {
  fontSizeH4,
  getMarginTop,
  getWidthnHeight,
} from "../../components/width";
import { PostComponent } from "../../components/PostComponent";
import { Image, useColorScheme, View } from "react-native";
import { Colors } from "../../constants/Colors";

const Notifications: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{ flex: 1, paddingHorizontal: getWidthnHeight(3)?.width }}
      >
        <View style={[getMarginTop(1)]}>
          <PostComponent
            icon={
              <Image
                source={require("../../assets/lock.jpg")}
                resizeMode="contain"
                style={{
                  width: getWidthnHeight(12)?.width,
                  height: getWidthnHeight(12)?.width,
                  borderRadius: getWidthnHeight(10)?.width,
                  borderWidth: 0.5,
                }}
              />
            }
            time={null}
            title={"Colling D. has made an offer on Cook dinner"}
            titleStyle={{
              color: Colors[theme]["iconColor"],
              fontSize: fontSizeH4().fontSize + 3,
            }}
            subtitle={"3 weeks ago"}
            subtitleStyle={{
              color: Colors[theme]["darkGray"],
              fontSize: fontSizeH4().fontSize + 1,
            }}
          />
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export { Notifications };
