import { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";

import { useThemeColor } from "../hooks/useThemeColor";
import { Colors } from "../constants/Colors";

export type ThemedBSViewProps = BottomSheetViewProps & {
  lightColor?: string;
  darkColor?: string;
};

interface ColorTypeProps extends ThemedBSViewProps {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
}

export function ThemedBSView({
  style,
  lightColor,
  darkColor,
  colorType = "background",
  ...otherProps
}: ColorTypeProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType
  );

  return (
    <BottomSheetView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
