import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { logoutUser, store } from "../../redux/store";
import { verifyAuth } from "../authCheck/verifyAuth";
import {
  SaveDetailsProps,
  StatusTypes,
} from "../../screens/AuthStack/CreateTask/CreateTask";
import { checkInternetConnectivity } from "../../netInfo";
import { alertActions } from "../../redux/slice/slidingAlert";

type UpdateTaskProps = {
  title: string;
  subtitle: string;
};

export type UpdateTaskStatus = {
  id: string;
  status: StatusTypes;
  updatedAt?: FirebaseFirestoreTypes.FieldValue;
  assignedTo: string;
  assignedOn?: FirebaseFirestoreTypes.FieldValue;
};

export const updateTaskToFirestore = async <
  T extends SaveDetailsProps | UpdateTaskStatus
>(
  details: T
): Promise<UpdateTaskProps> => {
  try {
    const { isConnected } = await checkInternetConnectivity();
    if (!isConnected) {
      return Promise.reject(new Error("No internet."));
    }
    const isAuthenticated = verifyAuth();
    const userId = auth().currentUser?.uid;
    if (!isAuthenticated || !userId) {
      logoutUser();
      return Promise.reject(
        new Error("User not authenticated or userId is missing.")
      );
    }
    const tasksRef = firestore().collection("tasks").doc(details?.id);
    let updateTask;
    if (details?.status !== "posted") {
      updateTask = {
        ...details,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      } as UpdateTaskStatus;
      if (details?.status === "assigned") {
        // Object.assign(updateTask, {
        //   assignedOn: firestore.FieldValue.serverTimestamp(),
        // });
      }
    } else {
      updateTask = {
        ...details,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      } as SaveDetailsProps;
    }

    await tasksRef.update(updateTask);
    return {
      title: "Task updated successfully",
      subtitle: `#TaskID: ${details.id}`,
    };
  } catch (error) {
    store.dispatch(
      alertActions.setAlert({
        visible: true,
        title: "Error",
        subtitle: "An error occured while assigning the task",
        type: "error",
        timeout: 4000,
      })
    );
    return Promise.reject(new Error(`Save task failed: ${error}`));
  }
};
