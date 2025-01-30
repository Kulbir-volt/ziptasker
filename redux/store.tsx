import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authSlice, { authActions } from "./slice/auth";
import userSlice from "./slice/user";
import alertSlice, { alertActions } from "./slice/slidingAlert";
import tasksSlice, { tasksActions } from "./slice/tasks";

export type RootState = ReturnType<typeof store.getState>;

//Declaring the root reducer
const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [alertSlice.name]: alertSlice.reducer,
  [tasksSlice.name]: tasksSlice.reducer,
  // [userSlice.name]: userSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        ignoredPaths: ["categories"],
      },
    }),
});

export const logoutUser = async () => {
  AsyncStorage.clear();
  store.dispatch(authActions.resetAuthSlice());
  store.dispatch(alertActions.resetAlertSlice());
  store.dispatch(tasksActions.resetTasksSlice());
  await auth().signOut();
};
