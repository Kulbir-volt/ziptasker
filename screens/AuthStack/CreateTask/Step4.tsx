import React, { ReactNode, useEffect, useState } from "react";
import {
  useColorScheme,
  View,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { JobTypeBox } from "../../../components/JobTypeBox";
import { Colors } from "../../../constants/Colors";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "../../../components/width";
import { ThemedText } from "../../../components/ThemedText";
import { IconTextInput } from "../../../components/IconTextInput";
import { ThemedIonicons } from "../../../components/ThemedIonicons";
import { AddImageButton } from "../../../components/Buttons/AddImageButton";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedFontAwesome6 } from "../../../components/ThemedFontAwesome6";

type Step4Props = {
  budget: string | undefined;
  submitStep4: boolean;
  setBudget: (value: string) => void;
};

const Step4: React.FC<Step4Props> = ({ budget, submitStep4, setBudget }) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View style={{ flex: 1 }}>
      <ThemedText
        style={[
          {
            fontFamily: "SquadaOne_400Regular",
            color: Colors[theme]["iconColor"],
            fontSize: fontSizeH2().fontSize + 4,
          },
          // fontSizeH2(),
        ]}
      >
        Suggest your budget?
      </ThemedText>
      <View
        style={[
          {
            borderWidth: 0,
          },
        ]}
      >
        <ThemedText
          style={[
            { fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" },
            getMarginTop(4),
          ]}
        >
          What is your budget?
        </ThemedText>
        <ThemedText
          style={[{ fontSize: fontSizeH4().fontSize + 3 }, getMarginTop(1)]}
        >
          You can always negotiate the final price
        </ThemedText>

        <View style={[getMarginTop(1.5)]}>
          <IconTextInput
            value={budget}
            keyboardType={"numeric"}
            onChangeText={(text) => setBudget(text.replace(/[^0-9]/g, ""))}
            onClear={() => setBudget("")}
            icon={
              <ThemedFontAwesome6
                name={"dollar"}
                colorType={"iconColor"}
                size={getWidthnHeight(5)?.width}
              />
            }
            placeholder="Enter budget"
            placeholderTextColor={"darkGray"}
            style={{
              flex: 1,
              borderWidth: 0,
              paddingHorizontal: getWidthnHeight(2)?.width,
              marginVertical: getWidthnHeight(2)?.width,
              marginHorizontal: getWidthnHeight(1)?.width,
              fontSize: fontSizeH4().fontSize + 4,
            }}
          />
          {submitStep4 && !budget && (
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
                *Budget is required
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export { Step4 };
