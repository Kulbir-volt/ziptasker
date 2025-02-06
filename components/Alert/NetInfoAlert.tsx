import { useState } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  fontSizeH4,
  getMarginHorizontal,
  getWidthnHeight,
} from "../../components/width";
import { alertActions } from "../../redux/slice/slidingAlert";
import { useEffect } from "react";
import { ThemedAntDesign } from "../ThemedAntDesign";
import { ThemedFontAwesome } from "../ThemedFontAwesome";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "../../constants/Colors";
import { RootState } from "../../redux/store";

const HEIGHT = 40;

function NetinfoAlert() {
  const { isConnected } = useSelector((state: RootState) => state.auth);
  const [animateY, setAnimateY] = useState<Animated.Value>(
    new Animated.Value(0)
  );

  useEffect(() => {
    if (isConnected === false) {
      animateMessage();
    } else if (isConnected) {
      setTimeout(() => {
        animateMessage(0);
      }, 3000);
    }
  }, [isConnected]);

  function animateMessage(value = 1) {
    if (value == 1) {
      console.log("@@@ NETINFO ANIMATE START: ", value);
    } else {
      console.log("@@@ NETINFO ANIMATE STOP: ", value);
    }
    Animated.timing(animateY, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      let type = "start";
      if (value === 0) {
        type = "end";
      }
      if (finished && type === "start") {
        // NOTIFICATION STAYS
      } else if (finished && type === "end") {
        animateY.setValue(0);
      }
    });
  }

  const animatedStyles: StyleProp<ViewStyle> = {
    transform: [
      {
        translateY: animateY.interpolate({
          inputRange: [0, 1],
          outputRange: [
            -getWidthnHeight(HEIGHT)?.width!,
            getWidthnHeight(0)?.width!,
          ],
        }),
      },
    ],
  };

  return (
    <ThemedView
      animate={true}
      colorType={"transparent"}
      style={[styles.container, animatedStyles]}
      pointerEvents={"none"}
    >
      {isConnected && (
        <View
          style={[
            styles.subContainer,
            {
              backgroundColor: `${Colors.light.blackShade}CF`,
            },
          ]}
        >
          <View style={[{ borderWidth: 0, borderColor: "red" }]}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedFontAwesome
                name={"globe"}
                colorType={"success"}
                size={getWidthnHeight(8)?.width}
              />
            </View>
          </View>
          <View>
            <ThemedText
              numberOfLines={2}
              colorType={"success"}
              style={[
                {
                  fontWeight: "600",
                  fontSize: fontSizeH4().fontSize + 5,
                  maxWidth: getWidthnHeight(70)?.width,
                  borderColor: "white",
                  borderWidth: 0,
                },
                getMarginHorizontal(3),
              ]}
            >
              Connected
            </ThemedText>
          </View>
        </View>
      )}
      {isConnected === false && (
        <View
          style={[
            styles.subContainer,
            {
              backgroundColor: `${Colors.light.red}AF`,
            },
          ]}
        >
          <View style={[{ borderWidth: 0, borderColor: "red" }]}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedFontAwesome
                name={"globe"}
                colorType={"white"}
                size={getWidthnHeight(8)?.width}
              />
            </View>
          </View>
          <View>
            <ThemedText
              numberOfLines={2}
              colorType={"white"}
              style={[
                {
                  fontWeight: "500",
                  fontSize: fontSizeH4().fontSize + 5,
                  maxWidth: getWidthnHeight(70)?.width,
                  borderColor: "white",
                  borderWidth: 0,
                },
                getMarginHorizontal(3),
              ]}
            >
              Not Connected
            </ThemedText>
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: getWidthnHeight(100)?.width,
    height: getWidthnHeight(HEIGHT)?.width,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  subContainer: {
    width: "95%",
    paddingVertical: getWidthnHeight(1)?.width,
    // paddingHorizontal: getWidthnHeight(10).width,
    borderRadius: getWidthnHeight(3)?.width,
    // borderColor: Colors.light.white,
    // borderWidth: getWidthnHeight(1)?.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    shadowColor: Colors.light.black,
    shadowRadius: 5,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: getWidthnHeight(0.2)?.width!,
    },
  },
  internalContainer: {
    flex: 1,
    paddingVertical: getWidthnHeight(1)?.width,
    borderRadius: getWidthnHeight(3)?.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { NetinfoAlert };
