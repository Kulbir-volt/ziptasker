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
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";
import { CommentDetailsProps } from "../../screens/AuthStack/MyTasksStack/MyTaskDetails";

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
  savedTasks: SaveDetailsProps[];
  isLoading: boolean;
  comments: CommentDetailsProps[] | null;
};

const initialState: InitialStateProps = {
  taskTypesList: [],
  chores: [],
  savedTasks: [],
  isLoading: false,
  comments: [],
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
    setSavedTasks: (state, action) => {
      return {
        ...state,
        savedTasks: action.payload,
      };
    },
    setComments: (state, action) => {
      console.log("$$$ SAVED COMMENTS: ", action.payload);
      return {
        ...state,
        comments: action.payload,
      };
    },
    resetTasksSlice: () => {
      return initialState;
    },
    setLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
  extraReducers: (builder) => {},
});

export default tasksSlice;

export const tasksActions = tasksSlice.actions;
