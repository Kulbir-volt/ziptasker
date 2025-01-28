import React, { ReactNode, forwardRef, useImperativeHandle } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
} from "react-native-google-places-autocomplete";
import type { GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";

import { ThemedView } from "./ThemedView";
import { ThemedIonicons } from "./ThemedIonicons";
import { getWidthnHeight } from "./width";
import { Colors } from "../constants/Colors";

type IconTextInputProps = GooglePlacesAutocompleteProps & {
  lightColor?: string;
  darkColor?: string;
  icon?: ReactNode;
  style?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
};

const GooglePlacesSearchBar = forwardRef<
  typeof GooglePlacesAutocomplete,
  IconTextInputProps
>(
  (
    { icon, style, lightColor, darkColor, containerStyle, ...otherProps },
    ref
  ) => {
    const theme = useColorScheme() ?? "light";

    return (
      <ThemedView
        colorType={"screenBG"}
        style={[
          {
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: getWidthnHeight(3)?.width,
            paddingVertical: getWidthnHeight(2)?.width,
            borderRadius: getWidthnHeight(3)?.width,
            elevation: 4,
            shadowColor: Colors[theme]["iconColor"],
            shadowOpacity: 0.6,
            shadowRadius: 6,
          },
          containerStyle,
        ]}
      >
        {icon && <View style={{ borderWidth: 0 }}>{icon}</View>}
        <GooglePlacesAutocomplete {...otherProps} />
      </ThemedView>
    );
  }
);

export { GooglePlacesSearchBar };
