import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { logoutUser, store } from "../../redux/store";
import { authActions } from "../../redux/slice/auth";
import { tasksActions } from "../../redux/slice/tasks";
import { checkInternetConnectivity } from "../../netInfo";
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";

export const getTaskOffers = async (task_id: string) => {
  const { isConnected } = await checkInternetConnectivity();
  if (!isConnected || !task_id) {
    return null;
  }
  try {
    const user = auth().currentUser;
    if (user) {
      store.dispatch(tasksActions.setLoading(true));
      const taskOffersRef = firestore()
        .collection("tasks")
        .doc(task_id)
        .collection("requests");
      // .where("createdBy", "==", user.uid)
      const taskOffersSnapshot = await taskOffersRef.get();
      const taskRequests = taskOffersSnapshot.docs.map((doc) => ({
        id: doc.id, // The document ID (requestsId)
        ...doc.data(),
      }));
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
