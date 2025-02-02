import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  ReactNode,
  useMemo,
} from "react";
import Checkbox from "expo-checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  useColorScheme,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Keyboard,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as _ from "lodash";
import moment from "moment";
import axios from "axios";
import * as Location from "expo-location";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";
import {
  CustomPrimaryStackNavProp,
  DrawerNavProp,
  DrawerStackParamList,
  PrimaryStackParamList,
} from "..";
import {
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../../components/width";
import { Colors } from "../../../constants/Colors";
import { PrimaryInput } from "../../../components/PrimaryInput";
import { RoundedDropdown } from "../../../components/RoundedDropdown";
import { ThemedFeather } from "../../../components/ThemedFeather";
import { ThemedMaterialCommunityIcons } from "../../../components/ThemedMaterialCommunityIcon";
import { ThemedIonicons } from "../../../components/ThemedIonicons";
import { Step2 } from "./Step2";
import { FlatButton } from "../../../components/Buttons/FlatButton";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { DateTimePicker } from "../../../components/DateTimePicker";
import { ThemedSafe } from "../../../components/ThemedSafe";
import { CustomBS } from "../../../components/BottomSheet/CustomBS";
import { IconTextInput } from "../../../components/IconTextInput";
import { LocationTile } from "../../../components/LocationTile";
import { ThemedMaterialIcons } from "../../../components/ThemedMaterialIcon";
import { CloseButtonBS } from "../../../components/CloseButtonBS";
import { TaskDetailsTile } from "../../../components/TaskDetailsTile";
import { ThemedFontAwesome } from "../../../components/ThemedFontAwesome";
import { ThemedFontAwesome6 } from "../../../components/ThemedFontAwesome6";
import { Loader } from "../../../components/Loader";
import { verifyAuth } from "../../../firebase/authCheck/verifyAuth";
import { saveTask } from "../../../firebase/create/saveTask";
import { saveImagesToFirebase } from "../../../firebase/create/saveImages";
import { alertActions } from "../../../redux/slice/slidingAlert";
import { checkInternetConnectivity } from "../../../netInfo";
import { updateTaskToFirestore } from "../../../firebase/update/updateTask";
import { UserDetails } from "../../../redux/slice/auth";
import { RootState } from "../../../redux/store";

type CreateTaskRouteProp = RouteProp<PrimaryStackParamList, "createTask">;

type ReusableScrollProps = {
  headerTitle: ReactNode | null;
  children: ReactNode;
};

const apiKey = "AIzaSyDVRsp7LueqZB-lS1fP5RaKeUwGLB6U8rY";
interface Location {
  lat: number;
  lng: number;
}
export interface Place {
  description: string;
  placeId: string | undefined;
  location: Location | undefined;
}

export type LocationDetails = {
  description: string | undefined;
  place_id: string | undefined;
};

type TimeOfDayProps = {
  id: string;
  title: string;
  subtitle: string;
  icon?: ReactNode;
};

type StatusTypes =
  | "open"
  | "completed"
  | "cancelled"
  | "assigned"
  | "unpaid"
  | "paid";

export type SaveDetailsProps = {
  id?: string;
  title: string | undefined;
  on_date: string | null;
  before_date: string | null;
  flexible_date: boolean;
  certain_time: TimeOfDayProps | undefined | null;
  online_job: boolean;
  location: Place | null;
  task_details: string | undefined;
  images?: string[];
  budget: string | undefined;
  status: StatusTypes;
  createdAt?: FirebaseFirestoreTypes.FieldValue;
  updatedAt?: FirebaseFirestoreTypes.FieldValue;
  createdBy?: string;
  postedBy?: string | null;
};

const GOOGLE = "google";
const PHOTO = "photo";
const CAMERA = "camera";

type CreateTaskProps = {
  edit?: boolean;
  editDetails?: SaveDetailsProps | null;
  onFinish?: () => void;
};

const CreateTask: React.FC<CreateTaskProps> = ({
  edit = false,
  editDetails = null,
  onFinish = () => {},
}) => {
  const dispatch = useDispatch();
  const currentTimeStamp = moment().valueOf();
  let route = null;
  if (!edit) {
    route = useRoute<CreateTaskRouteProp>();
  }
  const navigation = useNavigation<CustomPrimaryStackNavProp>();
  const { details: authDetails } = useSelector(
    (state: RootState) => state.auth
  );
  const theme = useColorScheme() ?? "light";
  const [step, setStep] = useState<number>(1);

  const [checked, setChecked] = useState<boolean>(false);
  const [showOnDate, setShowOnDate] = useState<boolean>(false);
  const [showBeforeDate, setShowBeforeDate] = useState<boolean>(false);
  const [onDate, setOnDate] = useState<string | null>(null);
  const [beforeDate, setBeforeDate] = useState<string | null>(null);
  const [flexibleTimings, setFlexibleTimings] = useState<boolean>(false);
  const [fromTimeStamp, setFromTimeStamp] = useState(currentTimeStamp);
  const [toTimeStamp, setToTimeStamp] = useState(currentTimeStamp);
  const [taskTitle, setTaskTitle] = useState<string | undefined>("");
  const [certainTime, setCertainTime] = useState<string | null>(null);

  // STEP 1 STATE
  const [step1Error, setStep1Error] = useState<boolean>(true);
  const [submitStep1, setSubmitStep1] = useState<boolean>(false);
  const [step1DateError, setStep1DateError] = useState<boolean>(true);

  // STEP 2 STATE
  const [selected, setSelected] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<Place | null>(null);
  const [searchText, setSearchText] = useState<string | undefined>("");
  const [locations, setLocations] = useState<LocationDetails[]>([]);
  const [submitStep2, setSubmitStep2] = useState<boolean>(false);
  const locationInputRef = useRef<TextInput>(null);
  const googleSearchRef = useRef<BottomSheetModal>(null);

  // STEP 3 STATE
  const [details, setDetails] = useState<string | undefined>("");
  const [images, setImages] = useState<string[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string[]>([]);
  const [submitStep3, setSubmitStep3] = useState<boolean>(false);
  const photoRef = useRef<BottomSheetModal>(null);

  // STEP 4 STATE
  const [budget, setBudget] = useState<string | undefined>("");
  const [submitStep4, setSubmitStep4] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);
  const [locationLoader, setLocationLoader] = useState<boolean>(false);
  const [percent, setPercent] = useState<string>("0%");

  const timeOfDay: TimeOfDayProps[] = [
    {
      id: "1",
      title: "Morning",
      subtitle: "Before 10am",
      icon: (
        <ThemedFeather
          size={getWidthnHeight(5)?.width}
          name="sunrise"
          color={Colors[theme]["iconColor"]}
        />
      ),
    },
    {
      id: "2",
      title: "Midday",
      subtitle: "10am - 2pm",
      icon: (
        <ThemedFeather
          size={getWidthnHeight(5)?.width}
          name="sun"
          color={Colors[theme]["iconColor"]}
        />
      ),
    },
    {
      id: "3",
      title: "Afternoon",
      subtitle: "2pm - 6pm",
      icon: (
        <ThemedMaterialCommunityIcons
          size={getWidthnHeight(5)?.width}
          name="weather-sunset"
          color={Colors[theme]["iconColor"]}
        />
      ),
    },
    {
      id: "4",
      title: "Evening",
      subtitle: "After 6pm",
      icon: (
        <ThemedIonicons
          size={getWidthnHeight(5)?.width}
          name="cloudy-night-outline"
          color={Colors[theme]["iconColor"]}
        />
      ),
    },
  ];

  const listing = [
    { id: "1", title: "Take a photo" },
    { id: "2", title: "Choose photo(s)" },
    { id: "3", title: "Cancel" },
  ];

  useEffect(() => {
    if (edit) {
      console.log("@@@ EDIT");
      setTaskTitle(editDetails?.title);
      setOnDate(
        editDetails?.on_date
          ? moment(editDetails?.on_date, "DD/MM/YYYY").format("ddd DD,MMM")
          : null
      );
      setOnDate(
        editDetails?.before_date
          ? moment(editDetails?.before_date, "DD/MM/YYYY").format("ddd DD,MMM")
          : null
      );
      setFlexibleTimings(editDetails?.flexible_date!);
      setChecked(!!editDetails?.certain_time);
      setCertainTime(
        editDetails?.certain_time ? editDetails?.certain_time?.id : null
      );
      setSelected(editDetails?.online_job ? 2 : 1);
      setSelectedLocation(editDetails?.location ?? null);
      setDetails(editDetails?.task_details);
      setBudget(editDetails?.budget);
    }
  }, [edit]);

  async function getCurrentLocation() {
    Keyboard.dismiss();
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    setLocationLoader(true);
    let location = await Location.getCurrentPositionAsync({});
    if (location?.coords?.latitude) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${apiKey}`
        );
        setLocationLoader(false);
        const data = response.data;
        if (Array.isArray(data?.results)) {
          const result = data.results[0];
          const address = result.formatted_address;
          const placeId = result.place_id;
          console.log("$$$ GEOCODING RESPONSE: ", address, placeId);
          setSelectedLocation({
            description: address,
            placeId: placeId,
            location: {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            },
          });
          closeBottomSheet();
        }
      } catch (error) {
        setLocationLoader(false);
        console.error("Error in reverse geocoding:", error);
      }
    }
  }

  function focusLocationInput() {
    locationInputRef.current?.focus();
  }

  function openBottomSheet(type = GOOGLE) {
    if (type === GOOGLE) {
      console.log("@@@ CALL");
      googleSearchRef.current?.present();
    } else if (type === PHOTO) {
      photoRef.current?.present();
    }
  }

  function closeBottomSheet(type = GOOGLE) {
    if (type === GOOGLE) {
      googleSearchRef.current?.close();
    } else if (type === PHOTO) {
      photoRef.current?.close();
    }
  }

  const fetchResults = async (searchQuery: string) => {
    try {
      if (!searchQuery) {
        return;
      }
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&types=geocode&key=${apiKey}`
      );
      const data = response.data;
      const predictions = data?.predictions;
      if (Array.isArray(predictions)) {
        const extractDetails = predictions.map((item) => ({
          description: item?.description,
          place_id: item?.place_id,
        }));
        setLocations(extractDetails);
        // console.log("@@@ RESPONSE: ", JSON.stringify(extractDetails, null, 4));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debouncedFetchResults = useCallback(
    _.debounce((text) => fetchResults(text), 1000), // 1000ms debounce delay
    []
  );

  async function fetchLocationCoords(item: LocationDetails) {
    Keyboard.dismiss();
    try {
      if (!item?.place_id) {
        return;
      }
      setLocationLoader(true);
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=${apiKey}`;
      console.log("$$$ LOCATION URL: ", url);
      const response = await axios.get(url);
      const data = response.data;
      // console.log("@@@ RESPONSE: ", JSON.stringify(data, null, 4));
      const location: Location = data?.result?.geometry?.location;
      if (location) {
        const locationData = {
          description: item.description!,
          placeId: item.place_id!,
          location: location,
        };
        setSelectedLocation(locationData);
        closeBottomSheet();
        console.log("@@@ RESPONSE: ", JSON.stringify(locationData, null, 4));
      }
      setLocationLoader(false);
    } catch (error) {
      setLocationLoader(false);
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (route && route?.params?.title) {
      setTaskTitle(route?.params.title);
    }
  }, []);

  useEffect(() => {
    checkStep1ForErrors();
  }, [
    onDate,
    beforeDate,
    flexibleTimings,
    taskTitle,
    submitStep1,
    checked,
    certainTime,
  ]);

  useEffect(() => {
    if (!searchText) {
      setLocations([]);
    }
  }, [searchText]);

  function checkStep1ForErrors() {
    const dateBoolean = (!!onDate || !!beforeDate || flexibleTimings) === false;
    setStep1DateError(dateBoolean);
    // console.log(
    //   "!!! DATE BOOLEAN: ",
    //   !!onDate,
    //   !!beforeDate,
    //   flexibleTimings,
    //   dateBoolean
    // );
    if (!taskTitle || dateBoolean || (checked && !certainTime)) {
      setStep1Error(true);
    } else {
      setStep1Error(false);
    }
  }

  const pickImage = async (type = PHOTO) => {
    // No permissions request is necessary for launching the image library
    let result: ImagePicker.ImagePickerResult;
    if (type === PHOTO) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 0.5,
        selectionLimit: 5,
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        selectionLimit: 1,
      });
    }

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;

      // Use Set to ensure no duplicates
      const updatedImages = Array.from(
        new Set([...(images || []), newImageUri])
      );

      console.log("^^^ Updated IMAGES: ", updatedImages);
      setImages(updatedImages);
    }
  };

  async function uploadImages() {
    setLoader(true);
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      try {
        const fileUri = String(image);
        const fileName = `${moment().valueOf()}-${fileUri.split("/").pop()}`;
        setPercent("0%");

        const url = await saveImagesToFirebase(
          `images/${fileName}`,
          image,
          (value: string) => {
            setPercent(value);
          }
        );
        setDownloadUrl((prevUrls) => [...prevUrls, url]);
        console.log("### DOWNLOAD URL: ", url);
      } catch (error) {
        setLoader(false);
        console.error(`Error uploading: `, error);
        // Optionally break the loop or handle errors as needed
      }
    }
  }

  useEffect(() => {
    if (downloadUrl.length === images.length && downloadUrl.length > 0) {
      console.log("^^^ DOWNLOAD URL: ", downloadUrl);
      compileDataObject();
    }
  }, [downloadUrl, images]);

  function compileDataObject() {
    try {
      const userDetails: UserDetails = JSON.parse(authDetails as string);
      const findCertainTime = timeOfDay.find((item) => item.id === certainTime);
      delete findCertainTime?.icon;
      const saveDetails: SaveDetailsProps = {
        title: taskTitle,
        on_date: onDate
          ? moment(onDate, "ddd DD,MMM").format("DD/MM/YYYY")
          : null,
        before_date: beforeDate
          ? moment(beforeDate, "ddd DD,MMM").format("DD/MM/YYYY")
          : null,
        flexible_date: flexibleTimings,
        certain_time: checked ? findCertainTime : null,
        online_job: selected === 2,
        location: selected === 1 ? selectedLocation : null,
        task_details: details,
        images: downloadUrl,
        budget: budget,
        status: "open",
        createdAt: firestore.FieldValue.serverTimestamp(),
        postedBy: userDetails?.user?.displayName || userDetails?.name || null,
      };
      if (edit) {
        delete saveDetails.createdAt;
        delete saveDetails.postedBy;
        if (
          Array.isArray(saveDetails?.images) &&
          saveDetails?.images.length === 0
        ) {
          delete saveDetails?.images;
        }
        saveDetails.id = editDetails?.id;
        updateTask(saveDetails);
        // console.log("@@@ UPDATE TASK: ", JSON.stringify(saveDetails, null, 4));
      } else {
        addTask(saveDetails);
      }
    } catch (error) {
      setLoader(false);
      console.error("!!! compileDataObject ERROR: ", error);
    }
  }

  const addTask = async (details: SaveDetailsProps) => {
    try {
      const taskRef = await saveTask(details);
      dispatch(
        alertActions.setAlert({
          visible: true,
          title: "Task saved to firestore database",
          subtitle: `#Task ID: ${taskRef.id}`,
          type: "success",
          timeout: 4000,
        })
      );
      console.log("Task added with ID: ", taskRef.id);
      navigation.goBack();
    } catch (error) {
      setLoader(false);
      console.error("Error adding task:", error);
      dispatch(
        alertActions.setAlert({
          visible: true,
          title: "Error!",
          subtitle: `${error}`,
          type: "error",
          marginTop: 5,
        })
      );
    } finally {
      () => {
        setLoader(false);
      };
    }
  };

  async function updateTask(details: SaveDetailsProps) {
    try {
      const taskRef = await updateTaskToFirestore(details);
      dispatch(
        alertActions.setAlert({
          visible: true,
          title: taskRef.title,
          subtitle: taskRef.subtitle,
          type: "success",
          timeout: 4000,
        })
      );
      onFinish();
    } catch (error) {
      setLoader(false);
      console.error("!!!Error updating task:", error);
      dispatch(
        alertActions.setAlert({
          visible: true,
          title: "Error!",
          subtitle: `${error}`,
          type: "error",
          marginTop: 5,
        })
      );
    } finally {
      () => {
        setLoader(false);
      };
    }
  }

  const Header: React.FC = () => {
    return (
      <View>
        {step < 5 && (
          <ThemedText
            style={[
              { paddingHorizontal: getWidthnHeight(4)?.width },
              fontSizeH4(),
            ]}
          >
            {`STEP ${step}/4`}
          </ThemedText>
        )}
        <View
          style={[
            {
              paddingHorizontal: getWidthnHeight(4)?.width,
            },
          ]}
        >
          {step === 1 && (
            <ThemedText
              style={[
                {
                  // lineHeight: -1,
                  fontFamily: "SquadaOne_400Regular",
                  color: Colors[theme]["iconColor"],
                  fontSize: fontSizeH2().fontSize + 4,
                },
                // fontSizeH2(),
              ]}
            >
              Let's start with the basics
            </ThemedText>
          )}
          {step === 2 && (
            <ThemedText
              style={[
                {
                  // lineHeight: -1,
                  fontFamily: "SquadaOne_400Regular",
                  color: Colors[theme]["iconColor"],
                  fontSize: fontSizeH2().fontSize + 4,
                },
                // fontSizeH2(),
              ]}
            >
              Tell us where
            </ThemedText>
          )}
          {step === 3 && (
            <ThemedText
              style={[
                {
                  fontFamily: "SquadaOne_400Regular",
                  color: Colors[theme]["iconColor"],
                  fontSize: fontSizeH2().fontSize + 4,
                },
                // fontSizeH2(),
              ]}
            >
              Provide more details
            </ThemedText>
          )}
          {step === 4 && (
            <ThemedText
              style={[
                {
                  fontFamily: "SquadaOne_400Regular",
                  color: Colors[theme]["iconColor"],
                  fontSize: fontSizeH2().fontSize + 4,
                },
                // fontSizeH2(),
              ]}
            >
              Suggest your budget?
            </ThemedText>
          )}
        </View>
      </View>
    );
  };

  const Footer: React.FC = () => {
    return (
      <View style={{ borderWidth: 0 }}>
        {step === 1 && (
          <FlatButton
            lightColor={Colors[theme]["yellow"]}
            darkColor={Colors[theme]["yellow"]}
            title="Next"
            onPress={() => {
              setSubmitStep1(true);
              if (!step1Error) {
                setStep(step + 1);
              }
            }}
            style={{ borderWidth: 0 }}
          />
        )}
        {step > 1 && step < 5 && (
          <View style={[]}>
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderWidth: 0,
                  borderColor: "red",
                },
              ]}
            >
              <FlatButton
                lightColor={Colors[theme]["yellow"]}
                darkColor={Colors[theme]["yellow"]}
                title="Back"
                onPress={() => setStep(step - 1)}
                style={{ borderWidth: 0, width: "50%" }}
              />
              {step <= 5 && (
                <FlatButton
                  lightColor={Colors[theme]["yellow"]}
                  darkColor={Colors[theme]["yellow"]}
                  title={"Next"}
                  onPress={() => {
                    if (step === 2) {
                      setSubmitStep2(true);
                      if (
                        (selected === 1 && selectedLocation) ||
                        selected === 2
                      ) {
                        setStep(step + 1);
                      }
                    } else if (step === 3) {
                      setSubmitStep3(true);
                      if (details) {
                        setStep(step + 1);
                      }
                    } else if (step === 4) {
                      setSubmitStep4(true);
                      if (budget) {
                        setStep(step + 1);
                      }
                    }
                  }}
                  style={{
                    borderWidth: 0,
                    width: "50%",
                    borderLeftWidth: 1,
                    borderLeftColor: Colors[theme]["iconColor"],
                  }}
                />
              )}
            </View>
          </View>
        )}
        {step === 5 && (
          <FlatButton
            lightColor={Colors[theme]["yellow"]}
            darkColor={Colors[theme]["yellow"]}
            title={edit ? "Update task" : "Post task"}
            onPress={async () => {
              const isConnected = await checkInternetConnectivity();
              if (!isConnected) {
                return;
              }
              const loggedIn = verifyAuth();
              if (loggedIn) {
                if (images.length > 0) {
                  uploadImages();
                } else {
                  setLoader(true);
                  compileDataObject();
                }
              }
            }}
            style={{ borderWidth: 0, width: "100%" }}
          />
        )}
      </View>
    );
  };

  return (
    <ThemedSafe colorType={edit ? "transparent" : "white"} style={{ flex: 1 }}>
      {!edit && theme === "light" && (
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
              getMarginBottom(13),
            ]}
          />
        </View>
      )}
      <View style={{ flex: 1, borderWidth: 0 }}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            borderWidth: 0,
          }}
          {...Platform.select({
            ios: {
              behavior: "padding",
              keyboardVerticalOffset: getWidthnHeight(undefined, 15.5)?.height,
            },
          })}
        >
          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1 }}>
              <Header />
              <View style={{ flex: 1, borderWidth: 0 }}>
                {step === 1 && (
                  <View
                    style={[
                      {
                        flex: 1,
                        paddingHorizontal: getWidthnHeight(4)?.width,
                      },
                    ]}
                  >
                    <View
                      style={[
                        {
                          flex: 1,
                        },
                      ]}
                    >
                      <FlatList
                        data={checked ? timeOfDay : []}
                        keyboardShouldPersistTaps={"always"}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                          let backgroundColor = `${Colors[theme]["gradeOut"]}E0`;
                          if (item.id === certainTime) {
                            backgroundColor = `${Colors[theme]["yellow"]}E0`;
                          }
                          return (
                            <ThemedView
                              style={[
                                {
                                  flex: 1,
                                  alignItems: "center",
                                  marginHorizontal: getWidthnHeight(2)?.width,
                                  borderRadius: getWidthnHeight(3)?.width,
                                  backgroundColor,
                                },
                                getMarginTop(2),
                              ]}
                            >
                              <TouchableOpacity
                                activeOpacity={0.7}
                                style={{
                                  flex: 1,
                                  alignItems: "center",
                                  width: "100%",
                                  height: "100%",
                                  paddingVertical: getWidthnHeight(4)?.width,
                                }}
                                onPress={() => setCertainTime(item.id)}
                              >
                                <>
                                  {item.icon}
                                  <ThemedText
                                    style={{
                                      fontSize: fontSizeH4().fontSize + 5,
                                      fontWeight: "500",
                                    }}
                                  >
                                    {item.title}
                                  </ThemedText>
                                  <ThemedText style={[fontSizeH4()]}>
                                    {item.subtitle}
                                  </ThemedText>
                                </>
                              </TouchableOpacity>
                            </ThemedView>
                          );
                        }}
                        ListHeaderComponent={useMemo(() => {
                          return (
                            <>
                              <View style={[getMarginTop(!edit ? 4 : 3)]}>
                                <ThemedText
                                  style={[
                                    {
                                      fontSize: fontSizeH4().fontSize + 4,
                                      fontWeight: "500",
                                    },
                                  ]}
                                >
                                  In a few words, what do you need done?
                                </ThemedText>
                                <View
                                  style={[
                                    {
                                      backgroundColor:
                                        Colors[theme]["screenBG"],
                                      borderRadius: getWidthnHeight(3)?.width,
                                      borderWidth:
                                        theme === "light"
                                          ? submitStep1 && !taskTitle
                                            ? 1
                                            : 0
                                          : 1,
                                      borderColor:
                                        submitStep1 && !taskTitle
                                          ? Colors[theme]["red"]
                                          : Colors[theme]["iconColor"],
                                    },
                                    getMarginTop(1.5),
                                  ]}
                                >
                                  <PrimaryInput
                                    containerStyle={{
                                      backgroundColor: "transparent",
                                    }}
                                    numberOfLines={1}
                                    value={taskTitle}
                                    style={{
                                      fontSize: fontSizeH4().fontSize + 4,
                                      marginVertical: getWidthnHeight(4)?.width,
                                      marginHorizontal:
                                        getWidthnHeight(4)?.width,
                                    }}
                                    placeholder="eg. Help me move sofa"
                                    placeholderTextColor={"darkGray"}
                                    onChangeText={(text) =>
                                      setTaskTitle(text.trimStart())
                                    }
                                  />
                                  {submitStep1 && !taskTitle && (
                                    <View>
                                      <ThemedText
                                        style={{
                                          position: "absolute",
                                          color: Colors[theme]["red"],
                                          fontSize: fontSizeH4().fontSize - 1,
                                        }}
                                      >
                                        *Task title is required
                                      </ThemedText>
                                    </View>
                                  )}
                                </View>
                              </View>
                              <View style={[getMarginTop(3)]}>
                                <ThemedText
                                  style={[
                                    {
                                      fontSize: fontSizeH4().fontSize + 4,
                                      fontWeight: "500",
                                    },
                                  ]}
                                >
                                  When do you need this done?
                                </ThemedText>
                                <View
                                  style={[
                                    {
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      // borderWidth: 1,
                                      // borderColor: "transparent",
                                    },
                                    getMarginTop(2),
                                  ]}
                                >
                                  <View>
                                    <RoundedDropdown
                                      title={
                                        onDate ? `On ${onDate}` : "On date"
                                      }
                                      onPress={() => setShowOnDate(true)}
                                      titleStyle={{
                                        fontSize:
                                          fontSizeH4().fontSize +
                                          (onDate ? 1 : 3),
                                      }}
                                      style={{
                                        borderWidth: 2,
                                        borderColor: Colors[theme]["iconColor"],
                                        paddingHorizontal:
                                          getWidthnHeight(2)?.width,
                                        paddingVertical:
                                          getWidthnHeight(1)?.width,
                                        borderRadius:
                                          getWidthnHeight(10)?.width,
                                        backgroundColor: onDate
                                          ? Colors[theme]["yellow"]
                                          : "transparent",
                                      }}
                                    />
                                    {showOnDate && (
                                      <View>
                                        <DateTimePicker
                                          value={moment(fromTimeStamp)
                                            .utc()
                                            .toDate()}
                                          display="default"
                                          minimumDate={moment(currentTimeStamp)
                                            .utc()
                                            .toDate()}
                                          onChange={(event, date) => {
                                            if (event.type === "dismissed") {
                                              setShowOnDate(!showOnDate);
                                              return;
                                            }
                                            setFlexibleTimings(false);
                                            setBeforeDate(null);
                                            const timeStamp =
                                              event.nativeEvent.timestamp;
                                            setFromTimeStamp(timeStamp);
                                            if (Platform.OS === "android") {
                                              setShowOnDate(!showOnDate);
                                              setOnDate(
                                                moment(date).format(
                                                  "ddd DD,MMM"
                                                )
                                              );
                                              if (fromTimeStamp > toTimeStamp) {
                                                setBeforeDate(null);
                                              }
                                            }
                                            Keyboard.dismiss();
                                          }}
                                        />
                                      </View>
                                    )}
                                  </View>
                                  <View>
                                    <RoundedDropdown
                                      title={
                                        beforeDate
                                          ? `Before ${beforeDate}`
                                          : "Before date"
                                      }
                                      onPress={() => setShowBeforeDate(true)}
                                      titleStyle={{
                                        fontSize:
                                          fontSizeH4().fontSize +
                                          (beforeDate ? 1 : 3),
                                      }}
                                      style={{
                                        borderWidth: 2,
                                        borderColor: Colors[theme]["iconColor"],
                                        paddingHorizontal:
                                          getWidthnHeight(2)?.width,
                                        paddingVertical:
                                          getWidthnHeight(1)?.width,
                                        borderRadius:
                                          getWidthnHeight(10)?.width,
                                        backgroundColor: beforeDate
                                          ? Colors[theme]["yellow"]
                                          : "transparent",
                                      }}
                                    />
                                    {showBeforeDate && (
                                      <View>
                                        <DateTimePicker
                                          value={moment(toTimeStamp)
                                            .utc()
                                            .toDate()}
                                          display="default"
                                          minimumDate={moment(currentTimeStamp)
                                            .add(1, "day")
                                            .utc()
                                            .toDate()}
                                          onChange={(event, date) => {
                                            if (event.type === "dismissed") {
                                              setShowBeforeDate(
                                                !showBeforeDate
                                              );
                                              return;
                                            }
                                            setFlexibleTimings(false);
                                            setOnDate(null);
                                            const timeStamp =
                                              event.nativeEvent.timestamp;
                                            setToTimeStamp(timeStamp);
                                            if (Platform.OS === "android") {
                                              setShowBeforeDate(
                                                !showBeforeDate
                                              );
                                              setBeforeDate(
                                                moment(date).format(
                                                  "ddd DD,MMM"
                                                )
                                              );
                                            }
                                            Keyboard.dismiss();
                                          }}
                                        />
                                      </View>
                                    )}
                                  </View>
                                  <RoundedDropdown
                                    title={"I'm flexible"}
                                    onPress={() => {
                                      setOnDate(null);
                                      setBeforeDate(null);
                                      setFlexibleTimings(true);
                                    }}
                                    iconSize={null}
                                    titleStyle={{
                                      fontSize: fontSizeH4().fontSize + 3,
                                    }}
                                    style={{
                                      borderWidth: 2,
                                      borderColor: Colors[theme]["iconColor"],
                                      backgroundColor: flexibleTimings
                                        ? Colors[theme]["yellow"]
                                        : "transparent",
                                      paddingHorizontal:
                                        getWidthnHeight(2)?.width,
                                      paddingVertical:
                                        getWidthnHeight(1.5)?.width,
                                      borderRadius: getWidthnHeight(10)?.width,
                                    }}
                                  />
                                </View>
                                {submitStep1 && step1DateError && (
                                  <View>
                                    <ThemedText
                                      style={{
                                        position: "absolute",
                                        color: Colors[theme]["red"],
                                        fontSize: fontSizeH4().fontSize - 1,
                                      }}
                                    >
                                      *Date is required
                                    </ThemedText>
                                  </View>
                                )}
                                <View
                                  style={[
                                    {
                                      flexDirection: "row",
                                      alignItems: "center",
                                    },
                                    getMarginTop(3),
                                  ]}
                                >
                                  <Checkbox
                                    value={checked}
                                    onValueChange={() => {
                                      if (checked) {
                                        setCertainTime(null);
                                      }
                                      setChecked(!checked);
                                    }}
                                  />
                                  <ThemedText style={getMarginLeft(3)}>
                                    I need certain time of day
                                  </ThemedText>
                                </View>
                              </View>
                              {checked && submitStep1 && !certainTime && (
                                <View>
                                  <ThemedText
                                    style={{
                                      position: "absolute",
                                      color: Colors[theme]["red"],
                                      fontSize: fontSizeH4().fontSize - 1,
                                    }}
                                  >
                                    *Please select certain time
                                  </ThemedText>
                                </View>
                              )}
                            </>
                          );
                        }, [
                          taskTitle,
                          theme,
                          submitStep1,
                          edit,
                          flexibleTimings,
                          onDate,
                          beforeDate,
                          showOnDate,
                          showBeforeDate,
                          fromTimeStamp,
                          toTimeStamp,
                          currentTimeStamp,
                          checked,
                          certainTime,
                        ])}
                      />
                    </View>
                  </View>
                )}
                {step === 2 && (
                  <Step2
                    selected={selected}
                    setSelected={setSelected}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    submitStep2={submitStep2}
                    openBottomSheet={() => openBottomSheet()}
                  />
                )}
                {step === 3 && (
                  <Step3
                    details={details}
                    images={images}
                    setDetails={setDetails}
                    setImages={setImages}
                    submitStep3={submitStep3}
                    onPress={() => openBottomSheet(PHOTO)}
                  />
                )}
                {step === 4 && (
                  <Step4
                    budget={budget}
                    setBudget={setBudget}
                    submitStep4={submitStep4}
                  />
                )}
                {step === 5 && (
                  <View
                    style={[
                      {
                        flex: 1,
                        paddingHorizontal: getWidthnHeight(4)?.width,
                      },
                    ]}
                  >
                    <ThemedText
                      style={[
                        {
                          // lineHeight: -1,
                          fontFamily: "SquadaOne_400Regular",
                          color: Colors[theme]["iconColor"],
                          fontSize: fontSizeH2().fontSize + 4,
                        },
                        // fontSizeH2(),
                      ]}
                    >
                      {!edit
                        ? "Alright, ready to get offers?"
                        : "Ok! Making some tweaks?"}
                    </ThemedText>
                    <View style={[getMarginTop(1)]}>
                      <ThemedText
                        style={[
                          {
                            fontSize: fontSizeH4().fontSize + 4,
                            fontWeight: "500",
                          },
                        ]}
                      >
                        {`${
                          edit ? "Update" : "Post"
                        } the task when you're ready`}
                      </ThemedText>
                    </View>
                    <TaskDetailsTile
                      title={taskTitle}
                      onPress={() => setStep(1)}
                      leftIcon={
                        <ThemedMaterialCommunityIcons
                          name="clipboard-text-outline"
                          size={getWidthnHeight(6)?.width}
                          lightColor={Colors.light.iconColor}
                          darkColor={Colors.dark.white}
                        />
                      }
                      style={[
                        {
                          shadowColor: Colors[theme]["black"],
                          backgroundColor:
                            theme === "light"
                              ? Colors.light.yellow
                              : Colors.dark.primary,
                        },
                        getMarginTop(2),
                      ]}
                    />
                    <TaskDetailsTile
                      title={
                        onDate
                          ? `On ${onDate}`
                          : beforeDate
                          ? `Before ${beforeDate}`
                          : flexibleTimings
                          ? "I'm flexible"
                          : ""
                      }
                      onPress={() => setStep(1)}
                      leftIcon={
                        <ThemedMaterialCommunityIcons
                          name={"calendar-text"}
                          size={getWidthnHeight(6)?.width}
                          lightColor={Colors.light.iconColor}
                          darkColor={Colors.dark.white}
                        />
                      }
                      style={[
                        {
                          shadowColor: Colors[theme]["black"],
                          backgroundColor:
                            theme === "light"
                              ? Colors.light.yellow
                              : Colors.dark.primary,
                        },
                        getMarginTop(2),
                      ]}
                    />
                    <TaskDetailsTile
                      title={
                        selected === 1
                          ? selectedLocation?.description
                          : "Online"
                      }
                      onPress={() => setStep(2)}
                      leftIcon={
                        <ThemedIonicons
                          name={"location-outline"}
                          size={getWidthnHeight(6)?.width}
                          lightColor={Colors.light.iconColor}
                          darkColor={Colors.dark.white}
                        />
                      }
                      style={[
                        {
                          shadowColor: Colors[theme]["black"],
                          backgroundColor:
                            theme === "light"
                              ? Colors.light.yellow
                              : Colors.dark.primary,
                        },
                        getMarginTop(2),
                      ]}
                    />
                    <TaskDetailsTile
                      title={details}
                      onPress={() => setStep(3)}
                      leftIcon={
                        <ThemedFontAwesome
                          name={"tasks"}
                          size={getWidthnHeight(6)?.width}
                          lightColor={Colors.light.iconColor}
                          darkColor={Colors.dark.white}
                        />
                      }
                      style={[
                        {
                          shadowColor: Colors[theme]["black"],
                          backgroundColor:
                            theme === "light"
                              ? Colors.light.yellow
                              : Colors.dark.primary,
                        },
                        getMarginTop(2),
                      ]}
                    />
                    <TaskDetailsTile
                      title={budget}
                      onPress={() => setStep(4)}
                      leftIcon={
                        <ThemedFontAwesome6
                          name={"dollar"}
                          size={getWidthnHeight(6)?.width}
                          lightColor={Colors.light.iconColor}
                          darkColor={Colors.dark.white}
                        />
                      }
                      style={[
                        {
                          shadowColor: Colors[theme]["black"],
                          backgroundColor:
                            theme === "light"
                              ? Colors.light.yellow
                              : Colors.dark.primary,
                        },
                        getMarginTop(2),
                      ]}
                    />
                  </View>
                )}
              </View>
              <Footer />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>

      {/* Google Places Bottom Sheet */}
      <CustomBS
        ref={googleSearchRef}
        onOpen={focusLocationInput}
        stackBehavior={"push"}
        snapPoints={["85%"]}
        bsStyle={{
          borderTopLeftRadius: getWidthnHeight(5)?.width,
          borderTopRightRadius: getWidthnHeight(5)?.width,
          // borderWidth: 4,
        }}
        handleComponent={() => (
          <View style={[{ alignItems: "center" }, getMarginTop(-7)]}>
            <CloseButtonBS onPress={() => closeBottomSheet()} />
          </View>
        )}
        {...Platform.select({
          ios: {
            index: 1,
          },
        })}
      >
        <View
          style={[
            { flex: 1, alignItems: "center", borderWidth: 0 },
            getWidthnHeight(100),
          ]}
        >
          <IconTextInput
            ref={locationInputRef}
            value={searchText}
            onChangeText={(text) => {
              const value = text.trimStart();
              setSearchText(value);
              debouncedFetchResults(value);
            }}
            onClear={() => {
              setSearchText("");
              setLocations([]);
            }}
            containerStyle={[
              { width: "90%", borderWidth: 0 },
              getMarginVertical(2),
            ]}
            icon={
              <ThemedIonicons
                name="location"
                colorType={"iconColor"}
                size={getWidthnHeight(7)?.width}
              />
            }
            placeholder="Enter your postcode"
            placeholderTextColor={"darkGray"}
            style={{
              flex: 1,
              paddingHorizontal: getWidthnHeight(3)?.width,
              marginVertical: getWidthnHeight(2)?.width,
              marginHorizontal: getWidthnHeight(1)?.width,
              fontSize: fontSizeH4().fontSize + 5,
              height: "100%",
            }}
          />
          <View
            style={[{ alignItems: "center", borderWidth: 0, width: "100%" }]}
          >
            <BottomSheetFlatList
              keyboardShouldPersistTaps="always"
              data={locations}
              style={[{ width: "90%" }]}
              keyExtractor={(item) => item.place_id!}
              ListFooterComponent={() => (
                <LocationTile
                  icon={
                    <ThemedMaterialIcons
                      name="my-location"
                      colorType={"iconColor"}
                      size={getWidthnHeight(7)?.width}
                    />
                  }
                  item={{
                    description: "Use current location",
                    place_id: "none",
                  }}
                  onPress={getCurrentLocation}
                />
              )}
              renderItem={({ item }) => {
                return (
                  <LocationTile
                    item={item}
                    onPress={() => fetchLocationCoords(item)}
                  />
                );
              }}
            />
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                },
                getMarginTop(1),
              ]}
            >
              <ThemedText
                lightColor={Colors.light.black}
                darkColor={Colors.dark.white}
              >
                Powered by
              </ThemedText>
              <Image
                source={require("../../../assets/google2.png")}
                resizeMode="contain"
                style={[
                  {
                    width: getWidthnHeight(15)?.width,
                    height: "100%",
                  },
                  getMarginTop(0.4),
                ]}
              />
            </View>
          </View>
        </View>
      </CustomBS>

      {/* Attachment Bottom Sheet */}
      <CustomBS
        ref={photoRef}
        stackBehavior="push"
        snapPoints={["25%"]}
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
        <View>
          {listing.map((item, index) => {
            return (
              <TouchableOpacity
                key={`list${item.id}`}
                style={{ borderColor: "red", borderWidth: 0 }}
                onPress={() => {
                  if (item.id === "1") {
                    pickImage(CAMERA);
                  } else if (item.id === "2") {
                    pickImage(PHOTO);
                  }
                  closeBottomSheet(PHOTO);
                }}
              >
                <ThemedText
                  style={{
                    color: Colors[theme]["buttonBorder"],
                    fontSize: fontSizeH4().fontSize + 3,
                    padding: getWidthnHeight(5)?.width,
                  }}
                >
                  {item.title}
                </ThemedText>
              </TouchableOpacity>
            );
          })}
        </View>
      </CustomBS>
      <Loader
        visible={loader}
        transparent
        title={
          downloadUrl.length < images.length + 1 && images.length > 0
            ? "Uploading Images"
            : edit
            ? "Updating task"
            : "Saving task"
        }
        details={
          downloadUrl.length < images.length + 1 && images.length > 0 ? (
            <View style={[getMarginTop(1)]}>
              <Text
                style={[
                  {
                    fontSize: fontSizeH3().fontSize - 2,
                    color: Colors.light.white,
                    fontWeight: "500",
                  },
                ]}
              >
                {`${downloadUrl.length} of ${images.length}`}
              </Text>
              <View style={[{ borderWidth: 1, width: "100%" }]}>
                <Text
                  style={[
                    {
                      textAlign: "center",
                      position: "absolute",
                      fontSize: fontSizeH3().fontSize + 10,
                      color: Colors.light.white,
                      fontWeight: "500",
                      // borderWidth: 1,
                    },
                    getMarginTop(5),
                  ]}
                >
                  {percent}
                </Text>
              </View>
            </View>
          ) : undefined
        }
      />
      <Loader
        visible={locationLoader}
        transparent
        title={"Fetching location"}
      />
    </ThemedSafe>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowColor:
      Platform.OS === "ios"
        ? `${Colors.light["iconColor"]}8F`
        : Colors.light["iconColor"],
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: getWidthnHeight(0.3)?.width!,
    },
  },
});

export { CreateTask };
