import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import auth from "@react-native-firebase/auth";
// import { PhoneAuthProvider } from "firebase/auth";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { ThemedSafe } from "../../components/ThemedSafe";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "../../components/width";
import { Colors } from "../../constants/Colors";
import { PhoneInput } from "../../components/PhoneInput";
import { LoginTypesStackParamList } from ".";

type NavigationProp = NativeStackNavigationProp<LoginTypesStackParamList>;

function PhoneAuth() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  // const recaptchVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(null);

  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendConfirmationCode = async (number: string) => {
    try {
      return auth().verifyPhoneNumber(`+91${number}`);
    } catch (error: any) {
      console.log("!!! ERROR: ", error);
      // Alert.alert("Error!!", JSON.stringify(error, null, 4))
    }
  };

  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={{ flex: 1, alignItems: "center", borderWidth: 0 }}>
      <ThemedView
        style={[
          {
            flex: 1,
            backgroundColor: "transparent",
          },
          getWidthnHeight(100),
        ]}
      >
        {/* <KeyboardAvoidingView style={[{ flex: 1 }]}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            style={{ flex: 1, width: "100%" }}
          > */}
        <View
          style={[
            {
              flex: 1,
              alignItems: "center",
              paddingHorizontal: getWidthnHeight(5)?.width,
            },
          ]}
        >
          <View style={[{ borderWidth: 0, width: "100%" }]}>
            <ThemedText
              style={[
                {
                  fontFamily: "Cookie_400Regular",
                  fontSize: fontSizeH2().fontSize + 8,
                  textAlignVertical: "center",
                  textAlign: "left",
                },
                // getMarginTop(-5),
              ]}
            >
              {"Phone\nAuthentication"}
            </ThemedText>
            <View style={[]}>
              <ThemedText
                style={{
                  // fontFamily: "Cookie_400Regular",
                  fontSize: fontSizeH4().fontSize,
                  textAlign: "left",
                }}
              >
                {
                  "Please enter your phone number to receive a\nverification code"
                }
              </ThemedText>
            </View>
          </View>
          <View
            style={[
              {
                borderWidth: 0,
                width: "100%",
                alignItems: "flex-start",
              },
            ]}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderWidth: 0,
                  width: "100%",
                },
                getMarginTop(2),
              ]}
            >
              <PhoneInput
                containerStyle={{
                  width: getWidthnHeight(70)?.width,
                  paddingVertical: getWidthnHeight(3)?.width,
                  // marginLeft: getMarginLeft(10).marginLeft,
                }}
                inputProps={{
                  placeholder: "Mobile Number",
                  placeholderTextColor: Colors[theme]["gradeOut"],
                  fontSize: fontSizeH4().fontSize + 6,
                  keyboardType: "phone-pad",
                  onChangeText: (text: string) => {
                    setPhoneNumber(text.replace(/[^0-9]/g, ""));
                  },
                  style: {
                    color: Colors[theme]["iconColor"],
                  },
                }}
              />
              {loading ? (
                <View
                  style={{
                    width: "25%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator
                    color={Colors[theme]["yellow"]}
                    size={"large"}
                    style={{ transform: [{ scale: 1.3 }] }}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    width: "25%",
                    borderWidth: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={async () => {
                    if (phoneNumber?.length === 10) {
                      try {
                        setLoading(true);
                        Keyboard.dismiss();
                        const confirmation = await sendConfirmationCode(
                          phoneNumber
                        );
                        setLoading(false);
                        console.log("### CONFIRMATION: ", confirmation);
                        if (confirmation?.verificationId) {
                          navigation.navigate("otpVerify", {
                            verificationId: confirmation.verificationId,
                            phoneNumber: phoneNumber,
                          });
                        }
                      } catch (error) {
                        console.log("!!! OTP Verification error: ", error);
                        setLoading(false);
                      }
                    }
                  }}
                >
                  <MaterialCommunityIcons
                    name="arrow-right-circle"
                    color={Colors[theme]["primary"]}
                    size={getWidthnHeight(13)?.width}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Image
            source={require("../../assets/login4.jpg")}
            resizeMode="cover"
            style={{
              opacity: 1,
              width: getWidthnHeight(70)?.width,
              height: getWidthnHeight(90)?.width,
            }}
          />
        </View>
        {/* </ScrollView>
        </KeyboardAvoidingView> */}
        {/* <View style={[{ flex: 1, justifyContent: "center" }]}></View> */}
      </ThemedView>
    </ThemedView>
  );
}

export default PhoneAuth;
