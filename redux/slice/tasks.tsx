import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "@react-native-firebase/firestore";

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
import moment from "moment";

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
  myTasks: SaveDetailsProps[];
  othersTasks: SaveDetailsProps[];
  isLoading: boolean;
  comments: CommentDetailsProps[] | null;
};

const initialState: InitialStateProps = {
  taskTypesList: [],
  chores: [],
  myTasks: [],
  othersTasks: [],
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
    setMyTasks: (state, action) => {
      return {
        ...state,
        myTasks: action.payload,
      };
    },
    setOthersTasks: (state, action) => {
      return {
        ...state,
        othersTasks: action.payload,
      };
    },
    setComments: (state, action) => {
      console.log("$$$ SAVED COMMENTS: ", action.payload);
      let unsortedComments = action.payload as CommentDetailsProps[];
      const sortedComments = unsortedComments.sort((a, b) => {
        const dateA = a?.createdAt ? moment(a.createdAt) : moment(0);
        const dateB = b?.createdAt ? moment(b.createdAt) : moment(0);
        return dateB.valueOf() - dateA.valueOf();
      });
      return {
        ...state,
        comments: sortedComments,
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
