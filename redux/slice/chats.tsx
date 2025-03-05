import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { ChatTaskDetails } from "../../firebase/create/createChat";

export type ChatsProps = {
  id: string;
  senderId: string;
  senderName: string;
  senderImage: string;
  recipientId: string;
  text: string;
  seen: boolean;
  seenAt: null;
  taskDetails: ChatTaskDetails;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

type InitialState = {
  chats: ChatsProps[];
};

const initialState: InitialState = {
  chats: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      return {
        ...state,
        chats: action.payload,
      };
    },
    resetChats: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {},
});

export default chatsSlice;

export const chatsActions = chatsSlice.actions;
