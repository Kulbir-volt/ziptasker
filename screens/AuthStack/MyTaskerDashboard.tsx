import React from "react";
import { Image, StyleSheet, useColorScheme, View } from "react-native";

import { ThemedView } from "../../components/ThemedView";
import { ThemedSafe } from "../../components/ThemedSafe";
import {
  fontSizeH2,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { ThemedText } from "../../components/ThemedText";
import { Colors } from "../../constants/Colors";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";
import { ThemedIonicons } from "../../components/ThemedIonicons";
import { ThemedEvilIcons } from "../../components/ThemedEvilicons";
import { ThemedFontAwesome6 } from "../../components/ThemedFontAwesome6";

const MyTaskerDashboard: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  return (
    <ThemedSafe style={{ flex: 1 }}>
      <ThemedView
        colorType={"screenBG"}
        style={{ flex: 1, paddingHorizontal: getWidthnHeight(3)?.width }}
      >
        <ThemedText
          colorType={"darkGray"}
          style={[{ fontWeight: "500" }, getMarginVertical(1)]}
        >
          Dashboard
        </ThemedText>
        <ThemedView
          style={[
            {
              borderRadius: getWidthnHeight(2)?.width,
              shadowColor: Colors[theme]["iconColor"],
            },
            styles.shadow,
          ]}
        >
          <View
            style={{
              padding: getWidthnHeight(3)?.width,
            }}
          >
            <ThemedText
              colorType={"darkGray"}
              style={[
                { fontWeight: "500", fontSize: fontSizeH4().fontSize - 1 },
              ]}
            >
              YOUR CURRENT TIER
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/bronze.png")}
                resizeMode="cover"
                style={{
                  width: getWidthnHeight(20)?.width,
                  height: getWidthnHeight(20)?.width,
                }}
              />
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <ThemedText
                    colorType={"iconColor"}
                    style={[
                      {
                        fontWeight: "500",
                        fontSize: fontSizeH4().fontSize + 7,
                      },
                    ]}
                  >
                    Bronze
                  </ThemedText>
                  <ThemedText
                    colorType={"iconColor"}
                    style={[
                      { fontSize: fontSizeH4().fontSize },
                      getMarginLeft(2),
                    ]}
                  >
                    15% service fee
                  </ThemedText>
                </View>
                <ThemedText
                  colorType={"iconColor"}
                  style={[
                    { fontWeight: "400", fontSize: fontSizeH4().fontSize + 2 },
                  ]}
                >
                  Based on Earnings
                </ThemedText>
              </View>
            </View>
          </View>
        </ThemedView>

        <ThemedView
          style={[
            {
              borderRadius: getWidthnHeight(2)?.width,
              shadowColor: Colors[theme]["iconColor"],
            },
            getMarginTop(3),
            styles.shadow,
          ]}
        >
          <View
            style={{
              padding: getWidthnHeight(3)?.width,
            }}
          >
            <View style={[]}>
              <ThemedText
                colorType={"darkGray"}
                style={[
                  { fontWeight: "500", fontSize: fontSizeH4().fontSize - 1 },
                ]}
              >
                YOUR SCORES
              </ThemedText>
              <ThemedText
                colorType={"iconColor"}
                style={[
                  { fontWeight: "400", fontSize: fontSizeH4().fontSize + 4 },
                  getMarginTop(0.7),
                ]}
              >
                Your Earnings (last 30 days)
              </ThemedText>
              <ThemedText
                colorType={"darkGray"}
                style={[
                  { fontSize: fontSizeH4().fontSize + 2 },
                  getMarginTop(0.7),
                ]}
              >
                Your earnings are $500 away from Silver and lowering service
                fees.
              </ThemedText>
            </View>
            <View style={[getMarginTop(2)]}>
              <ThemedView
                colorType={"commonScreenBG"}
                style={{
                  paddingVertical: getWidthnHeight(1)?.width,
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  borderRadius: getWidthnHeight(2)?.width,
                }}
              >
                <ThemedText style={{ fontSize: fontSizeH4().fontSize + 1 }}>
                  $0
                </ThemedText>
              </ThemedView>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 1 }}>
                  <ThemedText colorType={"darkGray"} style={[fontSizeH4()]}>
                    $0
                  </ThemedText>
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText colorType={"darkGray"} style={[fontSizeH4()]}>
                    $500
                  </ThemedText>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <ThemedText colorType={"darkGray"} style={[fontSizeH4()]}>
                    $1,000
                  </ThemedText>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <ThemedText colorType={"darkGray"} style={[fontSizeH4()]}>
                    $1,500+
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          <ThemedView
            colorType={"screenBG"}
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                padding: getWidthnHeight(2)?.width,
                borderBottomStartRadius: getWidthnHeight(2)?.width,
                borderBottomEndRadius: getWidthnHeight(2)?.width,
              },
              getMarginBottom(0),
            ]}
          >
            <ThemedAntDesign
              colorType={"iconColor"}
              name={"questioncircleo"}
              size={getWidthnHeight(4)?.width}
            />
            <ThemedText
              colorType={"iconColor"}
              style={[
                { fontWeight: "400", fontSize: fontSizeH4().fontSize + 3 },
                getMarginLeft(2),
              ]}
            >
              How do tiers work?
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView
          style={[
            {
              borderRadius: getWidthnHeight(2)?.width,
              shadowColor: Colors[theme]["iconColor"],
            },
            getMarginTop(3),
            styles.shadow,
          ]}
        >
          <View
            style={{
              padding: getWidthnHeight(3)?.width,
            }}
          >
            <ThemedText
              colorType={"darkGray"}
              style={[
                { fontWeight: "500", fontSize: fontSizeH4().fontSize - 1 },
              ]}
            >
              NEXT TIER BENEFITS
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: getWidthnHeight(15)?.width,
                  height: getWidthnHeight(20)?.width,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ThemedFontAwesome6
                  colorType={"black"}
                  name={"dollar"}
                  size={getWidthnHeight(7)?.width}
                />
              </View>
              <View
                style={{
                  borderWidth: 0,
                  paddingRight: getWidthnHeight(2)?.width,
                  flex: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <ThemedText
                    colorType={"iconColor"}
                    style={[
                      {
                        fontWeight: "500",
                        fontSize: fontSizeH4().fontSize + 3,
                      },
                    ]}
                  >
                    Reach Silver for lower service fees!
                  </ThemedText>
                </View>
                <ThemedText
                  colorType={"iconColor"}
                  style={[
                    { fontWeight: "400", fontSize: fontSizeH4().fontSize + 2 },
                  ]}
                >
                  Pay less with a service fee of 12%
                </ThemedText>
              </View>
            </View>
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedSafe>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
});

export { MyTaskerDashboard };
