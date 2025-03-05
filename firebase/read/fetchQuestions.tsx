import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { logoutUser, store } from "../../redux/store";
import { authActions } from "../../redux/slice/auth";
import { tasksActions } from "../../redux/slice/tasks";
import { checkInternetConnectivity } from "../../netInfo";

export const getSavedQuestions = async (task_id: string) => {
  const { isConnected } = await checkInternetConnectivity();
  if (!isConnected) {
    return null;
  }
  try {
    const user = auth().currentUser;
    if (user) {
      const savedCommentsListRef = firestore()
        .collection("tasks")
        .doc(task_id)
        .collection("questions");
      const commentsSnapshot = await savedCommentsListRef.get();
      const comments = commentsSnapshot.docs.map((doc) => ({
        id: doc.id, // The document ID (commentId)
        ...doc.data(),
      }));
      // console.log("@@@ SAVED COMMENTS: ", comments);
      store.dispatch(tasksActions.setComments(comments));
    } else {
      logoutUser();
      console.log("No user is logged in");
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};
