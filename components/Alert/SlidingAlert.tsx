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

const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);

function SlidingAlert() {
  const alertSlice = useSelector((state: RootState) => state.alertSlice);
  const theme = useColorScheme() ?? "light";
  const [animateY, setAnimateY] = useState<Animated.Value>(
    new Animated.Value(0)
  );
  const dispatch = useDispatch();
  // console.log("@@ ALERT SLICE: ", alertSlice)
  useEffect(() => {
    if (alertSlice?.visible) {
      animateMessage();
    }
  }, [alertSlice]);

  function animateMessage(value = 1) {
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
        setTimeout(() => {
          animateMessage(0);
        }, 3000);
      } else if (finished && type === "end") {
        animateY.setValue(0);
        // dispatch(
        //   alertActions.setAlert({ visible: false, message: "", type: "" })
        // );
      }
    });
  }

  const animatedStyles: StyleProp<ViewStyle> = {
    transform: [
      {
        translateY: animateY.interpolate({
          inputRange: [0, 1],
          outputRange: [
            -getWidthnHeight(50)?.width!,
            getWidthnHeight(5)?.width!,
          ],
        }),
      },
    ],
  };

  return (
    <AnimatedThemedView
      colorType={"transparent"}
      style={[styles.container, animatedStyles]}
      pointerEvents={"none"}
    >
      {alertSlice.type === "success" && (
        <ThemedView
          colorType="lightSuccess"
          style={[
            styles.subContainer,
            {
              // borderColor: Colors[theme]["buttonBorder"],
            },
          ]}
        >
          <View style={[{ borderWidth: 0, borderColor: "red" }]}>
            <ThemedAntDesign
              name="checkcircle"
              colorType={"success"}
              size={getWidthnHeight(8)?.width}
            />
          </View>
          <View>
            <ThemedText
              colorType={"black"}
              style={[
                {
                  fontWeight: "600",
                  fontSize: fontSizeH4().fontSize + 3,
                  maxWidth: getWidthnHeight(70)?.width,
                  borderColor: "white",
                  borderWidth: 0,
                },
                getMarginHorizontal(3),
              ]}
            >
              {alertSlice?.title}
            </ThemedText>
            {alertSlice?.subtitle && (
              <ThemedText
                colorType={"black"}
                style={[
                  {
                    fontSize: fontSizeH4().fontSize + 0,
                    maxWidth: getWidthnHeight(70)?.width,
                    borderColor: "white",
                    borderWidth: 0,
                  },
                  getMarginHorizontal(3),
                ]}
              >
                {alertSlice?.subtitle}
              </ThemedText>
            )}
          </View>
        </ThemedView>
      )}
      {alertSlice.type === "warning" && (
        <ThemedView
          colorType="white"
          style={[styles.subContainer, { paddingVertical: 0 }]}
        >
          <ThemedView
            colorType="lightWarning"
            style={[styles.internalContainer]}
          >
            <View style={[{ borderWidth: 0, borderColor: "red" }]}>
              <ThemedFontAwesome
                name="warning"
                colorType={"warning"}
                size={getWidthnHeight(8)?.width}
              />
            </View>
            <View>
              <ThemedText
                colorType="black"
                style={[
                  {
                    fontWeight: "600",
                    fontSize: fontSizeH4().fontSize + 3,
                    maxWidth: getWidthnHeight(70)?.width,
                    borderColor: "white",
                    borderWidth: 0,
                  },
                  getMarginHorizontal(3),
                ]}
              >
                {alertSlice?.title}
              </ThemedText>
              {alertSlice?.subtitle && (
                <ThemedText
                  colorType="black"
                  style={[
                    {
                      fontSize: fontSizeH4().fontSize + 0,
                      maxWidth: getWidthnHeight(70)?.width,
                      borderColor: "white",
                      borderWidth: 0,
                    },
                    getMarginHorizontal(3),
                  ]}
                >
                  {alertSlice?.subtitle}
                </ThemedText>
              )}
            </View>
          </ThemedView>
        </ThemedView>
      )}
      {alertSlice.type === "error" && (
        <ThemedView
          colorType={"white"}
          style={[styles.subContainer, { paddingVertical: 0 }]}
        >
          <ThemedView colorType="lightError" style={[styles.internalContainer]}>
            <View style={[{ borderWidth: 0, borderColor: "red" }]}>
              <ThemedFontAwesome
                name="warning"
                colorType={"error"}
                size={getWidthnHeight(8)?.width}
              />
            </View>
            <View>
              {alertSlice?.title && (
                <ThemedText
                  colorType="black"
                  style={[
                    {
                      fontWeight: "600",
                      fontSize: fontSizeH4().fontSize + 3,
                      maxWidth: getWidthnHeight(70)?.width,
                      borderColor: "white",
                      borderWidth: 0,
                    },
                    getMarginHorizontal(3),
                  ]}
                >
                  {alertSlice?.title}
                </ThemedText>
              )}
              {alertSlice?.subtitle && (
                <ThemedText
                  colorType="black"
                  style={[
                    {
                      fontSize: fontSizeH4().fontSize + 0,
                      maxWidth: getWidthnHeight(70)?.width,
                      borderColor: "white",
                      borderWidth: 0,
                    },
                    getMarginHorizontal(3),
                  ]}
                >
                  {alertSlice?.subtitle}
                </ThemedText>
              )}
            </View>
          </ThemedView>
        </ThemedView>
      )}
    </AnimatedThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: getWidthnHeight(100)?.width,
    height: getWidthnHeight(50)?.width,
    alignItems: "center",
    justifyContent: "center",
  },
  subContainer: {
    width: "95%",
    paddingVertical: getWidthnHeight(5)?.width,
    // paddingHorizontal: getWidthnHeight(10).width,
    borderRadius: getWidthnHeight(3)?.width,
    borderColor: Colors.light.white,
    borderWidth: getWidthnHeight(1)?.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 7,
    shadowColor: Colors.light.black,
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  internalContainer: {
    flex: 1,
    paddingVertical: getWidthnHeight(5)?.width,
    borderRadius: getWidthnHeight(3)?.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { SlidingAlert };
