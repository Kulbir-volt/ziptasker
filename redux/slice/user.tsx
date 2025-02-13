import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

export type UsersListProps = {
  id: string;
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
