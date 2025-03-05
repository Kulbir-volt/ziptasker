import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { logoutUser, store } from "../../redux/store";
import { verifyAuth } from "../authCheck/verifyAuth";
import { SaveDetailsProps } from "../../screens/AuthStack/CreateTask/CreateTask";
import { checkInternetConnectivity } from "../../netInfo";
import { SubmitTaskRequestProps } from "../../screens/AuthStack/BrowseStack/TaskDetails";
import { alertActions } from "../../redux/slice/slidingAlert";

type ReturnResponse = {
  status?: boolean;
  offerRef: FirebaseFirestoreTypes.DocumentReference;
};

export const saveTaskRequest = async (
  details: SubmitTaskRequestProps
): Promise<ReturnResponse> => {
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
    const offerRef = firestore()
      .collection("tasks")
      .doc(details?.task_id)
      .collection("offers");
    const newOffer: SubmitTaskRequestProps = {
      ...details,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await offerRef.add(newOffer);
    store.dispatch(
      alertActions.setAlert({
        visible: true,
        title: "Offer submitted",
        subtitle: `#Offer ID: ${docRef?.id}`,
        type: "success",
        timeout: 4000,
      })
    );
    return {
      offerRef: docRef,
    };
  } catch (error) {
    store.dispatch(
      alertActions.setAlert({
        visible: true,
        title: "Error",
        subtitle: "Failed to submit offer",
        type: "error",
        timeout: 4000,
      })
    );
    return Promise.reject(new Error(`Save task failed: ${error}`));
  }
};
