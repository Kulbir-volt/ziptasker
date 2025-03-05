import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import { logoutUser, store } from "../../redux/store";
import { authActions } from "../../redux/slice/auth";
import { tasksActions } from "../../redux/slice/tasks";
import { checkInternetConnectivity } from "../../netInfo";
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";
import { verifyAuth } from "../authCheck/verifyAuth";
import { chatsActions } from "../../redux/slice/chats";

export const getAllChats = async (userId: string) => {
  const { isConnected } = await checkInternetConnectivity();
  const isAuthenticated = verifyAuth();
  if (!isConnected || !isAuthenticated) {
    return null;
  }
  try {
    const user = auth().currentUser;
    if (user) {
      store.dispatch(tasksActions.setLoading(true));
      const allChatsRef = await firestore().collection("chats");
      const senderQuery = allChatsRef
        .where("senderId", "==", userId)
        .orderBy("createdAt", "desc");

      // Fetch tasks where the user is the recipient
      const recipientQuery = allChatsRef
        .where("recipientId", "==", userId)
        .orderBy("createdAt", "desc");

      // Run both queries
      Promise.all([senderQuery.get(), recipientQuery.get()])
        .then(([senderSnapshot, recipientSnapshot]) => {
          const chats = [
            ...senderSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
            ...recipientSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          ];

          console.log("Fetched chats:", JSON.stringify(chats, null, 4));

          store.dispatch(chatsActions.setChats(chats));
        })
        .catch((error) => {
          console.error("Error fetching chats:", error);
          store.dispatch(tasksActions.setLoading(false));
        });
      // console.log("@@@ getAllChats: ", allChats);
      store.dispatch(tasksActions.setLoading(false));
    } else {
      store.dispatch(tasksActions.setLoading(false));
      logoutUser();
      console.log("No user is logged in");
    }
  } catch (error) {
    store.dispatch(tasksActions.setLoading(false));
    console.error("Error fetching tasks:", error);
  }
};
