import firestore from "@react-native-firebase/firestore";

import { store } from "../../redux/store";
import {
  AntDesignNames,
  EntypoNames,
  EvilIconsNames,
  FeatherNames,
  FontAwesome5Names,
  FontAwesome6Names,
  FontAwesomeNames,
  FontistoNames,
  FoundationNames,
  IoniconsNames,
  MaterialCommunityIconsNames,
  MaterialIconsNames,
  OctIconsNames,
  SimpleLineIconsNames,
  VectorIconsProps,
  ZocialNames,
} from "../../constants/VectorIcons";
import { tasksActions } from "../../redux/slice/tasks";
import { verifyAuth } from "../authCheck/verifyAuth";
import { checkInternetConnectivity } from "../../netInfo";

export const getChoresList = async () => {
  const { isConnected } = await checkInternetConnectivity();
  if (!isConnected) {
    return null;
  }
  const isAuthenticated = verifyAuth();
  if (isAuthenticated) {
    try {
      store.dispatch(tasksActions.setLoading(true));
      const choresListRef = firestore()
        .collection("chores")
        .doc("MfT7YvcdO3ZuLZcEquNO");
      const data = (await choresListRef.get()).data();
      const list: VectorIconsProps<
        | FontAwesomeNames
        | FontAwesome5Names
        | FontAwesome6Names
        | FontistoNames
        | FoundationNames
        | MaterialIconsNames
        | IoniconsNames
        | AntDesignNames
        | EntypoNames
        | EvilIconsNames
        | FeatherNames
        | MaterialCommunityIconsNames
        | OctIconsNames
        | ZocialNames
        | SimpleLineIconsNames
      >[] = data?.list;
      // console.log("$$$ choresListRef: ", list);
      store.dispatch(tasksActions.setLoading(false));
      if (Array.isArray(list)) {
        store.dispatch(tasksActions.setChores(list));
      }
    } catch (error) {
      store.dispatch(tasksActions.setLoading(false));
      console.error("Error fetching tasks:", error);
    }
  }
};
