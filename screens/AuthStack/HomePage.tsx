import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import NetInfo from "@react-native-community/netinfo";

import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { RootState } from "../../redux/store";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginHorizontal,
  getMarginRight,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { Colors } from "../../constants/Colors";
import { PrimaryInput } from "../../components/PrimaryInput";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedButton } from "../../components/Buttons/RoundButton";
import { useNavigation } from "@react-navigation/native";
import { BrowseStackNavigationProps, DrawerNavProp } from ".";
import { MessageComponent } from "../../components/MessageComponent";
import { getTaskTypesList } from "../../firebase/read/taskTypesList";
import { UserDetails } from "../../redux/slice/auth";
import { saveUserToFirebase } from "../../firebase/create/saveUser";
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
  IconType,
  IoniconsNames,
  MaterialCommunityIconsNames,
  MaterialIconsNames,
  OctIconsNames,
  SimpleLineIconsNames,
  vectorIcons,
  VectorIconsProps,
  ZocialNames,
} from "../../constants/VectorIcons";
import { alertActions } from "../../redux/slice/slidingAlert";
import { checkInternetConnectivity } from "../../netInfo";
import { getChoresList } from "../../firebase/read/choresList";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { preloadImages } from "../../firebase/create/saveComment";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomePage() {
  const dispatch = useDispatch();
  const { details } = useSelector((state: RootState) => state.auth);
  const { taskTypesList, chores, isLoading } = useSelector(
    (state: RootState) => state.tasks
  );
  const theme = useColorScheme() ?? "light";
  const [greetings, setGreetings] = useState<string>("Good morning");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [task, setTask] = useState<string | null>("");
  const [todayTasks, setTodaysTasks] = useState<
    VectorIconsProps<
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
    >[]
  >([]);
  const [choresList, setChoresList] = useState<
    VectorIconsProps<
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
    >[]
  >([]);

  const navigation = useNavigation<BrowseStackNavigationProps>();

  useEffect(() => {
    if (details) {
      const parsedDetails: UserDetails =
        typeof details === "string" ? JSON.parse(details) : details;
      console.log("###$$$ USER DETAILS: ", details, "\n\n", parsedDetails);
      if (parsedDetails?.user) {
        setUserDetails(parsedDetails);
      }
    }
  }, [details]);

  useEffect(() => {
    async function loadImage() {
      Promise.all(
        preloadImages.map((uri) => {
          if (Platform.OS === "ios") {
            return Image.getSize(uri, () => Image.prefetch(uri));
          }
          return Image.prefetch(uri);
        })
      )
        .then(() => console.log("Images preloaded"))
        .catch((err) => console.error("Error preloading images", err));
    }
    loadImage();
  }, []);

  useEffect(() => {
    async function init() {
      const isConnected = await checkInternetConnectivity();
      if (isConnected) {
        await saveUserToFirebase();
        if (taskTypesList.length === 0) {
          await getTaskTypesList();
        }
        if (chores.length === 0) {
          getChoresList();
        }
      }
    }

    init();
  }, []);

  useEffect(() => {
    if (taskTypesList.length > 0 && vectorIcons.length > 0) {
      const updateTaskTypesList = taskTypesList
        .map((item) => {
          const findItem = vectorIcons.find((subItem) => {
            return subItem.type === item.type;
          });
          if (findItem) {
            const update = Object.assign({}, findItem, item);
            return {
              ...update,
              id: `taskType#${findItem.id}-${item.uid}`,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      if (Array.isArray(updateTaskTypesList) && updateTaskTypesList !== null) {
        setTodaysTasks(updateTaskTypesList);
      }
    }
  }, [taskTypesList]);

  useEffect(() => {
    if (chores.length > 0 && vectorIcons.length > 0) {
      const updateChoresList = chores
        .map((item) => {
          const findItem = vectorIcons.find((subItem) => {
            return subItem.type === item.type;
          });
          if (findItem) {
            const update = Object.assign({}, findItem, item);
            return {
              ...update,
              id: `chores#${findItem.id}-${item.uid}`,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      if (Array.isArray(updateChoresList)) {
        // console.log("^^^ CHORES LIST: ", updateChoresList);
        setChoresList(updateChoresList);
      }
    }
  }, [chores]);

  useEffect(() => {
    const hour = moment().hour();
    if (hour < 12) {
      setGreetings("Good morning");
    } else if (hour > 12 && hour < 16) {
      setGreetings("Good afternoon");
    } else if (hour >= 16) {
      setGreetings("Good evening");
    }
  }, []);

  let color1 = Colors[theme]["primary"];
  let color2 = Colors[theme]["orange"];
  if (theme == "dark") {
    color1 = "transparent";
    color2 = "transparent";
  }
  return (
    <ThemedView
      lightColor={Colors.light.screenBG}
      darkColor={Colors.dark.screenBG}
      style={{ flex: 1, borderWidth: 0 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <View
            style={[
              {
                height: getWidthnHeight(75)?.width,
              },
            ]}
          >
            {theme === "light" && (
              <>
                <Image
                  source={require("../../assets/planner.jpg")}
                  resizeMode="cover"
                  // blurRadius={7}
                  style={[
                    {
                      // opacity: 0.25,
                      width: getWidthnHeight(100)?.width,
                      height: getWidthnHeight(75)?.width,
                    },
                    StyleSheet.absoluteFillObject,
                  ]}
                />
              </>
            )}
            <ThemedView
              lightColor={`${Colors["light"]["buttonBG"]}D0`}
              darkColor="transparent"
              style={[
                // getMarginTop(1.5),
                {
                  padding: getWidthnHeight(3)?.width,
                },
              ]}
            >
              <ThemedText
                lightColor={Colors[theme]["black"]}
                darkColor={Colors[theme]["white"]}
                style={{ fontWeight: "400" }}
              >
                {`${greetings}, ${userDetails?.user.phoneNumber || "--"}`}
              </ThemedText>
              <ThemedText
                style={[
                  fontSizeH2(),
                  {
                    // lineHeight: -1,
                    fontFamily: "SquadaOne_400Regular",
                    color: Colors[theme]["iconColor"],
                  },
                  getMarginTop(1),
                ]}
              >
                Post a task. Get it done.
              </ThemedText>
            </ThemedView>
            <View
              style={[
                {
                  flex: 1,
                  // alignItems: "center",
                  justifyContent: "space-evenly",
                  paddingHorizontal: getWidthnHeight(2)?.width,
                },
                getMarginVertical(2),
              ]}
            >
              <View
                style={[
                  {
                    backgroundColor: `${Colors[theme]["white"]}F0`,
                    borderRadius: getWidthnHeight(3)?.width,
                    borderWidth: getWidthnHeight(0.3)?.width,
                    borderColor: Colors[theme]["iconColor"],
                  },
                ]}
              >
                <PrimaryInput
                  containerStyle={{
                    backgroundColor: "transparent",
                  }}
                  style={{
                    fontSize: fontSizeH4().fontSize + 4,
                    padding: getWidthnHeight(4)?.width,
                  }}
                  placeholder="In a few words, what do you need done?"
                  placeholderTextColor={"darkGray"}
                  onChangeText={(text) => setTask(text.trimStart())}
                />
              </View>
              <View style={[getMarginTop(1.5)]}>
                <TouchableOpacity activeOpacity={0.7}>
                  <ThemedView
                    lightColor={Colors["light"]["muddy"]}
                    darkColor={Colors["dark"]["iconColor"]}
                    style={[
                      {
                        borderWidth: 1,
                        borderColor: "transparent",
                        width: "100%",
                        paddingVertical: getWidthnHeight(2)?.width,
                        paddingHorizontal: getWidthnHeight(4)?.width,
                        borderRadius: getWidthnHeight(10)?.width,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      },
                    ]}
                  >
                    <ThemedText
                      lightColor={Colors["light"]["buttonBG"]}
                      darkColor={Colors["dark"]["black"]}
                      style={{ fontWeight: "700" }}
                    >
                      Get Offers
                    </ThemedText>
                    <ThemedAntDesign
                      name={"arrowright"}
                      size={getWidthnHeight(4)?.width}
                    />
                  </ThemedView>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                {
                  flexDirection: "row",
                  borderWidth: 0,
                  borderColor: "white",
                  justifyContent: "center",
                },
                getMarginBottom(3),
              ]}
            >
              {isLoading ? (
                <LoadingIndicator size={"small"} />
              ) : (
                <FlatList
                  keyExtractor={(item) => `${item.id}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={choresList}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("createTask", {
                            title: item.title,
                          })
                        }
                      >
                        <ThemedView
                          lightColor={`${Colors[theme]["white"]}D0`}
                          darkColor={"tranparent"}
                          style={[
                            {
                              borderRadius: getWidthnHeight(10)?.width,
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: getWidthnHeight(2)?.width,
                              borderWidth: 1,
                              borderColor: Colors[theme]["iconColor"],
                            },
                            getMarginHorizontal(3),
                          ]}
                        >
                          <View
                            style={{
                              paddingHorizontal: getWidthnHeight(2)?.width,
                            }}
                          >
                            {item.icon &&
                              item.icon({
                                name: item.name,
                                iconSize: getWidthnHeight(4)?.width!,
                              })}
                          </View>
                          <ThemedText
                            style={[
                              {
                                fontSize: fontSizeH4().fontSize + 2,
                              },
                            ]}
                          >
                            {`${item.title?.slice(0, 17)}${
                              item.title && item.title?.length > 17 ? "..." : ""
                            }`}
                          </ThemedText>
                        </ThemedView>
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </View>
          </View>
          <View style={[{ flex: 1, height: "100%" }, getWidthnHeight(100)]}>
            <FlatList
              data={["homeScreen"]}
              keyExtractor={() => "homeScreenDummy"}
              renderItem={() => {
                return (
                  <View style={{ flex: 1 }}>
                    <View
                      style={[
                        {
                          paddingTop: getWidthnHeight(2)?.width,
                          paddingHorizontal: getWidthnHeight(4)?.width,
                        },
                      ]}
                    >
                      <ThemedText
                        style={[
                          {
                            fontSize: fontSizeH4().fontSize + 6,
                            fontWeight: "500",
                          },
                        ]}
                      >
                        Rebook a Tasker
                      </ThemedText>
                      <ThemedText style={[{}, fontSizeH4(), getMarginTop(0.5)]}>
                        Get a quote from Taskers you've worked with previously!
                      </ThemedText>
                      <ThemedView
                        style={[
                          {
                            paddingHorizontal: getWidthnHeight(3)?.width,
                            paddingVertical: getWidthnHeight(6)?.width,
                            borderRadius: getWidthnHeight(3)?.width,
                            shadowColor: Colors[theme]["iconColor"],
                            shadowOpacity: 0.4,
                            shadowRadius: 6,
                            elevation: 4,
                            shadowOffset: {
                              width: 0,
                              height: getWidthnHeight(0.5)?.width!,
                            },
                          },
                          getMarginVertical(2),
                        ]}
                      >
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() =>
                            navigation.navigate("pvtMessage", {
                              userId: userDetails?.user?.uid!,
                              recipientId:
                                Platform.OS === "ios"
                                  ? "pV4GUyEP74NTJ3scXuQtiaRRdej2"
                                  : "5SzWEqfmhpbvobUTeebwetES2UE3",
                              bookAgain: true,
                            })
                          }
                        >
                          <MessageComponent
                            title={"Ruchit D."}
                            numberOfLines={1}
                            showDate={false}
                          />
                        </TouchableOpacity>
                      </ThemedView>
                    </View>
                    <View
                      style={[
                        {
                          flex: 1,
                          paddingHorizontal: getWidthnHeight(2)?.width,
                          // paddingTop: getMarginTop(1).marginTop,
                        },
                      ]}
                    >
                      <ThemedText
                        style={[
                          {
                            fontSize: fontSizeH4().fontSize + 6,
                            fontWeight: "500",
                          },
                          getMarginHorizontal(2),
                        ]}
                      >
                        Need something done ?
                      </ThemedText>
                      <ThemedText
                        style={[
                          getMarginHorizontal(2),
                          fontSizeH4(),
                          getMarginTop(0.5),
                        ]}
                      >
                        To-do list never getting shorter ? Take the burden off
                        and find the help you need on Ziptasker.
                      </ThemedText>
                      {isLoading ? (
                        <LoadingIndicator
                          size={"large"}
                          colorType={"black"}
                          style={[getMarginTop(5)]}
                        />
                      ) : (
                        <View
                          style={{
                            alignItems: "center",
                          }}
                        >
                          <FlatList
                            data={todayTasks}
                            numColumns={2}
                            nestedScrollEnabled
                            keyExtractor={(item) => `${item.id}`}
                            renderItem={({ item }) => {
                              // console.log("### ICON: ", item.icon);
                              return (
                                <Pressable
                                  style={({ pressed }) => ({
                                    opacity: pressed ? 0.9 : 1,
                                  })}
                                  onPress={() => {
                                    navigation.navigate("createTask", {
                                      title: item.title,
                                    });
                                  }}
                                >
                                  <ThemedView
                                    style={{
                                      width: getWidthnHeight(42)?.width!,
                                      height: getWidthnHeight(28)?.width!,
                                      alignItems: "center",
                                      justifyContent: "center",
                                      borderRadius: getWidthnHeight(3)?.width!,
                                      shadowColor: Colors[theme]["iconColor"],
                                      shadowOpacity: 0.4,
                                      shadowRadius: 6,
                                      elevation: 4,
                                      shadowOffset: {
                                        width: 0,
                                        height: getWidthnHeight(0.5)?.width!,
                                      },
                                      margin: getWidthnHeight(2.5)?.width!,
                                      borderWidth: 1,
                                      borderColor:
                                        theme === "dark"
                                          ? Colors[theme]["white"]
                                          : "transparent",
                                      backgroundColor: Colors[theme]["white"],
                                    }}
                                  >
                                    {item.icon &&
                                      item?.icon({
                                        name: item.name,
                                        iconSize: item.iconSize!,
                                      })}
                                    <ThemedText numberOfLines={1}>
                                      {item.title}
                                    </ThemedText>
                                  </ThemedView>
                                </Pressable>
                              );
                            }}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                );
              }}
            />
            {/* <View style={{ flex: 1, height: "100%" }}>
              <ThemedView
                lightColor={`${Colors[theme]["primary"]}3F`}
                darkColor={"transparent"}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ThemedText style={[getMarginTop(2)]}>
                  Can't find what you need ?
                </ThemedText>
                <ThemedButton
                  title="Post a task & get offers"
                  lightColor={Colors[theme]["primary"]}
                  style={[
                    { paddingHorizontal: getWidthnHeight(3)?.width },
                    getMarginVertical(1),
                  ]}
                />
              </ThemedView>
            </View> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}

export { HomePage };
