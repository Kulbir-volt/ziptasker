import auth from "@react-native-firebase/auth";
import { logoutUser } from "../../redux/store";

export const verifyAuth = () => {
  const user = auth().currentUser?.uid;
  const isLoggedIn = Boolean(user);
  if (!isLoggedIn) {
    logoutUser();
  }
  return isLoggedIn;
};
