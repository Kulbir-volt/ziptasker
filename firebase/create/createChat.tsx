import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { logoutUser, store } from "../../redux/store";
import { verifyAuth } from "../authCheck/verifyAuth";
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";
import { checkInternetConnectivity } from "../../netInfo";

export type ChatTaskDetails = {
  tasker_image: string;
  tasker_name: string;
  title: string;
  status: string;
  budget: string;
};

type CreateChatProps = {
  id: string;
  senderId: string;
  senderName: string;
  senderImage: string;
  recipientId: string;
  text: string;
  seen: boolean;
  seenAt: null;
  taskDetails: ChatTaskDetails;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
};

export const createChat = async (task: CreateChatProps): Promise<boolean> => {
  try {
    const { isConnected } = await checkInternetConnectivity();
    if (!isConnected) {
      return Promise.reject(`No Internet.`);
    }
    const isAuthenticated = verifyAuth();
    const userId = auth().currentUser?.uid;
    if (!isAuthenticated || !userId) {
      return Promise.reject(
        new Error("User not authenticated or userId is missing.")
      );
    }
    console.log("@@@ CHAT DETAILS: ", task);
    const chatRef = firestore().collection("chats").doc(task.id);
    console.log("@@@ CHATREF: ", chatRef);

    const docRef = await chatRef.set({
      createdAt: firestore.FieldValue.serverTimestamp(),
      ...task,
    });
    return true;
  } catch (error) {
    return Promise.reject(new Error(`Save chat failed: ${error}`));
  }
};
