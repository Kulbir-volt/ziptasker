import React from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
  fontSizeH3,
  getMarginRight,
  getWidthnHeight,
} from "../../components/width";
import { CreateTask } from "./CreateTask/CreateTask";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";
import { BrowseTasks } from "./BrowseTasks";
import { TaskDetails } from "./TaskDetails";
import { ThemedMaterialIcons } from "../../components/ThemedMaterialIcon";
import { ThemedMaterialCommunityIcons } from "../../components/ThemedMaterialCommunityIcon";
import { Account } from "./Account";
import { ThemedFontAwesome } from "../../components/ThemedFontAwesome";
import { MyTasks } from "./MyTasks";
import { Notifications } from "./Notifications";
import { Messages } from "./Messages";
import { PvtMessage } from "./PvtMessage";

export type PrimaryStackParamList = {
  tabs: NavigatorScreenParams<BottomTabsParamsList>;
  notifications: undefined;
  createTask?: {
    title?: string;
  };
  pvtMessage: undefined;
};

export type BrowseTasksNavigatorParamsList = {
  browseTasks: undefined;
  taskDetails: { details: TaskDetails };
};

type CustomBrowseStackNavProp = StackNavigationProp<
  BrowseTasksNavigatorParamsList,
  "taskDetails"
>;
export type CustomPrimaryStackNavProp = StackNavigationProp<
  PrimaryStackParamList,
  "pvtMessage"
>;

export type BrowseStackNavigationProps = CompositeNavigationProp<
  CompositeNavigationProp<CustomBrowseStackNavProp, CustomPrimaryStackNavProp>,
  BottomTabNavigationProp<BottomTabsParamsList>
>;

interface TaskDetails {
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
  taskDetails: { details: TaskDetails };
};

export type DrawerNavProp = DrawerNavigationProp<
  DrawerStackParamList,
  "createTask"
>;

export type BottomTabsParamsList = {
  home: undefined;
  browseTasksNavigator: NavigatorScreenParams<BrowseTasksNavigatorParamsList>;
  myTasks: undefined;
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
  const theme = useColorScheme() ?? "light";
  return (
    <PrimaryStack.Navigator
      initialRouteName={"tabs"}
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
        name={"myTasks"}
        component={MyTasks}
        options={({ navigation }) => ({
          headerTitle: "My Tasks",
          title: "My tasks",
          headerShown: true,
          tabBarLabelStyle: {
            color: navigation.isFocused()
              ? Colors[theme]["iconColor"]
              : Colors[theme]["gradeOut"],
          },
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
        options={({}) => ({
          headerLeft: () => null,
        })}
      />
      <Stack.Screen
        name="taskDetails"
        component={TaskDetails}
        options={({ navigation }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: Colors[theme]["screenBG"],
          },
          headerTitleStyle: {
            fontFamily: "DancingScript_700Bold",
            fontSize: fontSizeH3().fontSize + 4,
            color: Colors[theme]["iconColor"],
          },
          headerTitleAlign: "left",
          headerLeft: () => {
            return (
              <ThemedMaterialIcons
                name="keyboard-backspace"
                size={getWidthnHeight(6)?.width}
                colorType={"iconColor"}
                onPress={() => navigation?.goBack()}
              />
            );
          },
          headerRight: () => null,
        })}
      />
    </Stack.Navigator>
  );
}
