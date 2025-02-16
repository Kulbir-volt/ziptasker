import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import { logoutUser, store } from "../../redux/store";
import { checkInternetConnectivity } from "../../netInfo";
import { userActions, UsersListProps } from "../../redux/slice/user";
import { LoginResponseProps } from "../../screens/NoAuthStack/OtpVerify";

export const getUserList = async () => {
  const { isConnected } = await checkInternetConnectivity();
  if (!isConnected) {
    return null;
  }
  try {
    const user = auth().currentUser;
    if (user) {
      const savedUsersListRef = firestore().collection("users");
      const usersSnapshot = await savedUsersListRef.get();
      const users: UsersListProps[] = usersSnapshot.docs
        .map((doc) => ({
          id: doc.id, // The document ID (usersId)
          ...doc.data(),
        }))
        .filter((u) => u.id !== user.uid);
      console.log("^^^ SAVED USERS: ", users);
      store.dispatch(userActions.setUsersList(users));
    } else {
      logoutUser();
      console.log("No user is logged in");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

export const getUserDetails = async (uid: string): Promise<string | null> => {
  const { isConnected } = await checkInternetConnectivity();
  if (!isConnected) {
    return Promise.reject(`No Internet.`);
  }
  try {
    const user = auth().currentUser;
    if (user) {
      const savedUserRef = firestore().collection("users").doc(uid);
      const usersSnapshot = await savedUserRef.get();
      const user = usersSnapshot.data()!;
      console.log("$$$ SAVED USER: ", user);
      return JSON.stringify(user);
      // store.dispatch(userActions.setUsersList(user));
    } else {
      logoutUser();
      console.log("No user is logged in");
      return null;
    }
  } catch (error) {
    return Promise.reject(new Error(`Error fetching users: ${error}`));
  }
};
