import React, { ReactNode, useEffect, useState } from "react";
import {
  useColorScheme,
  View,
  Image,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Platform,
} from "react-native";

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
import { ThemedAntDesign } from "../../../components/ThemedAntDesign";

interface ImageContainerProps {
  uri: string;
  index: number;
}

type Step3Props = {
  details: string | undefined;
  images: string[];
  setDetails: (value: string) => void;
  setImages: (data: any) => void;
  submitStep3: boolean;
  onPress?: () => void;
};

const Step3: React.FC<Step3Props> = ({
  details,
  images = [],
  setDetails,
  setImages,
  submitStep3,
  onPress,
}) => {
  const theme = useColorScheme() ?? "light";

  const ImageContainer: React.FC<ImageContainerProps> = ({ uri, index }) => {
    let containerStyle: StyleProp<ViewStyle> = {};
    if (index === 1 || index === 5) {
      containerStyle = {};
    } else {
      containerStyle = {
        marginLeft: getWidthnHeight(3)?.width,
      };
    }
    return (
      <View
        style={[
          {
            margin: getWidthnHeight(2)?.width,
          },
          containerStyle,
        ]}
      >
        <ThemedView
          style={[
            {
              width: getWidthnHeight(20)?.width,
              height: getWidthnHeight(20)?.width,
              borderRadius: getWidthnHeight(2)?.width,
            },
            styles.shadow,
            getMarginBottom(1),
          ]}
        >
          <Image
            source={{ uri }}
            resizeMode="cover"
            style={{
              flex: 1,
              borderRadius: getWidthnHeight(2)?.width,
            }}
          />
        </ThemedView>
        <View style={[StyleSheet.absoluteFillObject]}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              const updateImages = images.filter(
                (item, subIndex) => subIndex !== index - 1
              );
              setImages(updateImages);
            }}
          >
            <ThemedView
              colorType={"buttonBorder"}
              style={{
                width: getWidthnHeight(6)?.width,
                height: getWidthnHeight(6)?.width,
                borderRadius: getWidthnHeight(4)?.width,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedAntDesign
                lightColor={Colors.light.white}
                darkColor={Colors.dark.black}
                name={"close"}
                size={getWidthnHeight(4)?.width}
              />
            </ThemedView>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          {
            paddingHorizontal: getWidthnHeight(4)?.width,
          },
        ]}
      >
        <ThemedText
          style={[
            { fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" },
            getMarginTop(4),
          ]}
        >
          What are the details ?
        </ThemedText>

        <View style={[getMarginTop(1.5)]}>
          <IconTextInput
            showClearIcon={false}
            value={details}
            onChangeText={(text) => setDetails(text.trimStart())}
            icon={null}
            multiline
            numberOfLines={5}
            placeholder="Write a summary of the key details"
            placeholderTextColor={submitStep3 && !details ? "red" : "darkGray"}
            style={{
              flex: 1,
              height: getWidthnHeight(32)?.width,
              textAlignVertical: "top",
              paddingHorizontal: getWidthnHeight(0)?.width,
              marginHorizontal: getWidthnHeight(1)?.width,
              fontSize: fontSizeH4().fontSize + 4,
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: getWidthnHeight(4)?.width,
            },
            getMarginTop(4),
          ]}
        >
          <ThemedText
            style={[{ fontSize: fontSizeH4().fontSize + 4, fontWeight: "500" }]}
          >
            Add images
          </ThemedText>
          <ThemedText
            style={[{ fontSize: fontSizeH4().fontSize + 4 }, getMarginLeft(1)]}
          >
            (optional)
          </ThemedText>
        </View>
        <View
          style={[
            {
              borderWidth: 0,
              width: "100%",
              paddingHorizontal: getWidthnHeight(2)?.width,
            },
            getMarginTop(1),
          ]}
        >
          <FlatList
            data={images}
            keyExtractor={(item) => item}
            numColumns={4}
            ListFooterComponent={() =>
              images.length < 8 && <AddImageButton onPress={onPress} />
            }
            renderItem={({ item, index }) => {
              // console.log("@@@ ITEM: ", item);
              return <ImageContainer index={index + 1} uri={item} />;
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowColor:
      Platform.OS === "ios"
        ? `${Colors.light.iconColor}8F`
        : Colors.light.iconColor,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    borderRadius: getWidthnHeight(3)?.width,
    shadowOffset: {
      width: 0,
      height: getWidthnHeight(0.5)?.width!,
    },
  },
});

export { Step3 };
