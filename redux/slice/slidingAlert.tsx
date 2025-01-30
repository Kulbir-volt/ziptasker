import { createSlice } from "@reduxjs/toolkit";

type AlertType = "success" | "warning" | "error" | "";

export type AlertInitialState = {
  visible: boolean;
  title: string | undefined;
  subtitle: string | undefined;
  type: AlertType;
  timeout?: number;
  marginTop?: number;
};

const initialState: AlertInitialState = {
  visible: false,
  title: "",
  subtitle: "",
  type: "",
  timeout: 3000,
  marginTop: 0,
};

const alertSlice = createSlice({
  name: "alertSlice",
  initialState,
  reducers: {
    setAlert: (state, { payload }: { payload: AlertInitialState }) => {
      return {
        ...state,
        visible: payload?.visible,
        title: payload?.title,
        subtitle: payload?.subtitle,
        type: payload?.type,
        timeout: payload.timeout,
        marginTop: payload?.marginTop === undefined ? 0 : payload.marginTop,
      };
    },
    resetAlertSlice: () => {
      return initialState;
    },
  },
});

export default alertSlice;

export const alertActions = alertSlice.actions;
