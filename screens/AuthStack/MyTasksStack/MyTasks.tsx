import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { FlatList, View } from "react-native";
import { Menu } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import { ThemedSafe } from "../../../components/ThemedSafe";
import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";
import {
  fontSizeH3,
  getMarginTop,
  getWidthnHeight,
} from "../../../components/width";
import { RoundedDropdown } from "../../../components/RoundedDropdown";
import { useColorScheme } from "react-native";
import { Colors } from "../../../constants/Colors";
import { TaskCard } from "../../../components/TaskCard";
import { BrowseStackNavigationProps, MyStackNavigationProps } from "..";
import { logoutUser, RootState } from "../../../redux/store";
import { getSavedTasksList } from "../../../firebase/read/savedTasks";
import { ThemedAntDesign } from "../../../components/ThemedAntDesign";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { SaveDetailsProps } from "../CreateTask/CreateTask";
import { UserDetails } from "../../../redux/slice/auth";
import { verifyAuth } from "../../../firebase/authCheck/verifyAuth";
import { tasksActions } from "../../../redux/slice/tasks";

const MyTasks: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const dispatch = useDispatch();
  const { details } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.tasks);
  const navigation = useNavigation<MyStackNavigationProps>();
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("All tasks");
  const [myTasks, setMyTasks] = useState<SaveDetailsProps[]>();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const tasksRef = firestore().collection("tasks");

  useEffect(() => {
    const parsedDetails: UserDetails = JSON.parse(details as string);
    setUserDetails(parsedDetails);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (!userDetails?.user?.uid) return;
      console.log("^^^ MY TASKS USER DETAILS: ", userDetails?.user?.uid);
      if (!userDetails?.user?.uid) return;
      const unsubscribe = tasksRef
        .orderBy("createdAt", "desc")
        .where("createdBy", "==", userDetails?.user?.uid)
        .onSnapshot(
          (snapshot) => {
            if (!snapshot?.empty) {
              const allTasks: SaveDetailsProps[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as SaveDetailsProps[];
              console.log("^^^ MY TASKS: ", allTasks);
              setMyTasks(allTasks);
            } else {
              console.log("^^^ MY TASKS EMPTY: ", snapshot.empty);
              setMyTasks([]);
            }
          },
          (error) => {
            console.log("!!! MY TASKS SNAPSHOT ERROR: ", error);
          }
        );

      return () => unsubscribe();
    }, [userDetails?.user?.uid])
  );

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const menuItems = [
    {
      id: "1",
      name: "All tasks",
    },
    {
      id: "2",
      name: "Posted",
    },
    {
      id: "3",
      name: "Assigned",
    },
    {
      id: "4",
      name: "Booking Requests",
    },
    {
      id: "5",
      name: "Offered",
    },
    {
      id: "6",
      name: "Completed",
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerTitle: "My Tasks",
      headerTitleStyle: {
        fontFamily: "DancingScript_700Bold",
        fontSize: fontSizeH3().fontSize + 4,
        color: Colors[theme]["iconColor"],
      },
      headerTitleAlign: "left",
      headerLeft: () => null,
      headerRight: () => (
        <ThemedAntDesign
          onPress={() => navigation?.navigate("notifications")}
          name={"bells"}
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
        />
      ),
    });
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{ paddingHorizontal: getWidthnHeight(3)?.width, borderWidth: 0 }}
      >
        <View style={{ borderWidth: 0, alignItems: "flex-start" }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={{
              marginTop: getMarginTop(5).marginTop,
              backgroundColor: Colors[theme]["background"],
            }}
            anchor={
              <RoundedDropdown
                onPress={openMenu}
                title={selectedItem}
                style={{
                  // borderWidth: 1,
                  alignSelf: "center",
                  paddingHorizontal: getWidthnHeight(3)?.width,
                  paddingVertical: getWidthnHeight(1)?.width,
                  borderRadius: getWidthnHeight(10)?.width,
                }}
              />
            }
          >
            {menuItems.map((menu, index) => {
              return (
                <Menu.Item
                  key={`${index}.${menu.id}`}
                  title={menu.name}
                  onPress={() => {
                    setSelectedItem(menu.name);
                    closeMenu();
                  }}
                />
              );
            })}
          </Menu>
        </View>
      </ThemedView>
      <ThemedView
        style={[
          { flex: 1 },
          isLoading && { alignItems: "center", justifyContent: "center" },
        ]}
        lightColor={Colors[theme]["commonScreenBG"]}
        darkColor={Colors[theme]["background"]}
      >
        {isLoading ? (
          <LoadingIndicator size={"large"} colorType={"black"} />
        ) : (
          <FlatList
            data={myTasks}
            keyExtractor={(item) => item.id!}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    {
                      paddingHorizontal: getWidthnHeight(3)?.width,
                      paddingVertical: getWidthnHeight(2)?.width,
                      borderWidth: 1,
                      borderColor: "transparent",
                    },
                    getMarginTop(index === 0 ? 1 : 0),
                  ]}
                >
                  <TaskCard
                    task={item}
                    onPress={() =>
                      navigation.navigate("myTaskDetails", {
                        details: item,
                      })
                    }
                  />
                </View>
              );
            }}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
};

export { MyTasks };
