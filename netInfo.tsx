import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { store } from "./redux/store";

type ResponseProps = {
  isConnected: boolean;
};

export const checkInternetConnectivity = async (): Promise<ResponseProps> => {
  try {
    const { isConnected } = store.getState().auth;
    return { isConnected };
  } catch (error) {
    return Promise.reject(
      new Error(`!!! checkInternetConnectivity ERROR: ${error}`)
    );
  }
};
