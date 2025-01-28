import React from "react";
import { useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./Login";
import PhoneAuth from "./PhoneAuth";
import { OtpVerify } from "./OtpVerify";
import { Colors } from "../../constants/Colors";

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
      <LoginTypesStack.Screen name="phoneAuth" component={PhoneAuth} />
      <LoginTypesStack.Screen name="otpVerify" component={OtpVerify} />
    </LoginTypesStack.Navigator>
  );
}
