import React from "react";
import { Platform, TouchableOpacity, useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./Login";
import PhoneAuth from "./PhoneAuth";
import { LoginResponseProps, OtpVerify } from "./OtpVerify";
import { Colors } from "../../constants/Colors";
import {
  fontSizeH2,
  getMarginRight,
  getWidthnHeight,
} from "../../components/width";
import { ThemedMaterialIcons } from "../../components/ThemedMaterialIcon";
import { UserProfile } from "../AuthStack/UserProfile";

export type RootStackParamList = {
  startup: undefined;
  loginTypes: undefined;
};

export type LoginTypesStackParamList = {
  phoneAuth: undefined;
  otpVerify: {
    verificationId: string;
    phoneNumber: string | null;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const LoginTypesStack = createNativeStackNavigator<LoginTypesStackParamList>();

export default function NoAuthStackNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="startup" component={LoginPage} />
      <RootStack.Screen name="loginTypes" component={LoginTypes} />
    </RootStack.Navigator>
  );
}

function LoginTypes() {
  const theme = useColorScheme() ?? "light";
  return (
    <LoginTypesStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
        headerStyle: {
          backgroundColor: Colors[theme]["background"],
        },
        headerTintColor: Colors[theme]["iconColor"],
      }}
    >
      <LoginTypesStack.Screen
        options={({ navigation }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,

              headerLeft: () => (
                <TouchableOpacity
                  style={getMarginRight(3)}
                  onPress={() => navigation.goBack()}
                >
                  <ThemedMaterialIcons
                    name={"keyboard-backspace"}
                    size={getWidthnHeight(6)?.width}
                    colorType={"iconColor"}
                  />
                </TouchableOpacity>
              ),
            },
          }),
        })}
        name="phoneAuth"
        component={PhoneAuth}
      />
      <LoginTypesStack.Screen
        options={({ navigation }) => ({
          ...Platform.select({
            ios: {
              headerShown: true,

              headerLeft: () => (
                <TouchableOpacity
                  style={getMarginRight(3)}
                  onPress={() => navigation.goBack()}
                >
                  <ThemedMaterialIcons
                    name={"keyboard-backspace"}
                    size={getWidthnHeight(6)?.width}
                    colorType={"iconColor"}
                  />
                </TouchableOpacity>
              ),
            },
          }),
        })}
        name="otpVerify"
        component={OtpVerify}
      />
      {/* <LoginTypesStack.Screen
        options={({ navigation }) => ({
          headerTitle: "User Profile",
          headerTitleStyle: {
            fontFamily: "Cookie_400Regular",
            fontSize: fontSizeH2().fontSize + 8,
          },
          headerStyle: {
            backgroundColor: Colors[theme]["yellow"],
          },
          headerTitleAlign: "center",
          ...Platform.select({
            ios: {
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity
                  style={getMarginRight(3)}
                  onPress={() => navigation.goBack()}
                >
                  <ThemedMaterialIcons
                    name={"keyboard-backspace"}
                    size={getWidthnHeight(6)?.width}
                    colorType={"iconColor"}
                  />
                </TouchableOpacity>
              ),
            },
          }),
        })}
        name="userProfile"
        component={UserProfile}
      /> */}
    </LoginTypesStack.Navigator>
  );
}
