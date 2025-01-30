import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { logoutUser, store } from "../../redux/store";
import { authActions } from "../../redux/slice/auth";

export const getSavedTasksList = async () => {
  const user = auth().currentUser;
  try {
    if (user) {
      const savedTasksListRef = firestore()
        .collection("users")
        .doc(user.uid)
        .collection("tasks");
      const tasksSnapshot = await savedTasksListRef.get();
      const tasks = tasksSnapshot.docs.map((doc) => ({
        id: doc.id, // The document ID (taskId)
        ...doc.data(),
      }));
      // console.log("$$$ SAVED TASKS: ", tasks);
    } else {
      logoutUser();
      console.log("No user is logged in");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
