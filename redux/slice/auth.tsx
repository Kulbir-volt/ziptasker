import { createSlice } from "@reduxjs/toolkit";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import {
  AntDesignNames,
  EntypoNames,
  EvilIconsNames,
  FeatherNames,
  FontAwesome5Names,
  FontAwesome6Names,
  FontAwesomeNames,
  FontistoNames,
  FoundationNames,
  IoniconsNames,
  MaterialCommunityIconsNames,
  MaterialIconsNames,
  OctIconsNames,
  SimpleLineIconsNames,
  VectorIconsProps,
  ZocialNames,
} from "../../constants/VectorIcons";

export type UserDetails = FirebaseAuthTypes.UserCredential & {
  name?: string;
};

type InitialStateProps = {
  isLoggedIn: boolean | null;
  details: UserDetails | null | string;
  showMap: boolean;
  taskTypesList: VectorIconsProps<
    | FontAwesomeNames
    | FontAwesome5Names
    | FontAwesome6Names
    | FontistoNames
    | FoundationNames
    | MaterialIconsNames
    | IoniconsNames
    | AntDesignNames
    | EntypoNames
    | EvilIconsNames
    | FeatherNames
    | MaterialCommunityIconsNames
    | OctIconsNames
    | ZocialNames
    | SimpleLineIconsNames
  >[];
};

const initialState: InitialStateProps = {
  isLoggedIn: null,
  details: null,
  showMap: false,
  taskTypesList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    },
    resetUserDetails: () => {
      return initialState;
    },
    setUserDetails: (state, action) => {
      return {
        ...state,
        details: action.payload,
      };
    },
    setShowMap: (state, action) => {
      return {
        ...state,
        showMap: action.payload,
      };
    },
    setTaskTypesList: (state, action) => {
      return {
        ...state,
        taskTypesList: action.payload,
      };
    },
  },
});

export default authSlice;

export const authActions = authSlice.actions;
