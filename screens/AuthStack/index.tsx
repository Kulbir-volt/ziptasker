import React from "react";
import {
  ColorSchemeName,
  Platform,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from "@react-navigation/native";
import {
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";

import { HomePage } from "./HomePage";
import { Colors } from "../../constants/Colors";
import {
  fontSizeH2,
  fontSizeH3,
  getMarginRight,
  getWidthnHeight,
} from "../../components/width";
import { CreateTask, SaveDetailsProps } from "./CreateTask/CreateTask";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";
import { BrowseTasks } from "./BrowseStack/BrowseTasks";
import { TaskDetails } from "./BrowseStack/TaskDetails";
import { ThemedMaterialIcons } from "../../components/ThemedMaterialIcon";
import { ThemedMaterialCommunityIcons } from "../../components/ThemedMaterialCommunityIcon";
import { Account } from "./Account";
import { ThemedFontAwesome } from "../../components/ThemedFontAwesome";
import { MyTasks } from "./MyTasksStack/MyTasks";
import { Notifications } from "./Notifications";
import { Messages } from "./Messages";
import { PvtMessage } from "./PvtMessage";
import { MyTaskDetails } from "./MyTasksStack/MyTaskDetails";
import { ThemedSafe } from "../../components/ThemedSafe";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LoginResponseProps } from "../NoAuthStack/OtpVerify";
import { UserProfile } from "./UserProfile";

export type PvtMessageProps = {
  userId: string;
  recipientId: string;
  bookAgain?: boolean;
};

export type PrimaryStackParamList = {
  userProfile: undefined;
  tabs: NavigatorScreenParams<BottomTabsParamsList>;
  notifications: undefined;
  createTask?: {
    title?: string;
  };
  pvtMessage: PvtMessageProps;
};

export type BrowseTasksNavigatorParamsList = {
  browseTasks: undefined;
  taskDetails: { details: SaveDetailsProps };
};

export type MyTasksNavigatorParamsList = {
  myTasks: undefined;
  myTaskDetails: { details: SaveDetailsProps };
};

type CustomBrowseStackNavProp = StackNavigationProp<
  BrowseTasksNavigatorParamsList,
  "taskDetails"
>;

type CustomMyTaskStackNavProp = StackNavigationProp<
  MyTasksNavigatorParamsList,
  "myTaskDetails"
>;

export type CustomPrimaryStackNavProp = StackNavigationProp<
  PrimaryStackParamList,
  "pvtMessage"
>;

export type BrowseStackNavigationProps = CompositeNavigationProp<
  CompositeNavigationProp<CustomBrowseStackNavProp, CustomPrimaryStackNavProp>,
  BottomTabNavigationProp<BottomTabsParamsList>
>;

export type MyStackNavigationProps = CompositeNavigationProp<
  CompositeNavigationProp<CustomMyTaskStackNavProp, CustomPrimaryStackNavProp>,
  BottomTabNavigationProp<BottomTabsParamsList>
>;

interface TaskDetailsProps {
  id: string;
  title: string;
}

export type AuthStackParamList = {
  app: undefined;
};

export type DrawerStackParamList = {
  home: undefined;
  createTask?: {
    title?: string;
  };
  myTaskerDashboard: undefined;
  browseTasksNavigator: undefined;
};

export type TaskDetailsStackParamList = {
  taskDetails: { details: SaveDetailsProps };
};

export type MyTaskDetailsStackParamList = {
  myTaskDetails: { details: SaveDetailsProps };
};

export type DrawerNavProp = DrawerNavigationProp<
  DrawerStackParamList,
  "createTask"
>;

export type BottomTabsParamsList = {
  home: undefined;
  browseTasksNavigator: NavigatorScreenParams<BrowseTasksNavigatorParamsList>;
  myTasksNavigator: NavigatorScreenParams<MyTasksNavigatorParamsList>;
  myTaskerDashboard: undefined;
  notifications: undefined;
  messages: undefined;
  account: undefined;
};

const screenOptions = (
  nav: any,
  theme: keyof typeof Colors
): StackNavigationOptions & BottomTabNavigationOptions => {
  if (!nav) {
    return {}; // Default options when navigation is undefined
  }
  const navigation: BrowseStackNavigationProps = nav;
  return {
    headerShadowVisible: false,
    headerTitle: "Ziptasker",
    headerTitleStyle: {
      fontFamily: "DancingScript_700Bold",
      fontSize: fontSizeH3().fontSize + 4,
      color: Colors[theme]["iconColor"],
    },
    headerTitleAlign: "left",
    headerRight: () => (
      <ThemedAntDesign
        onPress={() => navigation?.navigate("notifications")}
        name={"bells"}
        size={getWidthnHeight(6)?.width}
        colorType={"iconColor"}
      />
    ),
  };
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator<BrowseTasksNavigatorParamsList>();
const MyStack = createNativeStackNavigator<MyTasksNavigatorParamsList>();
const PrimaryStack = createNativeStackNavigator<PrimaryStackParamList>();
const Tabs = createBottomTabNavigator<BottomTabsParamsList>();

export default function AuthStackNavigator() {
  const theme = useColorScheme() ?? "light";
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={"app"} component={AppNavigator} />
    </AuthStack.Navigator>
  );
}

const AppNavigator = () => {
  const { isNewUser } = useSelector((state: RootState) => state.auth);
  const theme = useColorScheme() ?? "light";
  return (
    <PrimaryStack.Navigator
      initialRouteName={isNewUser ? "userProfile" : "tabs"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <PrimaryStack.Screen
        name={"tabs"}
        component={TabsNavigator}
        options={{ headerShown: false }} // Hide header for tabs
      />
      <PrimaryStack.Screen
        name="userProfile"
        component={UserProfile}
        options={({ navigation }) => ({
          headerShadowVisible: false,
          headerTitle: "User Profile",
          headerTitleStyle: {
            fontFamily: "Cookie_400Regular",
            fontSize: fontSizeH2().fontSize + 8,
          },
          headerStyle: {
            backgroundColor: Colors[theme]["yellow"],
          },
          headerTitleAlign: "center",
          ...Platform.select({
            ios: {
              headerShown: true,
            },
          }),
        })}
      />
      <PrimaryStack.Screen
        name={"notifications"}
        component={Notifications}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Notifications",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "DancingScript_700Bold",
            fontSize: fontSizeH3().fontSize + 4,
            color: Colors[theme]["iconColor"],
          },
          // headerBackTitleVisible: false, // Hide back title (optional)
          headerLeft: () => (
            <TouchableOpacity
              style={getMarginRight(3)}
              onPress={() => navigation.goBack()}
            >
              <ThemedMaterialIcons
                name={"keyboard-backspace"}
                size={getWidthnHeight(6)?.width}
                colorType={"iconColor"}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <PrimaryStack.Screen
        name={"createTask"}
        component={CreateTask}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Create Task",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "DancingScript_700Bold",
            fontSize: fontSizeH3().fontSize + 4,
            color: Colors[theme]["iconColor"],
          },
          headerLeft: () => {
            return (
              <ThemedAntDesign
                onPress={() => {
                  navigation?.goBack();
                }}
                name={"close"}
                size={getWidthnHeight(6)?.width}
                lightColor={Colors[theme]["iconColor"]}
                darkColor={Colors[theme]["iconColor"]}
              />
            );
          },
        })}
      />
      <PrimaryStack.Screen
        name={"pvtMessage"}
        component={PvtMessage}
        options={({ navigation }) => ({
          headerShown: false,
          // headerBackTitleVisible: false, // Hide back title (optional)
          headerLeft: () => (
            <TouchableOpacity
              style={getMarginRight(3)}
              onPress={() => navigation.goBack()}
            >
              <ThemedMaterialIcons
                name={"keyboard-backspace"}
                size={getWidthnHeight(6)?.width}
                colorType={"iconColor"}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </PrimaryStack.Navigator>
  );
};

function TabsNavigator() {
  const theme = useColorScheme() ?? "light";
  return (
    <Tabs.Navigator
      initialRouteName="home"
      screenOptions={({ navigation }) => {
        if (typeof navigation === "undefined") {
          return {}; // If navigation is undefined, return default options
        }
        const options = screenOptions(navigation, theme);
        return {
          lazy: true,
          headerLeftContainerStyle: {
            paddingLeft: getWidthnHeight(3)?.width,
          },
          headerRightContainerStyle: {
            paddingRight: getWidthnHeight(3)?.width,
          },
          tabBarStyle: {
            height: getWidthnHeight(19)?.width,
            paddingTop: getWidthnHeight(1.5)?.width,
            borderWidth: 1,
            borderColor: "transparent",
          },
          ...options,
        };
      }}
    >
      <Tabs.Screen
        name={"home"}
        component={HomePage}
        options={({ navigation }) => {
          return {
            title: "Get it done",
            tabBarLabelStyle: {
              color: navigation.isFocused()
                ? Colors[theme]["iconColor"]
                : Colors[theme]["gradeOut"],
            },
            tabBarIcon: ({ focused }) => (
              <ThemedAntDesign
                name={"checkcircleo"}
                size={getWidthnHeight(6)?.width}
                colorType={focused ? "darkYellow" : "gradeOut"}
              />
            ),
          };
        }}
      />
      <Tabs.Screen
        options={({ navigation }) => {
          return {
            title: "Browse",
            tabBarLabelStyle: {
              color: navigation.isFocused()
                ? Colors[theme]["iconColor"]
                : Colors[theme]["gradeOut"],
            },
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <ThemedAntDesign
                name={"search1"}
                size={getWidthnHeight(6)?.width}
                colorType={focused ? "darkYellow" : "gradeOut"}
              />
            ),
          };
        }}
        name={"browseTasksNavigator"}
        component={BrowseTasksNavigator}
      />
      <Tabs.Screen
        name={"myTasksNavigator"}
        component={MyTasksNavigator}
        options={({ navigation }) => ({
          title: "My Tasks",
          tabBarLabelStyle: {
            color: navigation.isFocused()
              ? Colors[theme]["iconColor"]
              : Colors[theme]["gradeOut"],
          },
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <ThemedMaterialCommunityIcons
              name={"clipboard-text-outline"}
              size={getWidthnHeight(6)?.width}
              colorType={focused ? "darkYellow" : "gradeOut"}
            />
          ),
        })}
      />
      <Tabs.Screen
        name={"messages"}
        component={Messages}
        options={({ navigation }) => ({
          title: "Messages",
          headerTitle: "Private messages",
          tabBarLabelStyle: {
            color: navigation.isFocused()
              ? Colors[theme]["iconColor"]
              : Colors[theme]["gradeOut"],
          },
          tabBarIcon: ({ focused }) => (
            <ThemedMaterialCommunityIcons
              name={"message-text"}
              size={getWidthnHeight(6)?.width}
              colorType={focused ? "darkYellow" : "gradeOut"}
            />
          ),
        })}
      />
      <Tabs.Screen
        name={"account"}
        component={Account}
        options={({ navigation }) => ({
          title: "Account",
          headerTitle: "",
          headerStyle: {
            backgroundColor:
              theme === "light"
                ? Colors[theme]["yellow"]
                : Colors[theme]["background"],
          },
          tabBarLabelStyle: {
            color: navigation.isFocused()
              ? Colors[theme]["iconColor"]
              : Colors[theme]["gradeOut"],
          },
          tabBarIcon: ({ focused }) => (
            <ThemedFontAwesome
              name={"user-circle"}
              size={getWidthnHeight(6)?.width}
              colorType={focused ? "darkYellow" : "gradeOut"}
            />
          ),
        })}
      />
    </Tabs.Navigator>
  );
}

function BrowseTasksNavigator() {
  const theme = useColorScheme() ?? "light";

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="browseTasks"
        component={BrowseTasks}
        // options={({}) => ({
        //   headerLeft: () => null,
        // })}
      />
      <Stack.Screen
        name="taskDetails"
        component={TaskDetails}
        options={({ navigation }) =>
          mutualTaskDetailsHeaderStyle(theme, () => {
            navigation.goBack();
          })
        }
      />
    </Stack.Navigator>
  );
}

function MyTasksNavigator() {
  const theme = useColorScheme() ?? "light";
  return (
    <MyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MyStack.Screen
        name="myTasks"
        component={MyTasks}
        options={({}) => ({
          headerLeft: () => null,
        })}
      />
      <MyStack.Screen
        name="myTaskDetails"
        component={MyTaskDetails}
        options={({ navigation }) =>
          mutualTaskDetailsHeaderStyle(theme, () => {
            navigation.goBack();
          })
        }
      />
    </MyStack.Navigator>
  );
}

function mutualTaskDetailsHeaderStyle(
  theme: ColorSchemeName = "light",
  callback: () => void
): NativeStackNavigationOptions {
  const options: NativeStackNavigationOptions = {
    headerShown: true,
    headerShadowVisible: false,
    headerTitle: "",
    headerStyle: {
      backgroundColor: Colors[theme!]["screenBG"],
    },
    headerTitleStyle: {
      fontFamily: "DancingScript_700Bold",
      fontSize: fontSizeH3().fontSize + 4,
      color: Colors[theme!]["iconColor"],
    },
    headerTitleAlign: "left",
    headerLeft: () => {
      return (
        <ThemedMaterialIcons
          name="keyboard-backspace"
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
          onPress={callback}
        />
      );
    },
    headerRight: () => null,
  };
  return options;
}
