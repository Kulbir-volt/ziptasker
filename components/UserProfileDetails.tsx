import React from "react";
import { ThemedView } from "./ThemedView";
import { Image, View } from "react-native";
import { fontSizeH4, getWidthnHeight } from "./width";
import { ThemedText } from "./ThemedText";
import { Colors } from "../constants/Colors";

type UserDetailsProps = {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  title?: string;
  subTitle?: string;
  ratings?: string;
  count?: number;
  verified?: boolean;
};

const UserProfileDetails: React.FC<UserDetailsProps> = ({
  colorType,
  title,
  subTitle,
  ratings,
  count,
  verified = true,
}) => {
  return (
    <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("../assets/3d.png")}
        style={{
          width: getWidthnHeight(23)?.width,
          height: getWidthnHeight(23)?.width,
          borderRadius: getWidthnHeight(2)?.width,
        }}
        resizeMode="contain"
      />
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ThemedText
            style={{ fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" }}
            colorType={"iconColor"}
          >
            {title}
          </ThemedText>
          {verified && (
            <Image
              source={require("../assets/verified.png")}
              style={{
                width: getWidthnHeight(6)?.width,
                height: getWidthnHeight(6)?.width,
              }}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ThemedText
            style={{
              fontSize: fontSizeH4().fontSize + 4,
              fontWeight: "500",
              paddingRight: getWidthnHeight(1)?.width,
            }}
            colorType={"ratingStar"}
          >
            {ratings}
          </ThemedText>
          <Image
            source={require("../assets/star.png")}
            style={{
              width: getWidthnHeight(6)?.width,
              height: getWidthnHeight(6)?.width,
            }}
            resizeMode="contain"
          />
          <ThemedText
            style={{
              fontSize: fontSizeH4().fontSize + 4,
              paddingLeft: getWidthnHeight(1)?.width,
            }}
            colorType={"darkGray"}
          >
            ({count})
          </ThemedText>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ThemedText
            style={{
              fontSize: fontSizeH4().fontSize + 3,
              fontWeight: "500",
              paddingRight: getWidthnHeight(1)?.width,
            }}
            colorType={"iconColor"}
          >
            {subTitle}
          </ThemedText>
          <ThemedText
            style={{
              fontSize: fontSizeH4().fontSize + 3,
              paddingLeft: getWidthnHeight(1)?.width,
            }}
            colorType={"darkGray"}
          >
            Completion rate
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

export { UserProfileDetails };
