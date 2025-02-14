import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

type OptionalMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? T[K] | undefined
    : T[K];
};

export type UsersListProps = {
  id?: string;
  name?: string | undefined;
};

type InitialStateProps = {
  usersList: UsersListProps[];
};

const initialState: InitialStateProps = {
  usersList: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersList: (state, action) => {
      return {
        ...state,
        usersList: action.payload,
      };
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice;

export const userActions = userSlice.actions;
