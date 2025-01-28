import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";
import { Colors } from "../constants/Colors";
import { fontSizeH4 } from "./width";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  colorType = "text",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType
  );

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: fontSizeH4().fontSize,
    // lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    // lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    // lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    // lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
