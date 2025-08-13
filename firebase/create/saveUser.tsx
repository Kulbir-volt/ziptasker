import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { logoutUser } from "../../redux/store";
import { checkInternetConnectivity } from "../../netInfo";
import { LoggedInUserDetailsProps } from "../../screens/NoAuthStack/OtpVerify";

export const saveUserToFirebase = async (
  userDetails: LoggedInUserDetailsProps
): Promise<boolean> => {
  const { isConnected } = await checkInternetConnectivity();
  if (!isConnected) {
    return Promise.reject(`No Internet.`);
  }
  const user = auth().currentUser;
  try {
    if (user) {
      const userRef = firestore().collection("users").doc(user.uid);
      // Check if the user document already exists
      const userExists = (await userRef.get()).exists;

      // Create a new user document
      await userRef.set(
        {
          ...userDetails,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        {
          merge: true, // Use merge to update existing fields or create new ones
        }
      );
      console.log("User data saved to Firestore");
      return true;
    } else {
      logoutUser();
      console.log("No user is logged in");
      return false;
    }
  } catch (error) {
    console.log("!!! USER SAVE ERROR: ", error);
    return Promise.reject(
      new Error(`!!!Failed to save user details: ${error}`)
    );
  }
};
