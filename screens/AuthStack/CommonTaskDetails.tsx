import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Animated,
  FlatList,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
  Image,
  Alert,
} from "react-native";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import { ThemedView } from "../../components/ThemedView";
import { ThemedSafe } from "../../components/ThemedSafe";
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
} from "../../components/width";
import { ThemedText } from "../../components/ThemedText";
import { BrowseStackNavigationProps, TaskDetailsStackParamList } from "./index";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";
import { Colors } from "../../constants/Colors";
import { PostComponent } from "../../components/PostComponent";
import { ThemedFontAwesome } from "../../components/ThemedFontAwesome";
import { ThemedIonicons } from "../../components/ThemedIonicons";
import { FlatButton } from "../../components/Buttons/FlatButton";
import { ThemedPicker } from "../../components/ThemedPicker";
import { ThemedGradientView } from "../../components/ThemedGradientView";
import { ThemedMaterialIcons } from "../../components/ThemedMaterialIcon";
import { ThemedEvilIcons } from "../../components/ThemedEvilicons";
import { UserProfileDetails } from "../../components/UserProfileDetails";
import { ThemedMaterialCommunityIcons } from "../../components/ThemedMaterialCommunityIcon";
import { PrimaryInput } from "../../components/PrimaryInput";
import { ChatComponent } from "../../components/ChatComponent";
import { SaveDetailsProps } from "./CreateTask/CreateTask";
import { QuestionDetailsProps } from "./MyTasksStack/MyTaskDetails";
import { UserDetails } from "../../redux/slice/auth";
import { logoutUser, RootState } from "../../redux/store";
import {
  defaultUserImage,
  saveQuestionToFirebase,
} from "../../firebase/create/saveQuestion";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import {
  UpdateTaskStatus,
  updateTaskToFirestore,
} from "../../firebase/update/updateTask";
import { alertActions } from "../../redux/slice/slidingAlert";
import { createChat } from "../../firebase/create/createChat";
import { TaskOffersProps } from "../../redux/slice/tasks";
import { verifyAuth } from "../../firebase/authCheck/verifyAuth";
import { currency } from "../../constants/currency";

type CommonTaskDetailsProps = {
  taskDetails: SaveDetailsProps;
  sortTaskOffers: TaskOffersProps[];
  setSortTaskOffers: (data: TaskOffersProps[]) => void;
  style?: StyleProp<ViewStyle>;
  fetchComments?: () => void;
  showOffersPrice?: boolean;
  enableApprove?: boolean;
  setLoading?: (value: boolean) => void;
};

const CommonTaskDetails: React.FC<CommonTaskDetailsProps> = ({
  taskDetails,
  sortTaskOffers,
  setSortTaskOffers,
  style,
  showOffersPrice = true,
  fetchComments = () => {},
  enableApprove = false,
  setLoading = () => {},
}) => {
  const theme = useColorScheme() ?? "light";
  const dispatch = useDispatch();
  const navigation = useNavigation<BrowseStackNavigationProps>();
  const { details } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.tasks);
  const [expand, setExpand] = useState<boolean>(true);
  const [animateSlide, setAnimateSlide] = useState<Animated.Value>(
    new Animated.Value(1)
  );
  const [questionText, setQuestionText] = useState<string | null>(null);
  const [selectedOffers, setSelectedOffers] = useState<boolean>(true);
  const [sortTaskQuestions, setSortTaskQuestions] = useState<
    QuestionDetailsProps[]
  >([]);

  const [taskerDetails, setTaskerDetails] = useState<TaskOffersProps | null>(
    null
  );

  const userDetails: UserDetails = JSON.parse(details as string);

  const offersRef = firestore()
    .collection("tasks")
    .doc(taskDetails.id)
    .collection("offers");

  const questionsRef = firestore()
    .collection("tasks")
    .doc(taskDetails.id)
    .collection("questions");

  useEffect(() => {
    if (sortTaskOffers.length > 0) {
      const findTasker = sortTaskOffers.find(
        (task) => task.tasker_id === taskDetails?.assignedTo
      );
      if (findTasker) {
        setTaskerDetails(findTasker);
      }
    }
  }, [sortTaskOffers, taskDetails]);

  useEffect(() => {
    const isAuthenticated = verifyAuth();
    if (!isAuthenticated) {
      logoutUser();
      return;
    }
    const unsubscribe = offersRef.orderBy("createdAt", "desc").onSnapshot(
      (snapshot) => {
        if (!snapshot?.empty) {
          const taskOffers: TaskOffersProps[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as TaskOffersProps[];
          // console.log("^^^ OFFERS: ", taskOffers);
          if (taskerDetails && taskOffers.length > 1) {
            const findTaskerIndex = taskOffers.findIndex(
              (taskOffer) => taskOffer.tasker_id === taskDetails?.assignedTo
            );
            // console.log("@@@ FIND INDEX: ", findTaskerIndex);
            if (findTaskerIndex > -1) {
              const sortData = moveToTop(
                Array.from(taskOffers),
                findTaskerIndex
              );
              setSortTaskOffers(sortData);
            }
          } else {
            setSortTaskOffers(taskOffers);
          }
        }
      },
      (error) => console.log("!!! SNAPSHOT OFFERS ERROR: ", error)
    );

    return () => unsubscribe();
  }, [taskerDetails, taskDetails]);

  useEffect(() => {
    const unsubscribe = questionsRef.orderBy("createdAt", "desc").onSnapshot(
      (snapshot) => {
        if (!snapshot?.empty) {
          const taskQuestions: QuestionDetailsProps[] = snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          ) as QuestionDetailsProps[];
          // console.log("^^^ OFFERS: ", taskQuestions);
          setSortTaskQuestions(taskQuestions);
        }
      },
      (error) => console.log("!!! SNAPSHOT QUESTION ERROR: ", error)
    );

    return () => unsubscribe();
  }, [taskerDetails, taskDetails]);

  function moveToTop(arr: TaskOffersProps[], index: number) {
    if (index < 0 || index >= arr.length) return arr; // Invalid index, return as is
    const item = arr.splice(index, 1)[0]; // Remove item at index
    arr.unshift(item); // Add item to the start
    return arr;
  }

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

  const animateVertically: ViewStyle = {
    transform: [
      {
        translateY: animateSlide.interpolate({
          inputRange: [0, 1],
          outputRange: [0, getMarginTop(-7).marginTop],
        }),
      },
    ],
  };

  return (
    <ThemedView
      colorType={"screenBG"}
      style={[
        {
          flex: 1,
          paddingHorizontal: getWidthnHeight(3)?.width,
        },
        style,
      ]}
    >
      <ThemedView colorType={"white"} style={[styles.shadow]}>
        <View
          style={[
            {
              paddingTop: getWidthnHeight(2)?.width,
            },
          ]}
        >
          <View
            style={{
              paddingHorizontal: getWidthnHeight(2)?.width,
            }}
          >
            <View
              style={[
                {
                  shadowColor: Colors[theme]["iconColor"],
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <ThemedView
                colorType={"yellow"}
                style={{
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  borderRadius: getWidthnHeight(5)?.width,
                }}
              >
                <ThemedText style={{ fontSize: fontSizeH4().fontSize - 1 }}>
                  {taskDetails.status.toUpperCase()}
                </ThemedText>
              </ThemedView>
              <ThemedView
                colorType={"iconColor"}
                style={{
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  borderRadius: getWidthnHeight(5)?.width,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ThemedAntDesign
                  name={"heart"}
                  colorType={"buttonBG"}
                  size={getWidthnHeight(3)?.width}
                />
                <ThemedText
                  colorType={"buttonBG"}
                  style={[
                    { fontSize: fontSizeH4().fontSize - 1 },
                    getMarginLeft(1),
                  ]}
                >
                  Follow
                </ThemedText>
              </ThemedView>
            </View>
            <ThemedText
              style={[
                fontSizeH2(),
                {
                  fontFamily: "SquadaOne_400Regular",
                  color: Colors[theme]["iconColor"],
                },
                getMarginTop(2),
              ]}
            >
              {taskDetails?.title}
            </ThemedText>
          </View>
          <PostComponent
            showDropdownIcon={true}
            style={{
              marginTop: getMarginTop(2).marginTop,
              paddingHorizontal: getWidthnHeight(2)?.width,
              paddingVertical: getWidthnHeight(
                Platform.OS === "android" ? 1 : 2
              )?.width,
              borderWidth: 0.01,
              borderColor: "transparent",
            }}
            subtitle={taskDetails.postedBy ?? "--"}
            icon={
              <ThemedFontAwesome
                name={"user-circle"}
                colorType={"yellow"}
                size={getWidthnHeight(7)?.width}
              />
            }
          />
          <PostComponent
            style={{
              paddingHorizontal: getWidthnHeight(2)?.width,
              paddingVertical: getWidthnHeight(
                Platform.OS === "android" ? 1 : 2
              )?.width,
              borderWidth: 0.01,
              borderColor: "transparent",
              backgroundColor: Colors[theme]["commonScreenBG"],
            }}
            time={null}
            title={"LOCATION"}
            subtitle={
              taskDetails?.online_job
                ? "Remote"
                : taskDetails?.location?.description
            }
            icon={
              <ThemedIonicons
                name={"location-outline"}
                colorType={"iconColor"}
                size={getWidthnHeight(7)?.width}
              />
            }
          />
          <PostComponent
            style={{
              paddingLeft: getWidthnHeight(3)?.width,
              paddingRight: getWidthnHeight(2)?.width,
              paddingVertical: getWidthnHeight(
                Platform.OS === "android" ? 1 : 2
              )?.width,
              borderWidth: 0.01,
              borderColor: "transparent",
            }}
            time={null}
            title={"TO BE DONE ON"}
            subtitle={
              taskDetails.flexible_date
                ? "Flexible"
                : taskDetails.on_date
                ? `On ${moment(taskDetails.on_date, "DD/MM/YYYY").format(
                    "ddd, DD MMM"
                  )}`
                : taskDetails.before_date
                ? `Before ${moment(
                    taskDetails.before_date,
                    "DD/MM/YYYY"
                  ).format("ddd, DD MMM")}`
                : "--"
            }
            icon={
              <ThemedFontAwesome
                name={"calendar-check-o"}
                colorType={"iconColor"}
                size={getWidthnHeight(6)?.width}
              />
            }
          />
          <PostComponent
            style={{
              paddingLeft: getWidthnHeight(4)?.width,
              paddingRight: getWidthnHeight(2)?.width,
              paddingVertical: getWidthnHeight(
                Platform.OS === "android" ? 1 : 2
              )?.width,
              borderWidth: 0.01,
              borderColor: "transparent",
              backgroundColor: Colors[theme]["commonScreenBG"],
              borderBottomLeftRadius: getWidthnHeight(3)?.width,
              borderBottomRightRadius: getWidthnHeight(3)?.width,
            }}
            time={null}
            title={"TASK BUDGET"}
            titleStyle={getMarginLeft(1)}
            subtitle={`${taskDetails.budget} USD`}
            subtitleStyle={getMarginLeft(1)}
            icon={
              <ThemedFontAwesome
                name={"dollar"}
                colorType={"iconColor"}
                size={getWidthnHeight(6)?.width}
              />
            }
          />
        </View>
      </ThemedView>

      <View>
        <Animated.View
          style={[
            {
              borderWidth: 0,
            },
            getMarginTop(2),
          ]}
        >
          <ThemedView
            colorType={"white"}
            style={[
              {
                padding: getWidthnHeight(3)?.width,
              },
              styles.shadow,
            ]}
          >
            <ThemedText
              style={{
                fontSize: fontSizeH4().fontSize + 4,
                fontWeight: "500",
              }}
            >
              Details
            </ThemedText>
            <ThemedText
              style={[
                {
                  fontSize: fontSizeH4().fontSize + 2,
                  textAlign: "justify",
                  borderWidth: 0,
                },
                getMarginTop(2),
              ]}
            >
              {taskDetails?.task_details}
              {/* {`We are seeking a detail-oriented freelancer to transcribe data from PDF files into Excel spreadsheets.
              \nThe ideal candidate will have experience in accurately converting text and tables, ensuring that all data is entered correctly and formatted appropriately. This project requires attention to detail and proficiency with both PDF and Excel. If you have a keen eye for detail and can work efficiently, we would love to hear from you!`} */}
            </ThemedText>
            <ThemedView
              colorType={"commonScreenBG"}
              style={[
                {
                  flexDirection: "row",
                  borderRadius: getWidthnHeight(10)?.width,
                },
                getMarginTop(2),
              ]}
            >
              <FlatButton
                colorType={selectedOffers ? "yellow" : "transparent"}
                title={
                  sortTaskOffers.length > 0
                    ? `Offers (${sortTaskOffers.length})`
                    : "Offers"
                }
                onPress={() => setSelectedOffers(true)}
                style={[
                  {
                    borderRadius: getWidthnHeight(10)?.width,
                    paddingHorizontal: getWidthnHeight(5)?.width,
                    width: "50%",
                  },
                ]}
                textStyle={{
                  paddingVertical: getWidthnHeight(3)?.width,
                  fontSize: fontSizeH4().fontSize + 4,
                }}
              />
              <FlatButton
                colorType={!selectedOffers ? "yellow" : "transparent"}
                title={
                  Array.isArray(sortTaskQuestions) &&
                  sortTaskQuestions.length > 0
                    ? `Questions (${sortTaskQuestions.length})`
                    : "Questions"
                }
                onPress={() => {
                  setSelectedOffers(false);
                }}
                style={[
                  {
                    borderRadius: getWidthnHeight(10)?.width,
                    paddingHorizontal: getWidthnHeight(5)?.width,
                    width: "50%",
                  },
                ]}
                textStyle={{
                  paddingVertical: getWidthnHeight(3)?.width,
                  fontSize: fontSizeH4().fontSize + 4,
                }}
              />
            </ThemedView>
            <ThemedView style={[{ borderWidth: 0 }, getMarginTop(3)]}>
              {selectedOffers && (
                <>
                  <FlatList
                    data={sortTaskOffers}
                    keyExtractor={(item) => item.id!}
                    renderItem={({ item }) => {
                      return (
                        <>
                          <UserProfileDetails
                            title={item?.tasker_name}
                            ratings={item.rating}
                            count={item.totalReview}
                            subTitle={item.completionRate}
                            verified={item.verified}
                            image={item?.tasker_image ?? null}
                            amount={item?.amount}
                            showPrice={
                              item?.task_createdBy === userDetails?.user?.uid ||
                              item.tasker_id === userDetails?.user?.uid
                            }
                          />
                          {enableApprove && (
                            <FlatButton
                              disabled={!!taskDetails.assignedTo}
                              colorType={
                                !!taskDetails.assignedTo ? "gradeOut" : "yellow"
                              }
                              activeOpacity={0.5}
                              title={
                                taskDetails.assignedTo === item.tasker_id
                                  ? "Accepted"
                                  : "Accept"
                              }
                              onPress={() => {
                                Alert.alert(
                                  "Approve Offer",
                                  `The tasker has proposed an offer of ${item.amount}, accepting this offer would assign this task to ${item.tasker_name}.`,
                                  [
                                    {
                                      text: "Approve",
                                      onPress: async () => {
                                        setLoading(true);
                                        const timestamp =
                                          firestore.FieldValue.serverTimestamp();
                                        const updateTaskStatus: UpdateTaskStatus =
                                          {
                                            id: taskDetails?.id!,
                                            status: "assigned",
                                            assignedTo: item.tasker_id,
                                            assignedOn: timestamp,
                                          };
                                        const { title } =
                                          await updateTaskToFirestore(
                                            updateTaskStatus
                                          );
                                        // const title = true;
                                        if (title) {
                                          await createChat({
                                            id: taskDetails?.id!,
                                            senderId: userDetails?.user?.uid,
                                            senderName:
                                              userDetails?.user?.displayName ??
                                              "",
                                            senderImage:
                                              userDetails?.user?.photoURL ?? "",
                                            recipientId: item?.tasker_id,
                                            text: `Hi, ${item.tasker_name} you've been assigned this task.`,
                                            seen: false,
                                            seenAt: null,
                                            taskDetails: {
                                              tasker_image:
                                                item?.tasker_image ?? "",
                                              tasker_name:
                                                item?.tasker_name ?? "",
                                              title: taskDetails?.title ?? "",
                                              status: updateTaskStatus?.status,
                                              budget: `${currency}${taskDetails?.budget}`,
                                            },
                                          });
                                        }
                                        setLoading(false);
                                        navigation.setParams({
                                          details: {
                                            ...taskDetails,
                                            ...updateTaskStatus,
                                          },
                                        });
                                        dispatch(
                                          alertActions.setAlert({
                                            visible: true,
                                            title: "Task assigned",
                                            subtitle: `You've successfully assigned this task to ${item?.tasker_name}`,
                                            type: "success",
                                            timeout: 4000,
                                          })
                                        );
                                        navigation.navigate("messages");
                                      },
                                    },
                                    {
                                      text: "Cancel",
                                    },
                                  ]
                                );
                              }}
                              style={[
                                {
                                  borderRadius: getWidthnHeight(10)?.width,
                                  paddingHorizontal: getWidthnHeight(5)?.width,
                                  borderWidth: 0,
                                  width: "100%",
                                },
                                getMarginVertical(2),
                              ]}
                              textStyle={{
                                paddingVertical: getWidthnHeight(3)?.width,
                                fontSize: fontSizeH4().fontSize + 4,
                              }}
                            />
                          )}
                          <ThemedView
                            style={[
                              {
                                flex: 1,
                              },
                              getMarginTop(enableApprove ? 0 : 1),
                              getMarginBottom(2),
                            ]}
                          >
                            <Animated.View
                              style={[
                                {
                                  padding: getWidthnHeight(4)?.width,
                                  borderRadius: getWidthnHeight(2)?.width,
                                  backgroundColor:
                                    Colors[theme]["commonScreenBG"],
                                },
                                // animateHeight,
                              ]}
                            >
                              <ThemedText
                                style={[
                                  {
                                    fontSize: fontSizeH4().fontSize + 2,
                                    textAlign: "justify",
                                    borderWidth: 0,
                                  },
                                ]}
                              >
                                {item.offerDescription}
                              </ThemedText>
                              {/* <Animated.View
                                style={[
                                  { flex: 1 },
                                  // animateVertically,
                                  getMarginTop(2),
                                ]}
                              >
                                <ThemedView
                                  colorType={"commonScreenBG"}
                                  style={{
                                    flex: 1,
                                    paddingTop: getWidthnHeight(5)?.width,
                                  }}
                                >
                                  <TouchableOpacity
                                    style={{
                                      justifyContent: "flex-start",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      // paddingBottom: getMarginTop(4).marginTop,
                                    }}
                                    onPress={() => setExpand(!expand)}
                                  >
                                    <ThemedText>
                                      {expand ? "More" : "Less"}
                                    </ThemedText>
                                    <ThemedMaterialIcons
                                      name={
                                        expand
                                          ? "keyboard-arrow-down"
                                          : "keyboard-arrow-up"
                                      }
                                      colorType={"iconColor"}
                                      size={getWidthnHeight(6)?.width}
                                    />
                                  </TouchableOpacity>
                                </ThemedView>
                              </Animated.View> */}
                            </Animated.View>
                          </ThemedView>
                        </>
                      );
                    }}
                  />
                  <View
                    style={[
                      {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      },
                      getMarginTop(3),
                    ]}
                  >
                    <View
                      style={[
                        {
                          flexDirection: "row",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <ThemedAntDesign
                        name={"back"}
                        colorType={"iconColor"}
                        size={getWidthnHeight(5)?.width}
                      />
                      <ThemedText
                        style={[
                          {
                            fontSize: fontSizeH4().fontSize + 2,
                            fontWeight: "500",
                          },
                          getMarginLeft(2),
                        ]}
                      >
                        View replies (1)
                      </ThemedText>
                      <ThemedText
                        colorType={"darkGray"}
                        style={[
                          {
                            fontSize: fontSizeH4().fontSize + 2,
                          },
                          getMarginLeft(2),
                        ]}
                      >
                        1 week ago
                      </ThemedText>
                    </View>
                    <ThemedMaterialCommunityIcons
                      name={"dots-horizontal"}
                      colorType={"darkGray"}
                      size={getWidthnHeight(5)?.width}
                    />
                  </View>
                </>
              )}
              {!selectedOffers && (
                <ThemedView>
                  <ThemedView
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <ThemedIonicons
                      name="eye-outline"
                      colorType={"darkGray"}
                      size={getWidthnHeight(6)?.width}
                    />
                    <ThemedText
                      colorType={"darkGray"}
                      style={[
                        {
                          flex: 1,
                          fontSize: fontSizeH4().fontSize + 3,
                        },
                        getMarginLeft(2),
                      ]}
                    >
                      {
                        "These messages are public and can be seen by anyone. Do not share your personal info."
                      }
                    </ThemedText>
                  </ThemedView>
                  <View style={[{ flexDirection: "row" }, getMarginTop(2)]}>
                    <ThemedFontAwesome
                      name={"user-circle-o"}
                      colorType={"darkGray"}
                      size={getWidthnHeight(5)?.width}
                    />
                    <ThemedView
                      colorType={"commonScreenBG"}
                      style={[
                        {
                          borderRadius: getWidthnHeight(2)?.width,
                          paddingHorizontal: getWidthnHeight(2)?.width,
                          flex: 1,
                        },
                        getMarginLeft(2),
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
                        value={questionText ?? ""}
                        placeholder="Ask a question"
                        placeholderTextColor={"darkGray"}
                        onChangeText={(text) =>
                          setQuestionText(text.trimStart())
                        }
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingBottom: getWidthnHeight(2)?.width,
                        }}
                      >
                        <ThemedIonicons
                          name={"image"}
                          colorType={"darkGray"}
                          size={getWidthnHeight(5)?.width}
                        />
                        {isLoading ? (
                          <LoadingIndicator
                            size={"small"}
                            colorType={"black"}
                            style={{
                              paddingVertical: getWidthnHeight(1.2)?.width,
                              paddingHorizontal: getWidthnHeight(5)?.width,
                              borderWidth: 0,
                            }}
                          />
                        ) : (
                          <FlatButton
                            title={"Send"}
                            onPress={() => {
                              if (!userDetails?.user?.displayName) {
                                Alert.alert(
                                  "Details required",
                                  "Please update your name before continuing."
                                );
                                navigation.navigate("userProfile");
                                return;
                              }
                              if (questionText && taskDetails?.id) {
                                const questionDetails: QuestionDetailsProps = {
                                  question: questionText,
                                  task_id: taskDetails.id,
                                  user_id: userDetails?.user?.uid,
                                  user_image: userDetails?.user?.photoURL ?? "",
                                  createdBy: userDetails?.user?.displayName,
                                };
                                async function saveComment() {
                                  try {
                                    const commentRef =
                                      await saveQuestionToFirebase(
                                        questionDetails
                                      );
                                    console.log(
                                      "$$$ COMMENT SAVED: ",
                                      commentRef.id
                                    );
                                    fetchComments();
                                    setQuestionText("");
                                  } catch (error) {
                                    console.error(
                                      "!!! SAVE COMMENT ERROR: ",
                                      error
                                    );
                                  }
                                }
                                saveComment();
                              }
                            }}
                            colorType={"commonScreenBG"}
                            style={{
                              borderRadius: getWidthnHeight(10)?.width,
                              borderWidth: 1,
                            }}
                            textStyle={{
                              fontWeight: "normal",
                              fontSize: fontSizeH4().fontSize + 3,
                              paddingHorizontal: getWidthnHeight(5)?.width,
                              paddingVertical: getWidthnHeight(1)?.width,
                            }}
                          />
                        )}
                      </View>
                    </ThemedView>
                  </View>
                  <View style={[{ flex: 1 }, getMarginTop(2)]}>
                    {/* <ChatComponent />
                    <ChatComponent style={getMarginTop(2)} /> */}
                    {Array.isArray(sortTaskQuestions) && (
                      <FlatList
                        data={sortTaskQuestions}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item, index }) => {
                          return (
                            <ChatComponent
                              style={[index > 0 && getMarginTop(2)]}
                              name={item.createdBy}
                              image={item.user_image || defaultUserImage}
                              message={item.question}
                            />
                          );
                        }}
                      />
                    )}
                  </View>
                </ThemedView>
              )}
            </ThemedView>
          </ThemedView>
        </Animated.View>
      </View>
      <ThemedView
        colorType={"white"}
        style={[styles.shadow, getMarginVertical(2)]}
      >
        <View
          style={{
            padding: getWidthnHeight(3)?.width,
          }}
        >
          <ThemedText
            style={{
              fontSize: fontSizeH4().fontSize + 4,
              fontWeight: "500",
            }}
          >
            What happens when a task is cancelled
          </ThemedText>
          <ThemedText
            style={[
              {
                fontSize: fontSizeH4().fontSize + 2,
                // lineHeight: -1,
                textAlign: "justify",
                borderWidth: 0,
              },
              getMarginTop(2),
            ]}
          >
            {`If you are responsible for cancelling this task, a Cancellation Fee will be deducted from your next payment payout(s).`}
          </ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowColor:
      Platform.OS === "ios" ? `${Colors.light.black}AF` : Colors.light.black,
    borderRadius: getWidthnHeight(3)?.width,
    // overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: getWidthnHeight(0.5)?.width!,
    },
  },
});

export { CommonTaskDetails };
