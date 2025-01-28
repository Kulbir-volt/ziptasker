import React, { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, ActivityIndicator, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

import { ThemedSafe } from "../../components/ThemedSafe";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import {
  fontSizeH3,
  getMarginBottom,
  getMarginTop,
  getWidthnHeight,
} from "../../components/width";
import { Colors } from "../../constants/Colors";
import {
  RoundButton,
  ThemedButton,
} from "../../components/Buttons/RoundButton";
import { RootStackParamList } from ".";

function LoginPage() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();

  return (
    <ThemedSafe style={{ flex: 1, alignItems: "center" }}>
      <ThemedView>
        <Image
          source={require("../../assets/all-lock.jpg")}
          resizeMode="cover"
          style={{
            borderWidth: 0,
            width: getWidthnHeight(70)?.width,
            height: getWidthnHeight(90)?.width,
          }}
        />
        <ThemedText
          style={{
            fontFamily: "DancingScript_700Bold",
            // fontFamily: "Cookie_400Regular",
            fontSize: fontSizeH3().fontSize,
            textAlign: "center",
            transform: [
              {
                scale: 1.5,
              },
            ],
          }}
        >
          Zip Tasker
        </ThemedText>
        <ThemedView
          style={[
            {
              width: getWidthnHeight(70)?.width,
              height: 1,
            },
            getMarginTop(1),
          ]}
          lightColor={Colors.light.underline}
          darkColor={Colors.dark.underline}
        />
        <View
          style={[{ flex: 1, justifyContent: "center" }, getMarginBottom(3)]}
        >
          <RoundButton
            type="phone"
            onPress={() => navigation.navigate("loginTypes")}
          />
          <View style={[getMarginTop(2)]}>
            <ThemedButton
              type="google"
              title="Sign in with Google"
              style={{}}
            />
          </View>
        </View>
      </ThemedView>
    </ThemedSafe>
  );
}

export default LoginPage;
