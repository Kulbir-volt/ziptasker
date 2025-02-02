import React, { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { ThemedView } from "./ThemedView";
import { fontSizeH4, getMarginLeft, getWidthnHeight } from "./width";
import { ThemedIonicons } from "./ThemedIonicons";
import { ThemedText } from "./ThemedText";
import { LocationDetails } from "../screens/AuthStack/CreateTask/CreateTask";

type LocationTileProps = TouchableOpacityProps & {
  item: LocationDetails;
  icon?: ReactNode;
};

const LocationTile: React.FC<LocationTileProps> = ({
  item,
  icon = (
    <ThemedIonicons
      name={"location-sharp"}
      colorType={"iconColor"}
      size={getWidthnHeight(7)?.width}
    />
  ),
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <ThemedView
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: getWidthnHeight(2)?.width,
          },
        ]}
      >
        {icon}
        <ThemedText
          style={[
            {
              fontSize: fontSizeH4().fontSize + 4,
              borderWidth: 0,
              width: "90%",
            },
            getMarginLeft(1),
          ]}
          numberOfLines={1}
        >
          {item.description}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

export { LocationTile };
