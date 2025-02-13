import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { logoutUser, store } from "../../redux/store";
import { verifyAuth } from "../authCheck/verifyAuth";
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";
import { checkInternetConnectivity } from "../../netInfo";

export const saveTask = async (
  details: SaveDetailsProps
): Promise<FirebaseFirestoreTypes.DocumentReference> => {
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
    const tasksRef = firestore().collection("tasks");
    const newTask: SaveDetailsProps = {
      ...details,
      createdBy: userId,
      userId: userId,
    };

    const docRef = await tasksRef.add(newTask);
    return docRef;
  } catch (error) {
    return Promise.reject(new Error(`Save task failed: ${error}`));
  }
};
