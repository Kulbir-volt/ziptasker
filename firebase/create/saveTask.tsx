import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { logoutUser } from "../../redux/store";
import { verifyAuth } from "../authCheck/verifyAuth";
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";

export const saveTask = async (
  details: SaveDetailsProps
): Promise<FirebaseFirestoreTypes.DocumentReference> => {
  try {
    const isAuthenticated = verifyAuth();
    const userId = auth().currentUser?.uid;
    if (!isAuthenticated || !userId) {
      return Promise.reject(
        new Error("User not authenticated or userId is missing.")
      );
    }
    const tasksRef = firestore()
      .collection("users")
      .doc(userId)
      .collection("tasks");
    const newTask: SaveDetailsProps = {
      ...details,
      createdBy: userId,
    };

    const docRef = await tasksRef.add(newTask);
    return docRef;
  } catch (error) {
    return Promise.reject(new Error(`Save task failed: ${error}`));
  }
};
