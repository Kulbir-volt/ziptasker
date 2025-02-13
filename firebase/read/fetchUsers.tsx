import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { logoutUser, store } from "../../redux/store";
import { authActions } from "../../redux/slice/auth";
import { tasksActions } from "../../redux/slice/tasks";
import { checkInternetConnectivity } from "../../netInfo";
import { userActions, UsersListProps } from "../../redux/slice/user";

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
