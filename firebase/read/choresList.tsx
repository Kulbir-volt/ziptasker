import firestore from "@react-native-firebase/firestore";

import { store } from "../../redux/store";
import { authActions } from "../../redux/slice/auth";
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

export const getChoresList = async () => {
  const isAuthenticated = verifyAuth();
  if (isAuthenticated) {
    try {
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
      if (Array.isArray(list)) {
        store.dispatch(tasksActions.setChores(list));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
};
