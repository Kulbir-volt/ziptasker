import { StyleSheet, Text, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { RootState, store } from "./redux/store";
import LoadingStack from "./screens/LoadingStack";
import NoAuthStackNavigator from "./screens/NoAuthStack";
import AuthStackNavigator from "./screens/AuthStack";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {}, []);

  function MainStack() {
    const { isLoggedIn }: { isLoggedIn: boolean | null } = useSelector(
      (state: RootState) => state.auth
    );
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavigationContainer>
          <BottomSheetModalProvider>
            {isLoggedIn == null && <LoadingStack />}
            {isLoggedIn == false && <NoAuthStackNavigator />}
            {isLoggedIn && <AuthStackNavigator />}
          </BottomSheetModalProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Provider store={store}>
          <PaperProvider>
            <MainStack />
          </PaperProvider>
        </Provider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
