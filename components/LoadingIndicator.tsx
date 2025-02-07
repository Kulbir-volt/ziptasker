import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";
import { getWidthnHeight } from "./width";

type IndicatorSize = "small" | "large";
interface LoadingIndicatorProps {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  size?: IndicatorSize;
  style?: StyleProp<ViewStyle>;
}

const LoadingIndicator = ({
  colorType = "white",
  size = "large",
  style,
}: LoadingIndicatorProps) => {
  return <ActivityIndicator color={colorType} size={size} style={style} />;
};

export { LoadingIndicator };
