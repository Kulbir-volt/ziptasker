import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { store } from "./redux/store";
import { alertActions } from "./redux/slice/slidingAlert";

export const checkInternetConnectivity = async (): Promise<boolean | null> => {
  try {
    const { isConnected } = await NetInfo.fetch();
    if (!isConnected) {
      store.dispatch(
        alertActions.setAlert({
          visible: true,
          title: "No Internet connectivity",
          subtitle: "",
          type: "error",
        })
      );
    }
    return isConnected;
  } catch (error) {
    return Promise.reject(
      new Error(`!!! checkInternetConnectivity ERROR: ${error}`)
    );
  }
};
