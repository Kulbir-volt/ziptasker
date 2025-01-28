import React from "react";
import { View } from "react-native";

import { ThemedSafe } from "../../components/ThemedSafe";
import { ThemedView } from "../../components/ThemedView";
import {
  fontSizeH4,
  getMarginTop,
  getWidthnHeight,
} from "../../components/width";
import { ThemedText } from "../../components/ThemedText";
import { IconTextInput } from "../../components/IconTextInput";
import { ThemedIonicons } from "../../components/ThemedIonicons";
import { MessageComponent } from "../../components/MessageComponent";

const Messages: React.FC = () => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{
          flex: 1,
          paddingHorizontal: getWidthnHeight(3)?.width,
        }}
      >
        <View style={[getMarginTop(1)]}>
          <IconTextInput
            icon={
              <ThemedIonicons
                name={"search-outline"}
                colorType={"darkGray"}
                size={getWidthnHeight(5)?.width}
              />
            }
            containerStyle={{
              paddingVertical: getWidthnHeight(3)?.width,
            }}
            placeholder="Search"
            placeholderTextColor={"gradeOut"}
            style={{
              flex: 1,
              fontSize: fontSizeH4().fontSize + 4,
              paddingHorizontal: getWidthnHeight(3)?.width,
            }}
            onChangeText={(text) => {}}
          />
        </View>
        <View style={[{ flex: 1 }, getMarginTop(2)]}>
          <MessageComponent />
          <MessageComponent style={[getMarginTop(2)]} />
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export { Messages };
