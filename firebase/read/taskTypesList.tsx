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
import { checkInternetConnectivity } from "../../netInfo";

export const getTaskTypesList = async () => {
  const { isConnected } = await checkInternetConnectivity();
  if (!isConnected) {
    return null;
  }
  const isAuthenticated = verifyAuth();
  if (isAuthenticated) {
    try {
      store.dispatch(tasksActions.setLoading(true));
      const taskTypesListRef = firestore()
        .collection("task_types")
        .doc("3Zu7yDVxPF5rWRqyJC89");
      const data = (await taskTypesListRef.get()).data();
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
      // console.log("$$$ taskTypesListRef: ", list);
      store.dispatch(tasksActions.setLoading(false));
      if (Array.isArray(list)) {
        store.dispatch(tasksActions.setTaskTypesList(list));
        // setTaskTypesList(list);
      }
    } catch (error) {
      store.dispatch(tasksActions.setLoading(false));
      console.error("Error fetching tasks:", error);
    }
  }
};
