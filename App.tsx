import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, useColorScheme } from "react-native";
import { addEventListener } from "@react-native-community/netinfo";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { RootState, store } from "./redux/store";
import LoadingStack from "./screens/LoadingStack";
import NoAuthStackNavigator from "./screens/NoAuthStack";
import AuthStackNavigator from "./screens/AuthStack";
import { StatusBar } from "expo-status-bar";
import { SlidingAlert } from "./components/Alert/SlidingAlert";
import { authActions } from "./redux/slice/auth";
import { NetinfoAlert } from "./components/Alert/NetInfoAlert";

export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {}, []);

  function MainStack() {
    const dispatch = useDispatch();

    const { isLoggedIn }: { isLoggedIn: boolean | null } = useSelector(
      (state: RootState) => state.auth
    );

    useEffect(() => {
      // Subscribe
      const unsubscribe = addEventListener((state) => {
        console.log("Is connected?", state.isConnected);
        dispatch(authActions.setIsConnected(state.isConnected));
      });

      return () => unsubscribe();
    }, []);

    return (
      <NavigationContainer>
        <StatusBar style="dark" />
        <BottomSheetModalProvider>
          {isLoggedIn == null && <LoadingStack />}
          {isLoggedIn == false && <NoAuthStackNavigator />}
          {isLoggedIn && <AuthStackNavigator />}
        </BottomSheetModalProvider>
        <SlidingAlert />
        <NetinfoAlert />
      </NavigationContainer>
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
