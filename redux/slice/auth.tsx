import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: null,
  details: "",
  showMap: false,
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
  },
});

export default authSlice;

export const authActions = authSlice.actions;
