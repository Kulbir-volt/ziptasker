import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  UpdateTaskStatus,
  updateTaskToFirestore,
} from "../../firebase/update/updateTask";

export const getAllLeave = createAsyncThunk(
  "updateTask/details",
  async (details: UpdateTaskStatus, thunkAPI) => {
    try {
      const response = await updateTaskToFirestore(details);
      return response;
    } catch (error) {
      console.log("!!! ALL LEAVE API ERROR: ", error);
      console.error("getAllLeave Error:", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
