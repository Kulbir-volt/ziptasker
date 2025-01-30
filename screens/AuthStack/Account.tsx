import React from "react";
import { ThemedSafe } from "../../components/ThemedSafe";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../../constants/Colors";
import {
  fontSizeH2,
  fontSizeH4,
  getMarginLeft,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { ThemedFontAwesome } from "../../components/ThemedFontAwesome";
import { useSelector } from "react-redux";
import { logoutUser, RootState } from "../../redux/store";
import { ThemedEvilIcons } from "../../components/ThemedEvilicons";
import { ThemedMaterialIcons } from "../../components/ThemedMaterialIcon";
import { ArrowComponent } from "../../components/ArrowComponent";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";
import { ThemedIonicons } from "../../components/ThemedIonicons";
import { authActions, UserDetails } from "../../redux/slice/auth";

const Account = () => {
  const theme = useColorScheme() ?? "light";
  const dispatch = useDispatch();
  const { details } = useSelector((state: RootState) => state.auth);
  const userDetails: UserDetails = JSON.parse(details as string);
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{
          paddingHorizontal: getWidthnHeight(3)?.width,
          paddingTop: getWidthnHeight(5)?.width,
          paddingBottom: getWidthnHeight(10)?.width,
        }}
        lightColor={Colors[theme]["yellow"]}
        darkColor={Colors[theme]["background"]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ThemedFontAwesome
            name={"user-circle"}
            colorType={"iconColor"}
            size={getWidthnHeight(15)?.width}
          />
          <View style={{ paddingHorizontal: getWidthnHeight(3)?.width }}>
            <ThemedText
              style={[
                fontSizeH2(),
                {
                  // lineHeight: -1,
                  fontFamily: "SquadaOne_400Regular",
                  color: Colors[theme]["iconColor"],
                },
              ]}
            >
              {userDetails?.name}
            </ThemedText>
            <ThemedText
              style={[
                ,
                {
                  // lineHeight: -1,
                  color: Colors[theme]["iconColor"],
                  fontSize: fontSizeH4().fontSize + 2,
                },
              ]}
            >
              Sydney NSW, Australia
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity
          style={[
            {
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            },
            getMarginTop(1),
          ]}
        >
          <ThemedText
            style={[
              ,
              {
                // lineHeight: -1,
                color: Colors[theme]["iconColor"],
                fontSize: fontSizeH4().fontSize + 2,
              },
            ]}
          >
            See your public profile
          </ThemedText>
          <View
            style={[
              { flexDirection: "row", alignItems: "center" },
              getMarginLeft(5),
            ]}
          >
            <ThemedMaterialIcons
              name={"edit"}
              colorType={"iconColor"}
              size={getWidthnHeight(6)?.width}
            />
            <ThemedText
              style={[
                ,
                {
                  // lineHeight: -1,
                  color: Colors[theme]["iconColor"],
                  fontSize: fontSizeH4().fontSize + 2,
                },
                getMarginLeft(1),
              ]}
            >
              Edit
            </ThemedText>
          </View>
        </TouchableOpacity>
      </ThemedView>
      <View
        style={{
          flex: 1,
          backgroundColor:
            theme === "light"
              ? Colors[theme]["yellow"]
              : Colors[theme]["background"],
        }}
      >
        <ThemedView
          style={{
            flex: 1,
            borderTopLeftRadius: getWidthnHeight(10)?.width,
            borderTopRightRadius: getWidthnHeight(10)?.width,
            overflow: "hidden",
          }}
        >
          <View
            style={[
              {
                flex: 1,
                paddingHorizontal: getWidthnHeight(5)?.width,
              },
              getWidthnHeight(100),
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flex: 1, borderWidth: 0 }}>
                <ThemedText
                  style={[
                    { fontSize: fontSizeH4().fontSize - 1 },
                    getMarginVertical(3),
                  ]}
                >
                  ACCOUNT SETTING
                </ThemedText>
                <ArrowComponent
                  icon={
                    <ThemedAntDesign
                      name={"creditcard"}
                      colorType={"iconColor"}
                      size={getWidthnHeight(6)?.width}
                    />
                  }
                  title="Payment options"
                  titleStyle={{
                    fontSize: fontSizeH4().fontSize + 4,
                  }}
                />
                <ArrowComponent
                  icon={
                    <ThemedAntDesign
                      name={"bells"}
                      colorType={"iconColor"}
                      size={getWidthnHeight(6)?.width}
                    />
                  }
                  title="Notification preferences"
                  titleStyle={{
                    fontSize: fontSizeH4().fontSize + 4,
                  }}
                />
                <ArrowComponent
                  icon={
                    <ThemedAntDesign
                      name={"lock"}
                      colorType={"iconColor"}
                      size={getWidthnHeight(6)?.width}
                    />
                  }
                  title="Personal information"
                  titleStyle={{
                    fontSize: fontSizeH4().fontSize + 4,
                  }}
                />
                <ThemedText
                  style={[
                    { fontSize: fontSizeH4().fontSize - 1 },
                    getMarginVertical(3),
                    getMarginTop(5),
                  ]}
                >
                  EARNING MONEY
                </ThemedText>
                <ArrowComponent
                  icon={
                    <ThemedFontAwesome
                      name={"bar-chart"}
                      colorType={"iconColor"}
                      size={getWidthnHeight(6)?.width}
                    />
                  }
                  title="My dashboard"
                  titleStyle={{
                    fontSize: fontSizeH4().fontSize + 4,
                  }}
                />
                <ArrowComponent
                  style={{
                    paddingVertical: getMarginVertical(1).marginVertical,
                  }}
                  icon={
                    <ThemedIonicons
                      name={"warning"}
                      colorType={"iconColor"}
                      size={getWidthnHeight(6)?.width}
                    />
                  }
                  title="Set up task alerts"
                  subtitle="Get notified when new tasks match your skills"
                  titleStyle={{
                    fontSize: fontSizeH4().fontSize + 4,
                  }}
                  subtitleStyle={{
                    color: Colors[theme]["darkGray"],
                    fontSize: fontSizeH4().fontSize + 2,
                  }}
                />
                <ArrowComponent
                  style={{
                    paddingVertical: getMarginVertical(1).marginVertical,
                  }}
                  icon={
                    <ThemedMaterialIcons
                      name={"miscellaneous-services"}
                      colorType={"iconColor"}
                      size={getWidthnHeight(6)?.width}
                    />
                  }
                  title="List my services"
                  subtitle="Create listings for your services so customers come to you"
                  titleStyle={{
                    fontSize: fontSizeH4().fontSize + 4,
                  }}
                  subtitleStyle={{
                    color: Colors[theme]["darkGray"],
                    fontSize: fontSizeH4().fontSize + 2,
                  }}
                />
                <ArrowComponent
                  onPress={() => logoutUser()}
                  icon={
                    <ThemedIonicons
                      name={"exit-outline"}
                      colorType={"iconColor"}
                      size={getWidthnHeight(6)?.width}
                    />
                  }
                  title="Logout"
                  titleStyle={{
                    fontSize: fontSizeH4().fontSize + 4,
                  }}
                />
                {/* <ArrowComponent
                  icon={
                    <ThemedMaterialIcons
                      name={"miscellaneous-services"}
                      colorType={"iconColor"}
                      size={getWidthnHeight(6)?.width}
                    />
                  }
                  title="Services"
                  subtitle="Create listings for your services so customers come to you"
                  titleStyle={{
                    fontSize: fontSizeH4().fontSize + 4,
                  }}
                  subtitleStyle={{
                    color: Colors[theme]["darkGray"],
                    fontSize: fontSizeH4().fontSize + 2,
                  }}
                /> */}
              </View>
            </ScrollView>
          </View>
        </ThemedView>
      </View>
    </ThemedView>
  );
};

export { Account };
