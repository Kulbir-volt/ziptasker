import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice;

export const userActions = userSlice.actions;
