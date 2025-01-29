import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  title: "",
  subtitle: "",
  type: "",
  timeout: 0,
};

const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      return {
        visible: action.payload?.visible,
        title: action.payload?.title,
        subtitle: action.payload?.subtitle,
        type: action.payload?.type,
        timeout: action?.payload?.timeout || 3000,
      };
    },
  },
});

export default alertSlice;

export const alertActions = alertSlice.actions;
