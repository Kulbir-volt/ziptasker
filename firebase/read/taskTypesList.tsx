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

export const getTaskTypesList = async () => {
  try {
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
    if (Array.isArray(list)) {
      store.dispatch(authActions.setTaskTypesList(list));
      // setTaskTypesList(list);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
