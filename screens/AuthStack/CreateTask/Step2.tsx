import React, { useState, useCallback } from "react";
import {
  useColorScheme,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { JobTypeBox } from "../../../components/JobTypeBox";
import { Colors } from "../../../constants/Colors";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginTop,
  getWidthnHeight,
} from "../../../components/width";
import { ThemedText } from "../../../components/ThemedText";
import { IconTextInput } from "../../../components/IconTextInput";
import { ThemedIonicons } from "../../../components/ThemedIonicons";
import { GooglePlacesSearchBar } from "../../../components/GooglePlacesSearchBar";
import { Place } from "./CreateTask";
import { ThemedView } from "../../../components/ThemedView";
import { DummyTextInput } from "../../../components/DummyTextInput";

type Step2Props = {
  selected: number;
  setSelected: (value: number) => void;
  selectedLocation: Place | null;
  setSelectedLocation: (details: Place | null) => void;
  submitStep2: boolean;
  openBottomSheet: () => void;
};

const Step2: React.FC<Step2Props> = ({
  selected = 1,
  setSelected,
  selectedLocation,
  setSelectedLocation,
  submitStep2,
  openBottomSheet,
}) => {
  const theme = useColorScheme() ?? "light";

  return (
    <KeyboardAvoidingView style={[{ flex: 1 }]}>
      <ScrollView keyboardShouldPersistTaps="always" style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss(); // Close the keyboard if open
          }}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: getWidthnHeight(4)?.width,
            }}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                },
                getMarginTop(4),
              ]}
            >
              <JobTypeBox
                title="In-person"
                subtitle="Select this if you need the Tasker physically there"
                lightColor={
                  selected === 1
                    ? Colors[theme]["yellow"]
                    : Colors[theme]["screenBG"]
                }
                darkColor={
                  selected === 1
                    ? Colors[theme]["yellow"]
                    : Colors[theme]["screenBG"]
                }
                onPress={() => {
                  if (selected == 2) {
                    setSelected(1);
                  }
                }}
                style={{
                  width: getWidthnHeight(44)?.width,
                  height: getWidthnHeight(40)?.width,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: getWidthnHeight(3)?.width,
                  elevation: 4,
                  shadowOffset: {
                    width: 0,
                    height: getWidthnHeight(0.5)?.width!,
                  },
                  shadowColor: Colors[theme]["iconColor"],
                  shadowOpacity: 0.4,
                  shadowRadius: 6,
                }}
              />
              <JobTypeBox
                title="Online"
                subtitle="Select this if the Tasker can do it from home"
                lightColor={
                  selected === 2
                    ? Colors[theme]["yellow"]
                    : Colors[theme]["screenBG"]
                }
                darkColor={
                  selected === 2
                    ? Colors[theme]["yellow"]
                    : Colors[theme]["screenBG"]
                }
                onPress={() => {
                  if (selected == 1) {
                    setSelected(2);
                    setSelectedLocation(null);
                  }
                }}
                style={{
                  width: getWidthnHeight(44)?.width,
                  height: getWidthnHeight(40)?.width,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: getWidthnHeight(3)?.width,
                  elevation: 4,
                  shadowOffset: {
                    width: 0,
                    height: getWidthnHeight(0.5)?.width!,
                  },
                  shadowColor: Colors[theme]["iconColor"],
                  shadowOpacity: 0.4,
                  shadowRadius: 6,
                }}
              />
            </View>
            {selected === 1 && (
              <View>
                <ThemedText
                  style={[
                    { fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" },
                    getMarginTop(4),
                  ]}
                >
                  Where do you need this done?
                </ThemedText>
                <View style={[{ borderWidth: 0 }, getMarginTop(1.5)]}>
                  <DummyTextInput
                    icon={
                      <ThemedIonicons
                        name="location"
                        colorType={"iconColor"}
                        size={getWidthnHeight(7)?.width}
                      />
                    }
                    placeholder={"Enter your postcode"}
                    placeholderTextColor={"darkGray"}
                    onPress={() => openBottomSheet()}
                    value={selectedLocation?.description}
                  />
                  {selected === 1 && submitStep2 && !selectedLocation && (
                    <View style={[{ zIndex: -1 }, getMarginTop(1)]}>
                      <ThemedText
                        style={{
                          position: "absolute",
                          color: Colors[theme]["red"],
                          fontSize: fontSizeH4().fontSize - 1,
                          backgroundColor:
                            theme === "light"
                              ? Colors.light.white
                              : Colors.dark.transparent,
                        }}
                      >
                        *Location is required
                      </ThemedText>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { Step2 };
