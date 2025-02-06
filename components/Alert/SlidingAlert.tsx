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

function SlidingAlert() {
  const alertSlice = useSelector((state: RootState) => state.alertSlice);
  const theme = useColorScheme() ?? "light";
  const [animateY, setAnimateY] = useState<Animated.Value>(
    new Animated.Value(0)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("@@ ALERT SLICE: ", alertSlice);
    if (alertSlice?.visible) {
      animateMessage();
    }
  }, [alertSlice]);

  function animateMessage(value = 1) {
    if (value == 1) {
      console.log("@@@ ANIMATE START: ", value);
    } else {
      console.log("@@@ ANIMATE STOP: ", value);
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
        setTimeout(() => {
          animateMessage(0);
        }, alertSlice.timeout || 3000);
      } else if (finished && type === "end") {
        animateY.setValue(0);
        dispatch(
          alertActions.setAlert({
            visible: false,
            title: "",
            subtitle: "",
            type: "",
            timeout: 3000,
            marginTop: 0,
          })
        );
      }
    });
  }

  const maxRange =
    alertSlice.marginTop === undefined ? 0 : alertSlice.marginTop;

  const animatedStyles: StyleProp<ViewStyle> = {
    transform: [
      {
        translateY: animateY.interpolate({
          inputRange: [0, 1],
          outputRange: [
            -getWidthnHeight(50)?.width!,
            getWidthnHeight(maxRange)?.width!,
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
              numberOfLines={2}
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
                numberOfLines={3}
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: getWidthnHeight(100)?.width,
    height: getWidthnHeight(50)?.width,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
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
