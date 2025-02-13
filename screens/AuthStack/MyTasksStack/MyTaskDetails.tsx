import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  Animated,
  Easing,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { ThemedView } from "../../../components/ThemedView";
import { ThemedSafe } from "../../../components/ThemedSafe";
import {
  fontSizeH1,
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../../components/width";
import { ThemedText } from "../../../components/ThemedText";
import {
  BrowseStackNavigationProps,
  MyStackNavigationProps,
  TaskDetailsStackParamList,
} from "..";
import { ThemedAntDesign } from "../../../components/ThemedAntDesign";
import { Colors } from "../../../constants/Colors";
import { PostComponent } from "../../../components/PostComponent";
import { ThemedFontAwesome } from "../../../components/ThemedFontAwesome";
import { ThemedIonicons } from "../../../components/ThemedIonicons";
import { FlatButton } from "../../../components/Buttons/FlatButton";
import { ThemedPicker } from "../../../components/ThemedPicker";
import { ThemedGradientView } from "../../../components/ThemedGradientView";
import { ThemedMaterialIcons } from "../../../components/ThemedMaterialIcon";
import { ThemedEvilIcons } from "../../../components/ThemedEvilicons";
import { ThemedMaterialCommunityIcons } from "../../../components/ThemedMaterialCommunityIcon";
import { PrimaryInput } from "../../../components/PrimaryInput";
import { ChatComponent } from "../../../components/ChatComponent";
import { CommonTaskDetails } from "../CommonTaskDetails";
import { CustomBS } from "../../../components/BottomSheet/CustomBS";
import { CloseButtonBS } from "../../../components/CloseButtonBS";
import { CreateTask } from "../CreateTask/CreateTask";
import { getSavedComments } from "../../../firebase/read/fetchComments";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { UserDetails } from "../../../redux/slice/auth";

export type TaskDetailsRouteProp = RouteProp<
  TaskDetailsStackParamList,
  "taskDetails"
>;
// type MyTaskDetailsRouteProp = RouteProp<MyTaskDetailsStackParamList, "myTaskDetails">;
const HEADER_MAX_HEIGHT = getWidthnHeight(20)?.width!; // Max header height

type MoreOptionsProps = {
  id: string;
  title: string;
};

export type CommentDetailsProps = {
  id?: string;
  user_id?: string;
  user_image?: string;
  createdBy?: string;
  createdAt?: number;
  task_id: string;
  comment: string;
};

const moreOptions: MoreOptionsProps[] = [
  {
    id: "1",
    title: "Notification settings",
  },
  {
    id: "2",
    title: "Edit task",
  },
  {
    id: "3",
    title: "Post similar task",
  },
  {
    id: "4",
    title: "Share task",
  },
  {
    id: "5",
    title: "Cancel task",
  },
];

const options = "options";
const editTask = "editTask";

type OptionsProp = "options" | "editTask";

const MyTaskDetails: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const route = useRoute<TaskDetailsRouteProp>();
  const navigation = useNavigation<MyStackNavigationProps>();
  const taskDetails = route.params?.details;
  const [expand, setExpand] = useState<boolean>(true);
  const [animateSlide, setAnimateSlide] = useState<Animated.Value>(
    new Animated.Value(1)
  );

  const moreOptionsRef = useRef<BottomSheetModal>(null);
  const editTaskRef = useRef<BottomSheetModal>(null);

  const handleSnapPress = useCallback(
    (sheetRef: BottomSheetModal, index: number) => {
      // sheetRef.snapToIndex(index);
      if (index >= 0) {
        sheetRef.present();
      } else {
        sheetRef.close();
      }
    },
    []
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <ThemedMaterialCommunityIcons
            name="dots-horizontal"
            size={getWidthnHeight(8)?.width}
            colorType={"iconColor"}
            onPress={() => {
              if (moreOptionsRef?.current) {
                // openBottomSheet(moreOptionsRef.current);
                handleSnapPress(moreOptionsRef.current, 0);
              }
            }}
          />
        );
      },
    });
  }, []);

  useEffect(() => {
    if (expand) {
      slidingEffect(1);
    } else {
      slidingEffect(0);
    }
  }, [expand]);

  function slidingEffect(value: number) {
    Animated.timing(animateSlide, {
      toValue: value,
      useNativeDriver: false,
    }).start();
  }

  const animateHeight: ViewStyle = {
    height: animateSlide.interpolate({
      inputRange: [0, 1],
      outputRange: ["100%", "50%"],
    }),
  };

  function chooseOption(id: string) {
    if (id === "2" && editTaskRef?.current) {
      // openBottomSheet(editTaskRef.current!);
      handleSnapPress(editTaskRef.current, 0);
    }
  }

  return (
    <ThemedView colorType={"screenBG"} style={{ flex: 1, borderWidth: 0 }}>
      <View style={[styles.header]}>
        <ThemedView
          colorType={"screenBG"}
          style={[
            {
              paddingHorizontal: getWidthnHeight(3)?.width,
              borderWidth: 0,
              flex: 1,
              // paddingBottom: getWidthnHeight(4)?.width,
            },
          ]}
        >
          {taskDetails.status === "open" && (
            <View>
              <ThemedText
                style={[
                  {
                    fontSize: fontSizeH4().fontSize + 5,
                    fontWeight: "500",
                  },
                ]}
              >
                Your task is posted
              </ThemedText>
              <ThemedText
                style={[
                  {
                    fontSize: fontSizeH4().fontSize + 5,
                    fontWeight: "normal",
                  },
                  getMarginTop(0.5),
                ]}
              >
                You'll soon receive offers from Taskers
              </ThemedText>
            </View>
          )}
        </ThemedView>
      </View>
      <View style={{ flex: 1 }}>
        {/* <ScrollView style={[styles.scrollView]}> */}
        <FlatList
          data={["MyTasksDummy"]}
          keyExtractor={() => "myTasksDummyId"}
          renderItem={() => (
            <CommonTaskDetails
              style={{
                marginTop: HEADER_MAX_HEIGHT,
              }}
              taskDetails={taskDetails}
              fetchComments={() => {
                if (taskDetails?.id) {
                  getSavedComments(taskDetails?.id);
                }
              }}
            />
          )}
        />
        {/* </ScrollView> */}
      </View>

      {/* MORE OPTIONS BS */}
      <CustomBS
        ref={moreOptionsRef}
        stackBehavior={"push"}
        snapPoints={["50%"]}
        bsStyle={{
          borderTopLeftRadius: getWidthnHeight(5)?.width,
          borderTopRightRadius: getWidthnHeight(5)?.width,
          backgroundColor: "transparent",
        }}
        backgroundStyle={{
          backgroundColor: "transparent",
        }}
        handleComponent={null}
        {...Platform.select({
          ios: {
            index: 1,
          },
        })}
      >
        <ThemedView
          colorType="transparent"
          style={{
            // flex: 1,
            paddingHorizontal: getWidthnHeight(2)?.width,
            alignItems: "center",
          }}
        >
          <ThemedView
            style={{ width: "100%", borderRadius: getWidthnHeight(3)?.width }}
          >
            <View style={{ borderBottomWidth: 0.5, borderWidth: 0 }}>
              <ThemedText
                colorType={"darkGray"}
                style={[
                  {
                    textAlign: "center",
                    fontSize: fontSizeH4().fontSize + 2,
                  },
                  getMarginVertical(1.5),
                ]}
              >
                More options
              </ThemedText>
            </View>
            {moreOptions.map((option, index) => {
              return (
                <TouchableOpacity
                  onPress={() => chooseOption(option.id)}
                  activeOpacity={0.7}
                  key={`${option.id}.${option.title}`}
                  style={{
                    borderBottomWidth: index + 1 < moreOptions.length ? 0.5 : 0,
                    paddingVertical: getWidthnHeight(4)?.width,
                  }}
                >
                  <ThemedText
                    colorType={"iosBlue"}
                    style={{
                      textAlign: "center",
                      fontSize: fontSizeH4().fontSize + 6,
                      fontWeight: "500",
                    }}
                  >
                    {option.title}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ThemedView>
          <FlatButton
            colorType={"white"}
            title="Cancel"
            onPress={() => {
              // closeBottomSheet(moreOptionsRef.current!)
              if (moreOptionsRef.current) {
                handleSnapPress(moreOptionsRef.current, -1);
              }
            }}
            style={[
              {
                width: "100%",
                borderRadius: getWidthnHeight(3)?.width,
                paddingHorizontal: getWidthnHeight(5)?.width,
              },
              getMarginTop(1),
            ]}
            textStyle={{
              fontSize: fontSizeH4().fontSize + 10,
              color: Colors[theme]["iosBlue"],
              fontWeight: "600",
            }}
          />
        </ThemedView>
      </CustomBS>

      {/* EDIT TASK BS */}
      <CustomBS
        ref={editTaskRef}
        snapPoints={["100%"]}
        stackBehavior={"push"}
        bsStyle={{
          borderTopLeftRadius: getWidthnHeight(5)?.width,
          borderTopRightRadius: getWidthnHeight(5)?.width,
          backgroundColor: "transparent",
        }}
        backgroundStyle={{
          backgroundColor: "transparent",
        }}
        handleComponent={null}
        {...Platform.select({
          ios: {
            index: 1,
          },
        })}
      >
        <ThemedSafe style={{ flex: 1 }}>
          <View
            style={[
              {
                paddingHorizontal: getWidthnHeight(3)?.width,
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ borderWidth: 0, padding: getWidthnHeight(1)?.width }}
              onPress={() => {
                // closeBottomSheet(editTaskRef.current!)
                if (editTaskRef.current) {
                  handleSnapPress(editTaskRef.current, -1);
                }
              }}
            >
              <ThemedAntDesign
                name="close"
                size={getWidthnHeight(6)?.width}
                colorType="buttonBorder"
              />
            </TouchableOpacity>
            <ThemedText
              colorType={"iconColor"}
              style={[
                {
                  fontFamily: "DancingScript_700Bold",
                  fontSize: fontSizeH3().fontSize + 4,
                },
                getMarginLeft(5),
              ]}
            >
              Edit Task
            </ThemedText>
          </View>
          <View style={[{ flex: 1 }]}>
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  alignItems: "center",
                  justifyContent: "flex-end",
                },
              ]}
            >
              <Image
                source={require("../../../assets/query.jpg")}
                resizeMode="cover"
                style={[
                  {
                    width: getWidthnHeight(100)?.width,
                    height: getWidthnHeight(75)?.width,
                  },
                  getMarginBottom(8),
                ]}
              />
            </View>
            <KeyboardAvoidingView
              style={{
                flex: 1,
                borderWidth: 0,
                paddingTop: getMarginTop(6).marginTop,
              }}
              {...Platform.select({
                ios: {
                  behavior: "padding",
                },
              })}
            >
              <CreateTask
                edit={true}
                editDetails={taskDetails}
                onFinish={() => {
                  if (editTaskRef.current && moreOptionsRef.current) {
                    // closeBottomSheet(editTaskRef.current!);
                    // closeBottomSheet(moreOptionsRef.current!);
                    handleSnapPress(editTaskRef.current, -1);
                    handleSnapPress(moreOptionsRef.current, -1);
                  }
                  navigation.goBack();
                }}
              />
            </KeyboardAvoidingView>
          </View>
        </ThemedSafe>
      </CustomBS>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    borderRadius: getWidthnHeight(3)?.width,
    overflow: "hidden",
  },
  header: {
    ...StyleSheet.absoluteFillObject,
    height: HEADER_MAX_HEIGHT,
    // width: "100%",
  },
  scrollView: {
    flex: 1,
    borderWidth: 0,
  },
});

export { MyTaskDetails };
