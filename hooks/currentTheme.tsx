import { useColorScheme } from "react-native";

export default function currentTheme() {
  return useColorScheme() ?? "light";
}
