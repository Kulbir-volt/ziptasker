import React, { useEffect, useState } from "react";
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
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import NetInfo from "@react-native-community/netinfo";

import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { ThemedSafe } from "../../components/ThemedSafe";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginHorizontal,
  getMarginRight,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import { PrimaryInput } from "../../components/PrimaryInput";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedButton } from "../../components/Buttons/RoundButton";
import { useNavigation } from "@react-navigation/native";
import { BrowseStackNavigationProps, DrawerNavProp } from ".";
import { MessageComponent } from "../../components/MessageComponent";

function HomePage() {
  const { details }: { details: string } = useSelector(
    (state: RootState) => state.auth
  );
  const theme = useColorScheme() ?? "light";
  const [hourHand, setHourHand] = useState<number | null>(null);
  const [greetings, setGreetings] = useState<string>("Good morning");
  const [task, setTask] = useState<string | null>("");
  const navigation = useNavigation<BrowseStackNavigationProps>();

  const chores = [
    {
      id: "1",
      icon: (
        <FontAwesome5
          name={"truck"}
          size={getWidthnHeight(4)?.width}
          color={Colors[theme]["iconColor"]}
        />
      ),
      title: "Help me move home",
    },
    {
      id: "2",
      icon: (
        <FontAwesome5
          name={"recycle"}
          size={getWidthnHeight(4)?.width}
          color={Colors[theme]["iconColor"]}
        />
      ),
      title: "End of lease cleaning",
    },
    {
      id: "3",
      icon: (
        <Ionicons
          name="fast-food"
          size={getWidthnHeight(4)?.width}
          color={Colors[theme]["iconColor"]}
        />
      ),
      title: "Cook, for family gathering",
    },
  ];

  const todayTasks = [
    {
      id: "todayTasks1",
      icon: (
        <MaterialCommunityIcons
          name={"table-furniture"}
          size={getWidthnHeight(6)?.width}
          color={Colors[theme]["iconColor"]}
        />
      ),
      title: "Furniture Assembly",
    },
    {
      id: "todayTasks2",
      icon: (
        <MaterialCommunityIcons
          name={"brush-variant"}
          size={getWidthnHeight(6)?.width}
          color={Colors[theme]["iconColor"]}
        />
      ),
      title: "Handyman",
    },
    {
      id: "todayTasks3",
      icon: (
        <FontAwesome
          name="tasks"
          size={getWidthnHeight(6)?.width}
          color={Colors[theme]["iconColor"]}
        />
      ),
      title: "Anything",
    },
  ];

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        console.error(
          "No internet connection. Firestore requires an active network."
        );
      } else {
        saveUserData();
      }
    });
  }, []);

  const saveUserData = async () => {
    const user = auth().currentUser;
    try {
      if (user) {
        const userRef = firestore().collection("users").doc(user.uid);
        console.log("### user: ", user.phoneNumber);
        // Check if the user document already exists
        const userExists = (await userRef.get()).exists;
        console.log("### userExists: ", userExists);

        if (!userExists) {
          // Create a new user document
          await userRef.set({
            phoneNumber: user.phoneNumber,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
          console.log("User data saved to Firestore");
        } else {
          console.log("User document already exists");
        }
      } else {
        console.log("No user is logged in");
      }
    } catch (error) {
      console.log("!!! USER SAVE ERROR: ", error);
    }
  };

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
  // "#FF9D3D"
  const fullName = details ? JSON.parse(details) : { name: "Shivam Kansal" };
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
      <View
        style={[
          {
            height: getWidthnHeight(75)?.width,
          },
        ]}
      >
        {theme === "light" && (
          <Image
            source={require("../../assets/planner.jpg")}
            resizeMode="cover"
            style={[
              {
                // opacity: 0.25,
                width: getWidthnHeight(100)?.width,
                height: getWidthnHeight(75)?.width,
              },
              StyleSheet.absoluteFillObject,
            ]}
          />
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
            {`${greetings}, ${fullName?.name?.split(" ")[0] || "--"}`}
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
              padding: getWidthnHeight(3)?.width,
            },
            getMarginTop(2.5),
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
                margin: getWidthnHeight(2)?.width,
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
              alignItems: "center",
              justifyContent: "center",
            },
            getMarginTop(0.5),
          ]}
        >
          <FlatList
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={chores}
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
                      style={{ paddingHorizontal: getWidthnHeight(2)?.width }}
                    >
                      {item.icon}
                    </View>
                    <ThemedText
                      style={[
                        {
                          fontSize: fontSizeH4().fontSize + 2,
                        },
                      ]}
                    >
                      {item.title}
                    </ThemedText>
                  </ThemedView>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <View style={[{ flex: 1, height: "100%" }, getWidthnHeight(100)]}>
        <ScrollView
          nestedScrollEnabled
          style={{ borderWidth: 0, borderColor: "red" }}
        >
          <View
            style={[
              {
                padding: getWidthnHeight(3)?.width,
              },
            ]}
          >
            <ThemedText
              style={[
                { fontSize: fontSizeH4().fontSize + 6, fontWeight: "500" },
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
                },
                getMarginVertical(2),
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate("pvtMessage")}
              >
                <MessageComponent
                  title={"Ruchit D."}
                  numberOfLines={1}
                  showDate={false}
                />
              </TouchableOpacity>
            </ThemedView>
            <ThemedText
              style={[
                { fontSize: fontSizeH4().fontSize + 6, fontWeight: "500" },
                getMarginTop(1),
              ]}
            >
              Get it done today
            </ThemedText>
            <ThemedText style={[{}, fontSizeH4(), getMarginTop(0.5)]}>
              To-do list never getting shorter ? Take the burden off and find
              the help you need on Airtasker.
            </ThemedText>
          </View>
          <View
            style={[
              {
                flex: 1,
                alignItems: "center",
              },
            ]}
          >
            <FlatList
              data={todayTasks}
              numColumns={2}
              nestedScrollEnabled
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.8 : 1,
                    })}
                    onPress={() => {
                      navigation.navigate("createTask", {
                        title: item.title,
                      });
                    }}
                  >
                    <ThemedView
                      style={{
                        width: getWidthnHeight(42)?.width,
                        height: getWidthnHeight(30)?.width,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: getWidthnHeight(3)?.width,
                        shadowColor: Colors[theme]["iconColor"],
                        shadowOpacity: 0.4,
                        shadowRadius: 6,
                        elevation: 4,
                        margin: getWidthnHeight(3)?.width,
                        borderWidth: 1,
                        borderColor:
                          theme === "dark"
                            ? Colors[theme]["white"]
                            : "transparent",
                        backgroundColor: Colors[theme]["screenBG"],
                      }}
                    >
                      {item.icon}
                      <ThemedText>{item.title}</ThemedText>
                    </ThemedView>
                  </Pressable>
                );
              }}
            />
          </View>
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
        </ScrollView>
      </View>
    </ThemedView>
  );
}

export { HomePage };
