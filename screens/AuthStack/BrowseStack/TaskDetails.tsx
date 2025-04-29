import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  NativeScrollEvent,
  RefreshControl,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import {
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { ThemedView } from "../../../components/ThemedView";
import { ThemedSafe } from "../../../components/ThemedSafe";
import {
  fontSizeH1,
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginHorizontal,
  getMarginLeft,
  getMarginRight,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../../components/width";
import { ThemedText } from "../../../components/ThemedText";
import { BrowseStackNavigationProps, TaskDetailsStackParamList } from "..";
import { Colors } from "../../../constants/Colors";
import { FlatButton } from "../../../components/Buttons/FlatButton";
import { CommonTaskDetails } from "../CommonTaskDetails";
import { CustomBS } from "../../../components/BottomSheet/CustomBS";
import { ThemedFoundation } from "../../../components/ThemedFoundation";
import { currency } from "../../../constants/currency";
import { ThemedMaterialIcons } from "../../../components/ThemedMaterialIcon";
import { IconTextInput } from "../../../components/IconTextInput";
import { saveTaskRequest } from "../../../firebase/create/createTaskOffers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { UserDetails } from "../../../redux/slice/auth";
import { alertActions } from "../../../redux/slice/slidingAlert";
import { Loader } from "../../../components/Loader";
import { getTaskOffers } from "../../../firebase/read/fetchTaskOffers";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { getSavedQuestions } from "../../../firebase/read/fetchQuestions";
import { TaskOffersProps } from "../../../redux/slice/tasks";

type TaskDetailsRouteProp = RouteProp<TaskDetailsStackParamList, "taskDetails">;
// type MyTaskDetailsRouteProp = RouteProp<MyTaskDetailsStackParamList, "myTaskDetails">;
const HEADER_MAX_HEIGHT = getWidthnHeight(35)?.width!; // Max header height
const minimumCharacters = 15;

export type SubmitTaskRequestProps = {
  amount: string;
  tasker_name: string;
  tasker_id: string;
  tasker_image: string;
  task_id: string;
  rating: string | number;
  verified: boolean;
  totalReview: string | number;
  completionRate: string;
  createdAt?: FirebaseFirestoreTypes.FieldValue;
  task_createdBy: string;
  offerDescription: string;
};

type RenderPriceDetailsProps = {
  showIcon?: boolean;
  title: string;
  price: string | number;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

const { width } = Dimensions.get("window");

const TaskDetails: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const dispatch = useDispatch();
  const route = useRoute<TaskDetailsRouteProp>();
  const { details } = useSelector((state: RootState) => state.auth);
  const { isLoading } = useSelector((state: RootState) => state.tasks);
  const navigation = useNavigation<BrowseStackNavigationProps>();
  const taskDetails = route.params?.details;
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [expand, setExpand] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [offerDescription, setOfferDescription] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(
    taskDetails?.budget ?? ""
  );
  const [refreshing, setRefreshing] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [animateSlide, setAnimateSlide] = useState<Animated.Value>(
    new Animated.Value(1)
  );
  const [sortTaskOffers, setSortTaskOffers] = useState<TaskOffersProps[]>([]);
  const [taskerDetails, setTaskerDetails] = useState<TaskOffersProps | null>(
    null
  );
  const [offerSubmitted, setOfferSubmitted] = useState(false);

  const offerBSRef = useRef<BottomSheetModal>(null);
  const offerFlatlistRef = useRef<FlatList>(null);

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
    if (sortTaskOffers.length > 0) {
      // console.log("$$$ TASK OFFERS: ", sortTaskOffers);
      const findTaskerId = sortTaskOffers.find(
        (offer) => offer.tasker_id === userDetails?.user?.uid
      );
      if (findTaskerId) {
        setOfferSubmitted(true);
      }
    }
  }, [sortTaskOffers]);

  useEffect(() => {
    if (details) {
      const parsedDetails: UserDetails =
        typeof details === "string" ? JSON.parse(details) : details;
      // console.log("###$$$ USER DETAILS: ", details, "\n\n", parsedDetails);
      if (parsedDetails?.user) {
        setUserDetails(parsedDetails);
      }
    }
  }, []);

  function openBottomSheet(sheetRef: BottomSheetModal) {
    sheetRef.present();
  }

  function closeBottomSheet(sheetRef: BottomSheetModal) {
    sheetRef.close();
  }

  function RenderPriceDetails({
    title,
    showIcon = false,
    price,
    containerStyle,
    titleStyle,
  }: RenderPriceDetailsProps) {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "95%",
          },
          containerStyle,
        ]}
      >
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <ThemedText
            colorType={"darkGray"}
            style={[
              {
                fontWeight: "500",
                fontSize: fontSizeH4().fontSize + 3,
              },
              titleStyle,
              getMarginRight(2),
            ]}
          >
            {title}
          </ThemedText>
          {showIcon && (
            <ThemedFoundation
              colorType={"darkGray"}
              name={"info"}
              size={getWidthnHeight(5)?.width}
            />
          )}
        </View>
        <ThemedText
          colorType={"darkGray"}
          style={[
            { fontWeight: "500", fontSize: fontSizeH4().fontSize + 3 },
            titleStyle,
          ]}
        >
          {price}
        </ThemedText>
      </View>
    );
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

  const screens = [
    {
      id: "offer1",
      screen: (
        <View
          style={[
            {
              flex: 1,
              alignItems: "center",
            },
            getWidthnHeight(100),
          ]}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemedText
              style={[
                {
                  textAlign: "center",
                  fontSize: fontSizeH4().fontSize + 8,
                  fontWeight: "500",
                },
                getMarginVertical(2),
              ]}
            >
              Make an offer
            </ThemedText>
          </View>
          <View
            style={[
              {
                width: "40%",
                borderRadius: getWidthnHeight(2)?.width,
              },
              getMarginVertical(2),
            ]}
          >
            {/* <ThemedText
              style={[
                {
                  textAlign: "center",
                  fontSize: fontSizeH3().fontSize + 8,
                  fontWeight: "500",
                },
                getMarginVertical(2),
              ]}
            >
              ${route.params.details.budget}
            </ThemedText> */}
            <IconTextInput
              value={"$" + " " + amount!}
              keyboardType="phone-pad"
              onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))}
              containerStyle={[
                {
                  width: "100%",
                  borderWidth: 0,
                },
                getMarginVertical(1),
              ]}
              showClearIcon={false}
              icon={null}
              placeholder="Amount"
              placeholderTextColor={"gradeOut"}
              style={{
                flex: 1,
                textAlign: "center",
                paddingVertical: getWidthnHeight(3)?.width,
                textAlignVertical: "center",
                fontSize: fontSizeH3().fontSize + 8,
                borderWidth: 0,
              }}
            />
          </View>
          <RenderPriceDetails
            title="Bronze service fee"
            showIcon={true}
            price={`-${currency}31.60`}
          />
          <RenderPriceDetails
            title="You'll receive"
            containerStyle={getMarginTop(1)}
            titleStyle={{
              fontSize: fontSizeH4().fontSize + 6,
              fontWeight: "500",
              color: Colors[theme]["iconColor"],
              borderWidth: 0,
            }}
            showIcon={false}
            price={`-${currency}68.40`}
          />
        </View>
      ),
    },
    {
      id: "offer2",
      screen: (
        <View style={[{ flex: 1, alignItems: "center" }, getWidthnHeight(100)]}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ position: "absolute", left: 0 }}>
              <TouchableOpacity
                style={{ borderWidth: 0, padding: getWidthnHeight(2)?.width }}
                onPress={() => {
                  setSelectedIndex(0);
                  offerFlatlistRef.current?.scrollToIndex({
                    animated: true,
                    index: 0,
                  });
                }}
              >
                <ThemedMaterialIcons
                  name={"keyboard-backspace"}
                  size={getWidthnHeight(6)?.width}
                  colorType={"iconColor"}
                />
              </TouchableOpacity>
            </View>
            <ThemedText
              style={[
                {
                  textAlign: "center",
                  fontSize: fontSizeH4().fontSize + 8,
                  fontWeight: "500",
                },
                getMarginVertical(2),
              ]}
            >
              Make an offer
            </ThemedText>
          </View>
          <View
            style={[
              {
                width: "100%",
                paddingHorizontal: getWidthnHeight(3)?.width,
              },
            ]}
          >
            <ThemedText
              style={{
                fontSize: fontSizeH4().fontSize + 5,
                textAlign: "left",
                fontWeight: "500",
              }}
            >
              What does your offer include?
            </ThemedText>
            <ThemedText
              colorType={"darkGray"}
              style={[
                {
                  fontSize: fontSizeH4().fontSize + 3,
                  textAlign: "left",
                },
                getMarginTop(1),
              ]}
            >
              {`Help ${"client"} understand what they're paying for.`}
            </ThemedText>
            <ThemedText
              colorType={"darkGray"}
              style={[
                {
                  fontSize: fontSizeH4().fontSize + 1,
                  textAlign: "right",
                },
                getMarginTop(1),
              ]}
            >
              {`Minimum ${minimumCharacters} characters`}
            </ThemedText>
            <IconTextInput
              value={offerDescription ?? ""}
              multiline
              onChangeText={(text) => setOfferDescription(text.trimStart())}
              containerStyle={[
                {
                  width: "100%",
                  borderWidth: 0,
                  height: getWidthnHeight(40)?.width,
                },
                getMarginVertical(2),
              ]}
              showClearIcon={false}
              icon={null}
              placeholder="Try to explain what all tasks would be performed"
              placeholderTextColor={"darkGray"}
              style={{
                flex: 1,
                // paddingHorizontal: getWidthnHeight(2)?.width,
                textAlignVertical: "top",
                marginVertical: getWidthnHeight(2)?.width,
                // marginHorizontal: getWidthnHeight(1)?.width,
                fontSize: fontSizeH4().fontSize + 5,
                height: "100%",
                borderWidth: 0,
              }}
            />
          </View>
        </View>
      ),
    },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      if (taskDetails?.id) {
      }
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <ThemedView colorType={"screenBG"} style={{ flex: 1, borderWidth: 0 }}>
      <ThemedView
        colorType={"screenBG"}
        pointerEvents="box-none"
        style={[
          styles.header,
          offerSubmitted && { height: "7%" },
          isLoading && { height: "7%" },
        ]}
      >
        {isLoading ? (
          <LoadingIndicator colorType={"black"} size={"large"} />
        ) : (
          <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
            <View
              style={[
                {
                  paddingHorizontal: getWidthnHeight(3)?.width,
                  borderWidth: 0,
                },
              ]}
            >
              <ThemedText
                style={[
                  {
                    fontSize: fontSizeH4().fontSize + 5,
                    fontWeight: "500",
                  },
                ]}
              >
                {offerSubmitted
                  ? "You've already made an offer"
                  : "Make an offer now"}
              </ThemedText>
            </View>
            {!offerSubmitted && (
              <>
                <ThemedText
                  style={[
                    {
                      fontSize: fontSizeH4().fontSize + 5,
                      fontWeight: "normal",
                    },
                    getMarginTop(1.5),
                  ]}
                >
                  {`${sortTaskOffers.length} Tasker(s) has made an offer`}
                </ThemedText>
                <FlatButton
                  activeOpacity={0.5}
                  lightColor={Colors[theme]["yellow"]}
                  darkColor={Colors[theme]["yellow"]}
                  title="Make an offer"
                  onPress={() => {
                    if (offerBSRef?.current) {
                      openBottomSheet(offerBSRef.current);
                    }
                  }}
                  style={[
                    {
                      borderRadius: getWidthnHeight(10)?.width,
                      paddingHorizontal: getWidthnHeight(5)?.width,
                      borderWidth: 0,
                      width: "93%",
                    },
                    getMarginVertical(2),
                  ]}
                  textStyle={{
                    paddingVertical: getWidthnHeight(3)?.width,
                    fontSize: fontSizeH4().fontSize + 4,
                  }}
                />
              </>
            )}
          </View>
        )}
      </ThemedView>
      <View style={{ flex: 1 }}>
        <FlatList
          data={["dummyTaskDetails"]}
          keyExtractor={() => "dummyTaskDetailsId"}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={() => {
            return (
              <CommonTaskDetails
                taskDetails={taskDetails}
                sortTaskOffers={sortTaskOffers}
                setSortTaskOffers={setSortTaskOffers}
                fetchComments={() => {
                  if (taskDetails?.id) {
                    // getSavedComments(taskDetails?.id);
                  }
                }}
              />
            );
          }}
        />
      </View>

      <CustomBS
        ref={offerBSRef}
        onClose={() => {
          setSelectedIndex(0);
          setOfferDescription("");
        }}
        snapPoints={["85%"]}
        bsStyle={{
          borderTopLeftRadius: getWidthnHeight(5)?.width,
          borderTopRightRadius: getWidthnHeight(5)?.width,
        }}
        handleComponent={null}
        {...Platform.select({
          ios: {
            index: 1,
          },
        })}
      >
        <ThemedView
          style={{
            flex: 1,
            borderTopLeftRadius: getWidthnHeight(5)?.width,
            borderTopRightRadius: getWidthnHeight(5)?.width,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, borderWidth: 0, width: "100%" }}>
            <FlatList
              ref={offerFlatlistRef}
              horizontal
              scrollEnabled={false}
              pagingEnabled
              data={screens}
              snapToAlignment={"center"}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View
                    style={[
                      {
                        flex: 1,
                      },
                    ]}
                  >
                    {item.screen}
                  </View>
                );
              }}
            />
          </View>
          <FlatButton
            activeOpacity={0.5}
            colorType={
              selectedIndex === 0 && amount
                ? "yellow"
                : offerDescription &&
                  offerDescription.length >= minimumCharacters
                ? "yellow"
                : "gradeOut"
            }
            title="Continue"
            onPress={() => {
              Keyboard.dismiss();
              if (selectedIndex === 0 && amount) {
                setSelectedIndex(1);
                offerFlatlistRef.current?.scrollToIndex({
                  animated: true,
                  index: 1,
                });
              } else if (
                selectedIndex === 1 &&
                offerDescription &&
                offerDescription?.length >= minimumCharacters
              ) {
                // console.log("### DETAILS: ", taskDetails);
                Alert.alert(
                  "Submit!",
                  `Are you sure you want to submit this offer for ${currency}${amount} ?`,
                  [
                    {
                      text: "Yes",
                      onPress: async () => {
                        if (!userDetails?.user?.displayName) {
                          Alert.alert(
                            "Details required",
                            "Please update your name before continuing."
                          );
                          navigation.navigate("userProfile");
                          return;
                        }
                        try {
                          setLoading(true);
                          const saveDetails: SubmitTaskRequestProps = {
                            offerDescription,
                            amount: `${currency}${amount}`!,
                            completionRate: "85%",
                            rating: "4.5",
                            task_id: taskDetails?.id!,
                            task_createdBy: taskDetails?.createdBy!,
                            tasker_id: userDetails?.user?.uid!,
                            tasker_image: userDetails?.user?.photoURL ?? "",
                            tasker_name: userDetails?.user?.displayName ?? "",
                            totalReview: 2,
                            verified: false,
                          };
                          if (offerBSRef?.current) {
                            closeBottomSheet(offerBSRef.current);
                          }
                          console.log(
                            "@@@ SAVE DETAILS: ",
                            JSON.stringify(saveDetails, null, 4)
                          );
                          const { status, offerRef } = await saveTaskRequest(
                            saveDetails
                          );
                          setLoading(false);
                        } catch (error) {
                          setLoading(false);
                          console.error("!!! Error submitting offer: ", error);
                        }
                      },
                    },
                    {
                      text: "No",
                    },
                  ]
                );
              }
            }}
            style={[
              {
                borderRadius: getWidthnHeight(10)?.width,
                paddingHorizontal: getWidthnHeight(5)?.width,
                width: "95%",
              },
              getMarginBottom(3),
            ]}
            textStyle={{
              paddingVertical: getWidthnHeight(3)?.width,
              fontSize: fontSizeH4().fontSize + 4,
            }}
          />
        </ThemedView>
      </CustomBS>
      <Loader visible={loading} transparent title={"Submitting offer"} />
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
    // ...StyleSheet.absoluteFillObject,
    // position: "absolute",
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    // height: HEADER_MAX_HEIGHT,
    borderWidth: 0,
  },
  scrollView: {
    flex: 1,
    borderWidth: 0,
  },
});

export { TaskDetails };
