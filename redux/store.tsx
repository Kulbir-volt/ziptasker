import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import userSlice from "./slice/user";
import alertSlice from "./slice/slidingAlert";

export type RootState = ReturnType<typeof store.getState>;

//Declaring the root reducer
const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [alertSlice.name]: alertSlice.reducer,
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
