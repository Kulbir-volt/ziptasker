import React, { useEffect, useState } from "react";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  DancingScript_400Regular,
  DancingScript_500Medium,
  DancingScript_600SemiBold,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import { GreatVibes_400Regular } from "@expo-google-fonts/great-vibes";
import { Birthstone_400Regular } from "@expo-google-fonts/birthstone";
import {
  Lexend_100Thin,
  Lexend_200ExtraLight,
  Lexend_300Light,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
  Lexend_800ExtraBold,
  Lexend_900Black,
} from "@expo-google-fonts/lexend";
import { Cookie_400Regular } from "@expo-google-fonts/cookie";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { SquadaOne_400Regular } from "@expo-google-fonts/squada-one";
import { Whisper_400Regular } from "@expo-google-fonts/whisper";
import { View, Text, ActivityIndicator, Platform } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";

import { ThemedSafe } from "../../components/ThemedSafe";
import { authActions } from "../../redux/slice/auth";
import { RootState } from "../../redux/store";
import { LoginResponseProps } from "../NoAuthStack/OtpVerify";

// Set Firestore host for the specific region
// firestore().settings({
//   host: "eur3-firestore.googleapis.com",
//   ssl: true, // Ensure SSL is enabled
//   cacheSizeBytes: firestore.CACHE_SIZE_UNLIMITED, // Optional: Set unlimited cache size
// });

export enum AppFonts {
  Inter_400Regular = "Inter_400Regular",
  Inter_500Medium = "Inter_500Medium",
  Inter_600SemiBold = "Inter_600SemiBold",
  Inter_700Bold = "Inter_700Bold",
  Inter_800ExtraBold = "Inter_800ExtraBold",
  Inter_900Black = "Inter_900Black",
  DancingScript_400Regular = "DancingScript_400Regular",
  DancingScript_500Medium = "DancingScript_500Medium",
  DancingScript_600SemiBold = "DancingScript_600SemiBold",
  DancingScript_700Bold = "DancingScript_700Bold",
  GreatVibes_400Regular = "GreatVibes_400Regular",
  Birthstone_400Regular = "Birthstone_400Regular",
  Cookie_400Regular = "Cookie_400Regular",
  Pacifico_400Regular = "Pacifico_400Regular",
  SquadaOne_400Regular = "SquadaOne_400Regular",
  Whisper_400Regular = "Whisper_400Regular",
  Lexend_100Thin = "Lexend_100Thin",
  Lexend_200ExtraLight = "Lexend_200ExtraLight",
  Lexend_300Light = "Lexend_300Light",
  Lexend_400Regular = "Lexend_400Regular",
  Lexend_500Medium = "Lexend_500Medium",
  Lexend_600SemiBold = "Lexend_600SemiBold",
  Lexend_700Bold = "Lexend_700Bold",
  Lexend_800ExtraBold = "Lexend_800ExtraBold",
  Lexend_900Black = "Lexend_900Black",
}

export const firebaseConfig = {
  apiKey: "AIzaSyArPtE4wvv9jhhWjzwHpSb3Y1GpEiCZBoc",
  authDomain: "taskermanager.firebaseapp.com",
  databaseURL: "https://taskermanager.firebaseio.com",
  projectId: "taskermanager",
  storageBucket: "taskermanager.appspot.com",
  messagingSenderId: "1041321032917",
  appId: "1:1041321032917:android:d83f90fbf2b7acc803f65c",
  // measurementId: 'G-measurement-id'
};

// if (!firebase.apps.length && Platform.OS === "ios") {
//   firebase.initializeApp(firebaseConfig);
// }

SplashScreen.preventAutoHideAsync();

// auth().settings.appVerificationDisabledForTesting = false;

function LoadingStack() {
  const dispatch = useDispatch();
  const [key, setKey] = useState(0); // Key to force component reset
  const { details, isNewUser } = useSelector((state: RootState) => state.auth);
  const [userProfileDetails, setUserProfileDetails] = useState<string | null>(
    null
  );
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold,
    GreatVibes_400Regular,
    Birthstone_400Regular,
    Cookie_400Regular,
    Pacifico_400Regular,
    SquadaOne_400Regular,
    Whisper_400Regular,
    Lexend_100Thin,
    Lexend_200ExtraLight,
    Lexend_300Light,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
    Lexend_800ExtraBold,
    Lexend_900Black,
  });

  useEffect(() => {
    if (details) {
      dispatch(authActions.setIsLoggedIn(true));
    }
  }, [details, isNewUser]);

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync()
        .then(() => {
          console.log("^^^ SPLASH LOADED ");
          checkData();
        })
        .catch((error) => console.log("!!! SPLASH ERROR: ", error));
    } else {
      // Force reload only once if fonts are not loading
      setTimeout(() => {
        setKey((prevKey) => prevKey + 1);
        SplashScreen.hideAsync()
          .then(() => {
            console.log("^^^ELSE SPLASH LOADED ");
            checkData();
          })
          .catch((error) => console.log("!!!ELSE SPLASH ERROR: ", error));
      }, 1000); // Small delay to avoid immediate re-renders
    }
    console.log("@@@ LOADER: ", loaded, error);
  }, [loaded, error]);

  const checkData = (): void => {
    AsyncStorage.getItem("userData")
      .then((userData) => {
        if (userData) {
          const parsedData: LoginResponseProps = JSON.parse(userData);
          console.log("^^^ LOADING DATA: ", parsedData);
          setUserProfileDetails(userData);
          if (!parsedData?.user?.displayName) {
            dispatch(authActions.setIsNewUser(true));
          } else {
            dispatch(authActions.setIsNewUser(false));
          }
          dispatch(authActions.setUserDetails(userData));
        } else {
          dispatch(authActions.setIsLoggedIn(false));
          //   console.log("### NO USER DATA: ", !!userData);
        }
      })
      .catch((error) => {
        __DEV__ && console.log("!!! ASYNC ERROR: ", error);
      });
  };

  if (!loaded) {
    return (
      <ThemedSafe
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size={"large"} />
      </ThemedSafe>
    );
  }

  return null;
}

export default LoadingStack;
