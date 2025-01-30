import { createSlice } from "@reduxjs/toolkit";
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

type InitialStateProps = {
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
  chores: VectorIconsProps<
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
  taskTypesList: [],
  chores: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskTypesList: (state, action) => {
      return {
        ...state,
        taskTypesList: action.payload,
      };
    },
    setChores: (state, action) => {
      return {
        ...state,
        chores: action.payload,
      };
    },
    resetTasksSlice: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {},
});

export default tasksSlice;

export const tasksActions = tasksSlice.actions;
