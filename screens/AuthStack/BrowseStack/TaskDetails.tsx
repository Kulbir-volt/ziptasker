import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Animated,
  Easing,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { ThemedView } from "../../../components/ThemedView";
import { ThemedSafe } from "../../../components/ThemedSafe";
import {
  fontSizeH1,
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../../components/width";
import { ThemedText } from "../../../components/ThemedText";
import { BrowseStackNavigationProps, TaskDetailsStackParamList } from "..";
import { ThemedAntDesign } from "../../../components/ThemedAntDesign";
import { Colors } from "../../../constants/Colors";
import { PostComponent } from "../../../components/PostComponent";
import { ThemedFontAwesome } from "../../../components/ThemedFontAwesome";
import { ThemedIonicons } from "../../../components/ThemedIonicons";
import { FlatButton } from "../../../components/Buttons/FlatButton";
import { ThemedPicker } from "../../../components/ThemedPicker";
import { ThemedGradientView } from "../../../components/ThemedGradientView";
import { ThemedMaterialIcons } from "../../../components/ThemedMaterialIcon";
import { ThemedEvilIcons } from "../../../components/ThemedEvilicons";
import { UserDetails } from "../../../components/UserProfileDetails";
import { ThemedMaterialCommunityIcons } from "../../../components/ThemedMaterialCommunityIcon";
import { PrimaryInput } from "../../../components/PrimaryInput";
import { ChatComponent } from "../../../components/ChatComponent";
import { CommonTaskDetails } from "../CommonTaskDetails";

type TaskDetailsRouteProp = RouteProp<TaskDetailsStackParamList, "taskDetails">;
// type MyTaskDetailsRouteProp = RouteProp<MyTaskDetailsStackParamList, "myTaskDetails">;
const HEADER_MAX_HEIGHT = getWidthnHeight(35)?.width!; // Max header height

const TaskDetails: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const route = useRoute<TaskDetailsRouteProp>();
  const navigation = useNavigation<BrowseStackNavigationProps>();
  const taskDetails = route.params?.details;
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(true);
  const [animateSlide, setAnimateSlide] = useState<Animated.Value>(
    new Animated.Value(1)
  );
  const [selectedOffers, setSelectedOffers] = useState<boolean>(true);

  const items = [
    {
      label: "Post a similar task",
      value: "item1",
    },
    {
      label: "Set up Alerts",
      value: "item2",
    },
  ];

  useEffect(() => {
    if (expand) {
      slidingEffect(1);
    } else {
      slidingEffect(0);
    }
  }, [expand]);

  function slidingEffect(value: number) {
    Animated.timing(animateSlide, {
      toValue: value,
      useNativeDriver: false,
    }).start();
  }

  const animateHeight: ViewStyle = {
    height: animateSlide.interpolate({
      inputRange: [0, 1],
      outputRange: ["100%", "50%"],
    }),
  };

  return (
    <ThemedView
      // lightColor={Colors[theme]["screenBG"]}
      style={{ flex: 1, borderWidth: 0 }}
    >
      <View style={[styles.header]}>
        <ThemedView
          colorType={"screenBG"}
          style={[
            {
              paddingHorizontal: getWidthnHeight(3)?.width,
              borderWidth: 0,
              flex: 1,
              // paddingBottom: getWidthnHeight(4)?.width,
            },
          ]}
        >
          <ThemedText
            style={[
              {
                fontSize: fontSizeH4().fontSize + 5,
                fontWeight: "500",
              },
            ]}
          >
            Make an offer now
          </ThemedText>
          <ThemedText
            style={[
              {
                fontSize: fontSizeH4().fontSize + 5,
                fontWeight: "normal",
              },
              getMarginTop(1.5),
            ]}
          >
            60 Taskers have viewed this task already
          </ThemedText>
          <FlatButton
            lightColor={Colors[theme]["yellow"]}
            darkColor={Colors[theme]["yellow"]}
            title="Make an offer"
            onPress={() => {}}
            style={[
              {
                borderRadius: getWidthnHeight(10)?.width,
                paddingHorizontal: getWidthnHeight(5)?.width,
                width: "100%",
              },
              getMarginTop(2),
            ]}
            textStyle={{
              paddingVertical: getWidthnHeight(3)?.width,
              fontSize: fontSizeH4().fontSize + 4,
            }}
          />
        </ThemedView>
      </View>
      <ScrollView style={[styles.scrollView]}>
        <CommonTaskDetails
          style={{
            marginTop: HEADER_MAX_HEIGHT,
          }}
          taskDetails={taskDetails}
        />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    borderRadius: getWidthnHeight(3)?.width,
    overflow: "hidden",
  },
  header: {
    ...StyleSheet.absoluteFillObject,
    height: HEADER_MAX_HEIGHT,
    // width: "100%",
  },
  scrollView: {
    flex: 1,
  },
});

export { TaskDetails };
