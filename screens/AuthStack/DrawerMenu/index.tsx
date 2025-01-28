import React from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { DrawerContentScrollView } from "@react-navigation/drawer";

import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";
import { FlatList, Pressable, useColorScheme } from "react-native";
import {
  fontSizeH4,
  getMarginBottom,
  getWidthnHeight,
} from "../../../components/width";
import { Colors } from "../../../constants/Colors";
import { useDispatch } from "react-redux";
import { authActions } from "../../../redux/slice/auth";
import { userActions } from "../../../redux/slice/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerMenu: React.FC<DrawerContentComponentProps> = (props) => {
  //   console.log("@@@ PROPS: ", props.state);
  const dispatch = useDispatch();
  const routes = props.state.routes;
  const theme = useColorScheme() ?? "light";
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <ThemedView>
        <FlatList
          data={routes}
          keyExtractor={(item) => item.key}
          ListFooterComponent={() => {
            return (
              <Pressable
                onPress={() => {
                  AsyncStorage.clear();
                  dispatch(authActions.setIsLoggedIn(null));
                }}
                style={[
                  {
                    borderBottomWidth: 0.5,
                    borderBottomColor: Colors[theme]["iconColor"],
                  },
                  getMarginBottom(2),
                ]}
              >
                <ThemedView style={{ padding: getWidthnHeight(2)?.width }}>
                  <ThemedText
                    style={{
                      fontSize: fontSizeH4().fontSize + 3,
                      fontWeight: "400",
                    }}
                  >
                    Log out
                  </ThemedText>
                </ThemedView>
              </Pressable>
            );
          }}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => props.navigation.navigate(item.name)}
                style={[
                  {
                    borderBottomWidth: 0.5,
                    borderBottomColor: Colors[theme]["iconColor"],
                  },
                  getMarginBottom(2),
                ]}
              >
                <ThemedView style={{ padding: getWidthnHeight(2)?.width }}>
                  <ThemedText
                    style={{
                      fontSize: fontSizeH4().fontSize + 3,
                      fontWeight: "400",
                    }}
                  >
                    {item.name.replace(/^\w/, (c) => c.toUpperCase())}
                  </ThemedText>
                </ThemedView>
              </Pressable>
            );
          }}
        />
      </ThemedView>
    </DrawerContentScrollView>
  );
};

export { DrawerMenu };
