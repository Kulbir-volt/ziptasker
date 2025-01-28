import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Image,
  ViewProps,
  StyleProp,
  ViewStyle,
  ButtonProps,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { fontSizeH4, getMarginLeft, getWidthnHeight } from "../width";
import { Colors } from "../../constants/Colors";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

type ThemedButtonProps = ButtonProps & {
  type?: string | null;
  title?: string;
  style?: StyleProp<ViewStyle>;
  lightColor?: string;
  darkColor?: string;
};

function RoundButton({
  type = "phone",
  title = "Sign in with phone",
  style = {},
  onPress = () => {},
}) {
  let icon = null;
  const theme = useColorScheme() ?? "light";
  if (type === "phone") {
    icon = (
      <FontAwesome
        name={type}
        size={getWidthnHeight(6)?.width}
        color={Colors[theme]["black"]}
      />
    );
  } else if (type === "google") {
    icon = (
      <Image
        source={require("../../assets/google.png")}
        style={{
          width: getWidthnHeight(6)?.width,
          height: getWidthnHeight(6)?.width,
        }}
      />
    );
  }
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors[theme]["primary"],
            paddingVertical: getWidthnHeight(3)?.width,
            borderRadius: getWidthnHeight(10)?.width,
          },
          style,
        ]}
      >
        {icon}
        <Text
          style={[
            {
              color: Colors[theme]["black"],
              fontSize: fontSizeH4().fontSize + 6,
              fontWeight: "500",
            },
            getMarginLeft(3),
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function ThemedButton({
  type,
  title = "Sign in with Google",
  style,
  onPress,
  lightColor,
  darkColor,
}: ThemedButtonProps) {
  let icon = null;
  const theme = useColorScheme() ?? "light";
  if (type === "google") {
    icon = (
      <Image
        source={require("../../assets/google.png")}
        style={{
          width: getWidthnHeight(6)?.width,
          height: getWidthnHeight(6)?.width,
        }}
      />
    );
  }
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <ThemedView
        lightColor={lightColor}
        darkColor={darkColor}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: getWidthnHeight(3)?.width,
            borderRadius: getWidthnHeight(10)?.width,
            borderWidth: 1,
            borderColor: Colors[theme]["iconColor"],
          },
          style,
        ]}
      >
        {icon}
        <ThemedText
          style={[
            {
              color: Colors[theme]["iconColor"],
              fontSize: fontSizeH4().fontSize + 6,
              fontWeight: "500",
            },
            getMarginLeft(icon ? 3 : 0),
          ]}
        >
          {title}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

function NextIconButton({ onPress = () => {} }) {
  const theme = useColorScheme() ?? "light";
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        // width: "20%",
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="arrow-right-circle"
        color={Colors[theme]["primary"]}
        size={getWidthnHeight(13)?.width}
      />
    </TouchableOpacity>
  );
}

export { RoundButton, ThemedButton, NextIconButton };
