import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { logoutUser } from "../../redux/store";
import { verifyAuth } from "../authCheck/verifyAuth";
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";

type UpdateTaskProps = {
  title: string;
  subtitle: string;
};

export const updateTaskToFirestore = async (
  details: SaveDetailsProps
): Promise<UpdateTaskProps> => {
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
      .collection("tasks")
      .doc(details?.id);
    const updateTask: SaveDetailsProps = {
      ...details,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    await tasksRef.update(updateTask);
    return {
      title: "Task updated successfully",
      subtitle: `#TaskID: ${details.id}`,
    };
  } catch (error) {
    return Promise.reject(new Error(`Save task failed: ${error}`));
  }
};
