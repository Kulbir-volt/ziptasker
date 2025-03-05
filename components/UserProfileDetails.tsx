import React from "react";
import { ThemedView } from "./ThemedView";
import { Image, View } from "react-native";
import {
  fontSizeH4,
  getMarginLeft,
  getMarginRight,
  getWidthnHeight,
} from "./width";
import { ThemedText } from "./ThemedText";
import { Colors } from "../constants/Colors";
import { defaultUserImage } from "../firebase/create/saveQuestion";
import { ThemedOcticons } from "./ThemedOctions";

type UserDetailsProps = {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  title?: string;
  subTitle?: string;
  ratings?: string | number;
  count?: number | string;
  verified?: boolean;
  image?: string | null;
  amount: string | number;
  showPrice: boolean;
};

const UserProfileDetails: React.FC<UserDetailsProps> = ({
  colorType,
  title,
  subTitle,
  ratings,
  count,
  verified = true,
  image,
  amount,
  showPrice,
}) => {
  return (
    <ThemedView style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{ uri: image ? image : defaultUserImage }}
        style={[
          {
            width: getWidthnHeight(18)?.width,
            height: getWidthnHeight(18)?.width,
            borderRadius: getWidthnHeight(2)?.width,
          },
          getMarginRight(2),
        ]}
        resizeMode="contain"
      />
      <View style={{ flex: 1, borderWidth: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              borderWidth: 0,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ThemedText
              style={{ fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" }}
              colorType={"iconColor"}
              numberOfLines={1}
            >
              {title}
            </ThemedText>
            {verified && (
              <Image
                source={require("../assets/verified.png")}
                style={[
                  {
                    width: getWidthnHeight(7)?.width,
                    height: getWidthnHeight(7)?.width,
                  },
                  getMarginLeft(2),
                ]}
                resizeMode="contain"
              />
            )}
            {!verified && (
              <ThemedView
                colorType="red"
                style={[
                  {
                    width: getWidthnHeight(5)?.width,
                    height: getWidthnHeight(5)?.width,
                    borderRadius: getWidthnHeight(3)?.width,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  getMarginLeft(2),
                ]}
              >
                <ThemedOcticons
                  name={"shield-x"}
                  size={getWidthnHeight(3)?.width}
                  colorType={"white"}
                />
              </ThemedView>
            )}
          </View>
          {showPrice && (
            <View style={{ flex: 1 }}>
              <ThemedText
                style={{
                  fontSize: fontSizeH4().fontSize + 6,
                  fontWeight: "500",
                  textAlign: "right",
                }}
                colorType={"iconColor"}
                numberOfLines={1}
              >
                {amount}
              </ThemedText>
            </View>
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
        <View
          style={{ flexDirection: "row", alignItems: "center", borderWidth: 0 }}
        >
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
