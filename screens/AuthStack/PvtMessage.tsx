import React, { useEffect, useRef } from "react";
import { Image, ScrollView, View } from "react-native";

import { ThemedView } from "../../components/ThemedView";
import {
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginRight,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { ThemedText } from "../../components/ThemedText";
import { IconTextInput } from "../../components/IconTextInput";
import { ThemedIonicons } from "../../components/ThemedIonicons";
import { MessageComponent } from "../../components/MessageComponent";
import { ThemedMaterialIcons } from "../../components/ThemedMaterialIcon";
import { useNavigation } from "@react-navigation/native";
import { ThemedMaterialCommunityIcons } from "../../components/ThemedMaterialCommunityIcon";
import { Conversation } from "../../components/Converstation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CustomBS } from "../../components/BottomSheet/CustomBS";
import { FlatButton } from "../../components/Buttons/FlatButton";
import { PrimaryInput } from "../../components/PrimaryInput";
import { ThemedSafe } from "../../components/ThemedSafe";

type PvtMessageProps = {
  title?: string;
  subtitle?: string;
};

const PvtMessage: React.FC = () => {
  const navigation = useNavigation();
  const bookRef = useRef<BottomSheetModal>(null);

  useEffect(() => {}, []);

  return (
    <ThemedSafe style={{ flex: 1 }}>
      <ThemedView
        style={{
          padding: getWidthnHeight(3)?.width,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.01,
        }}
      >
        <ThemedMaterialIcons
          name="keyboard-backspace"
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
          onPress={() => navigation.goBack()}
        />
        <View style={{ alignItems: "center" }}>
          <ThemedText
            style={{ fontWeight: "600", fontSize: fontSizeH4().fontSize + 6 }}
          >
            Ruchit D.
          </ThemedText>
          <ThemedText
            colorType={"darkGray"}
            style={{ fontSize: fontSizeH4().fontSize }}
          >
            Active 1 year ago
          </ThemedText>
        </View>
        <ThemedMaterialCommunityIcons
          name={"dots-horizontal"}
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
          onPress={() => {}}
        />
      </ThemedView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: getWidthnHeight(3)?.width,
          borderTopWidth: 0.5,
          paddingVertical: getWidthnHeight(2)?.width,
        }}
      >
        <Image
          source={require("../../assets/lock.jpg")}
          resizeMode="contain"
          style={{
            width: getWidthnHeight(15)?.width,
            height: getWidthnHeight(15)?.width,
            borderRadius: getWidthnHeight(8)?.width,
          }}
        />
        <View style={{ flex: 1, paddingHorizontal: getWidthnHeight(3)?.width }}>
          <ThemedText
            numberOfLines={1}
            style={{ fontSize: fontSizeH4().fontSize + 5, fontWeight: "500" }}
          >
            Mould Remove and Apply the mould
          </ThemedText>
          <ThemedText
            colorType={"darkGray"}
            style={{ fontSize: fontSizeH4().fontSize + 2, fontWeight: "500" }}
          >
            Ruchit D.
          </ThemedText>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <ThemedText
            style={{ fontSize: fontSizeH4().fontSize + 5, fontWeight: "500" }}
          >
            $150
          </ThemedText>
          <ThemedText
            colorType={"darkGray"}
            style={{ fontSize: fontSizeH4().fontSize + 2, fontWeight: "500" }}
          >
            Completed
          </ThemedText>
        </View>
      </View>
      <ThemedView
        colorType={"screenBG"}
        style={{
          flex: 1,
          paddingHorizontal: getWidthnHeight(3)?.width,
        }}
      >
        <ScrollView>
          <View style={[{ flex: 1 }, getMarginTop(2)]}>
            <Conversation />
            <View style={[getMarginTop(2)]}>
              <Conversation enableRight={false} />
            </View>
          </View>
        </ScrollView>
      </ThemedView>
      <ThemedView>
        <FlatButton
          title={"Book Ruchit again"}
          onPress={() => bookRef.current?.present()}
          style={[
            {
              marginHorizontal: getWidthnHeight(5)?.width,
              borderRadius: getWidthnHeight(10)?.width,
            },
            getMarginVertical(2),
          ]}
        />
        <PrimaryInput
          colorType={"commonScreenBG"}
          containerStyle={{
            marginHorizontal: getWidthnHeight(5)?.width,
            borderRadius: getWidthnHeight(2)?.width,
          }}
          placeholder="Private message to Ruchit D."
          placeholderTextColor={"gradeOut"}
          style={{
            margin: getWidthnHeight(4)?.width,
          }}
        />
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: getWidthnHeight(5)?.width,
            },
            getMarginVertical(1),
          ]}
        >
          <ThemedMaterialCommunityIcons
            name={"camera-plus"}
            size={getWidthnHeight(7)?.width}
            colorType={"iconColor"}
            onPress={() => {}}
          />
          <FlatButton
            colorType={"transparent"}
            title={"Send"}
            onPress={() => {}}
          />
        </View>
      </ThemedView>
      <CustomBS ref={bookRef} snapPoints={["60%"]}>
        <ThemedView
          style={[{ flex: 1, alignItems: "center" }, getMarginTop(1)]}
        >
          <ThemedText
            style={{ fontSize: fontSizeH3().fontSize + 0, fontWeight: "500" }}
          >
            Book Ruchit again
          </ThemedText>
          <ThemedText style={[{ textAlign: "center" }, getMarginTop(1)]}>
            Provide a brief description of the task
          </ThemedText>
          <View style={[{ flex: 1 }, getMarginTop(2)]}>
            <PrimaryInput
              colorType={"commonScreenBG"}
              containerStyle={[
                {
                  marginHorizontal: getWidthnHeight(5)?.width,
                  borderRadius: getWidthnHeight(2)?.width,
                },
                getMarginTop(2),
              ]}
              multiline
              placeholder="Private message to Ruchit D."
              placeholderTextColor={"darkGray"}
              style={{
                margin: getWidthnHeight(4)?.width,
                fontSize: fontSizeH4().fontSize + 4,
                width: getWidthnHeight(80)?.width,
                height: getWidthnHeight(30)?.width,
                textAlignVertical: "top",
              }}
            />
            <ThemedText
              style={[{ textAlign: "right" }, getMarginRight(6)]}
              colorType={"darkGray"}
            >
              Minimum 25 characters
            </ThemedText>
          </View>
          <FlatButton
            style={[
              { width: "90%", borderRadius: getWidthnHeight(10)?.width },
              getMarginBottom(1),
            ]}
            title={"Get a quote"}
            onPress={() => {}}
          />
        </ThemedView>
      </CustomBS>
    </ThemedSafe>
  );
};

export { PvtMessage };
