import storage, { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { verifyAuth } from "../authCheck/verifyAuth";

export const saveImagesToFirebase = async (
  path: string,
  image: string,
  callback: (value: string) => void
): Promise<string> => {
  try {
    const isAuthenticated = verifyAuth();
    if (isAuthenticated) {
      const storageRef = storage().ref(path);
      const task = storageRef.putFile(image);

      // Monitor the upload
      task.on("state_changed", (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
        );
        const percentValue =
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100;
        callback(`${percentValue}%`);
      });

      await task;

      const url = await storageRef.getDownloadURL();

      return url;
    } else {
      return Promise.reject(`No user logged in.`);
    }
  } catch (error) {
    return Promise.reject(new Error(`!!!Save image failed: ${error}`));
  }
};
