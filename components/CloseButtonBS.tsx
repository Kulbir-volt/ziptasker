import React from "react";
import { View } from "react-native";
import { getWidthnHeight } from "./width";
import { ThemedAntDesign } from "./ThemedAntDesign";

type CloseButtonBSProps = {
  onPress?: () => void;
};

const CloseButtonBS: React.FC<CloseButtonBSProps> = ({ onPress }) => {
  return (
    <View
      style={{
        width: getWidthnHeight(10)?.width,
        height: getWidthnHeight(10)?.width,
        borderRadius: getWidthnHeight(5)?.width,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemedAntDesign
        name={"close"}
        onPress={onPress}
        colorType={"white"}
        size={getWidthnHeight(6)?.width}
      />
    </View>
  );
};

export { CloseButtonBS };
