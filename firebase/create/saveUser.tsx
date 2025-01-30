import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { logoutUser } from "../../redux/store";

export const saveUserToFirebase = async () => {
  const user = auth().currentUser;
  try {
    if (user) {
      const userRef = firestore().collection("users").doc(user.uid);
      console.log("### user: ", user.phoneNumber);
      // Check if the user document already exists
      const userExists = (await userRef.get()).exists;
      console.log("### userExists: ", userExists);

      if (!userExists) {
        // Create a new user document
        await userRef.set({
          phoneNumber: user.phoneNumber,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log("User data saved to Firestore");
      } else {
        console.log("User document already exists");
      }
    } else {
      logoutUser();
      console.log("No user is logged in");
    }
  } catch (error) {
    console.log("!!! USER SAVE ERROR: ", error);
  }
};
