import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { logoutUser, store } from "../../redux/store";
import { authActions } from "../../redux/slice/auth";
import { tasksActions } from "../../redux/slice/tasks";
import { checkInternetConnectivity } from "../../netInfo";
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";

export const getSavedTasksList = async () => {
  const { isConnected } = await checkInternetConnectivity();
  if (!isConnected) {
    return null;
  }
  try {
    const user = auth().currentUser;
    if (user) {
      store.dispatch(tasksActions.setLoading(true));
      const savedTasksListRef = firestore()
        .collection("tasks")
        .orderBy("createdAt", "desc");
      // .where("createdBy", "==", user.uid)
      const tasksSnapshot = await savedTasksListRef.get();
      const allTasks = tasksSnapshot.docs.map((doc) => ({
        id: doc.id, // The document ID (taskId)
        ...doc.data(),
      })) as SaveDetailsProps[];
      const myTasks = allTasks.filter((task) => task.createdBy === user.uid);
      const othersTasks = allTasks.filter(
        (task) => task.createdBy !== user.uid
      );
      store.dispatch(tasksActions.setLoading(false));
      store.dispatch(tasksActions.setMyTasks(myTasks));
      store.dispatch(tasksActions.setOthersTasks(othersTasks));
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
