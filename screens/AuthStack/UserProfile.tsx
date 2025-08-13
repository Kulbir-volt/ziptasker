import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import {
  fontSizeH2,
  fontSizeH4,
  getMarginBottom,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { IconTextInput } from "../../components/IconTextInput";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { LoginTypesStackParamList } from "../NoAuthStack";
import { ThemedFontAwesome } from "../../components/ThemedFontAwesome";
import { ThemedEntypo } from "../../components/ThemedEntypo";
import { FlatButton } from "../../components/Buttons/FlatButton";
import { ThemedSafe } from "../../components/ThemedSafe";
import { CustomBS } from "../../components/BottomSheet/CustomBS";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { listing } from "./CreateTask/CreateTask";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import { saveImagesToFirebase } from "../../firebase/create/saveImages";
import { Loader } from "../../components/Loader";
import { saveUserToFirebase } from "../../firebase/create/saveUser";
import {
  LoggedInUserDetailsProps,
  LoginResponseProps,
} from "../NoAuthStack/OtpVerify";
import { authActions } from "../../redux/slice/auth";
import { PrimaryStackParamList } from ".";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../../redux/store";

type UserProfileProps = StackScreenProps<PrimaryStackParamList, "userProfile">;

const PHOTO = "photo";
const CAMERA = "camera";

const UserProfile: React.FC<UserProfileProps> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { details } = useSelector((state: RootState) => state.auth);
  const photoRef = useRef<BottomSheetModal>(null);
  const [image, setImage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [userProfileDetails, setUserProfileDetails] =
    useState<LoginResponseProps | null>(null);
  const theme = useColorScheme() ?? "light";

  const [fullName, setFullName] = useState<string | null>(
    userProfileDetails?.user?.displayName ?? ""
  );
  const [phone, setPhone] = useState<string | null>(
    userProfileDetails?.user?.phoneNumber ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(
    userProfileDetails?.user?.email ?? ""
  );
  const [emailError, setEmailError] = useState(
    userProfileDetails?.user?.email ? false : true
  );

  useEffect(() => {
    // AsyncStorage.clear();
    const parsedData: LoginResponseProps = JSON.parse(details as string);
    setUserProfileDetails(parsedData);
    console.log("^^^ parsedData: ", parsedData);
    const { user } = parsedData;
    setFullName(user.displayName ?? "");
    setPhone(user?.phoneNumber);
    setEmail(user?.email ?? "");
    setEmailError(user?.email ? false : true);
  }, [details]);

  const pickImage = async (type = PHOTO) => {
    // No permissions request is necessary for launching the image library
    let result: ImagePicker.ImagePickerResult;
    if (type === PHOTO) {
      try {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          aspect: [4, 3],
          quality: 0.5,
          selectionLimit: 1,
          allowsEditing: true,
        });
        if (!result.canceled) {
          const newImageUri = result.assets[0].uri;
          console.log("^^^ Updated IMAGES: ", newImageUri);
          setImage(newImageUri);
        }
      } catch (error) {
        console.log("!!! PHOTO ERROR: ", error);
      }
    } else {
      try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permission Required",
            "You need to grant camera roll permissions to pick an image."
          );
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          selectionLimit: 1,
        });
        if (!result.canceled) {
          const newImageUri = result.assets[0].uri;
          console.log("^^^ Updated IMAGES: ", newImageUri);
          setImage(newImageUri);
        }
      } catch (error) {
        console.log("!!! CAMERA ERROR: ", error);
      }
    }
  };

  function openBottomSheet(sheetRef: BottomSheetModal) {
    sheetRef.present();
  }

  function closeBottomSheet(sheetRef: BottomSheetModal) {
    sheetRef.close();
  }

  async function uploadImage() {
    if (!image) {
      saveUserDetails();
      return;
    }
    setLoading(true);
    const fileUri = String(image);
    const fileName = `${moment().valueOf()}-${fileUri.split("/").pop()}`;

    const url = await saveImagesToFirebase(
      `images/profile/${fileName}`,
      image,
      (value: string) => {
        // setPercent(value);
      }
    );
    setLoading(false);
    setDownloadUrl(url);
  }

  function saveUserDetails() {
    setLoading(true);
    const userDetails: LoggedInUserDetailsProps = {
      phoneNumber: phone,
      uid: userProfileDetails?.user?.uid,
      providerId:
        userProfileDetails?.additionalUserInfo?.providerId ||
        userProfileDetails?.user?.providerId,
      photoURL: downloadUrl,
      displayName: fullName?.trim(),
      email: email,
      emailVerified: userProfileDetails?.user?.emailVerified,
    };
    if (!image) {
      delete userDetails.photoURL;
    }
    console.log("^^^ User Details: ", userDetails);
    saveUserToFirebase(userDetails)
      .then((saved) => {
        setLoading(false);
        if (saved) {
          console.log("@@@ User details saved successfully");
          const data: LoginResponseProps = {
            additionalUserInfo: userProfileDetails?.additionalUserInfo,
            user: userDetails,
          };
          const stringifyData = JSON.stringify(data);
          AsyncStorage.setItem("userData", stringifyData);
          dispatch(authActions.setIsNewUser(false));
          navigation.reset({
            index: 0,
            routes: [{ name: "tabs" }],
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("!!! USER SAVE ERROR: ", error);
      });
  }

  useEffect(() => {
    if (downloadUrl) {
      saveUserDetails();
    }
  }, [downloadUrl]);

  return (
    <ThemedSafe
      edges={["left", "right", "bottom"]}
      style={{ flex: 1, borderWidth: 0 }}
    >
      <ThemedView style={{ flex: 1, borderWidth: 0 }}>
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
            source={require("../../assets/my_profile.jpg")}
            resizeMode="cover"
            style={[
              {
                width: getWidthnHeight(100)?.width,
                height: getWidthnHeight(75)?.width,
              },
              getMarginBottom(10),
            ]}
          />
        </View>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            borderWidth: 0,
          }}
          {...Platform.select({
            ios: {
              behavior: "padding",
              keyboardVerticalOffset: getWidthnHeight(undefined, 10.5)?.height,
            },
          })}
        >
          <ScrollView bounces={false}>
            <View style={{ flex: 1 }}>
              <ThemedView
                colorType={"yellow"}
                style={{
                  alignItems: "center",
                  paddingVertical: getWidthnHeight(5)?.width,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    if (photoRef.current) {
                      openBottomSheet(photoRef.current);
                    }
                  }}
                >
                  <View
                    style={{
                      // width: getWidthnHeight(30)?.width,
                      // height: getWidthnHeight(30)?.width,
                      padding: getWidthnHeight(1)?.width,
                      borderRadius: getWidthnHeight(20)?.width,
                      borderWidth: getWidthnHeight(0.5)?.width,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {userProfileDetails?.user?.photoURL || image ? (
                      <Image
                        source={{
                          uri: userProfileDetails?.user?.photoURL! ?? image,
                        }}
                        resizeMode="contain"
                        style={{
                          width: getWidthnHeight(28)?.width,
                          height: getWidthnHeight(28)?.width,
                          borderRadius: getWidthnHeight(14)?.width,
                        }}
                      />
                    ) : (
                      <ThemedFontAwesome
                        name="user-circle"
                        size={getWidthnHeight(28)?.width}
                        colorType={"blackShade"}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      alignSelf: "flex-end",
                      bottom: 0,
                    }}
                  >
                    <ThemedView
                      style={{
                        padding: getWidthnHeight(2)?.width,
                        borderRadius: getWidthnHeight(5)?.width,
                      }}
                    >
                      <ThemedEntypo
                        name="camera"
                        size={getWidthnHeight(7)?.width}
                        colorType={"blackShade"}
                      />
                    </ThemedView>
                  </View>
                </TouchableOpacity>
              </ThemedView>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: getWidthnHeight(3)?.width,
                }}
              >
                <ThemedText
                  numberOfLines={2}
                  style={[
                    {
                      fontSize: fontSizeH4().fontSize + 4,
                    },
                    getMarginTop(2),
                  ]}
                >
                  Please provide the details below:
                </ThemedText>
                <View style={getMarginTop(2)}>
                  <ThemedView colorType={"black"} style={styles.titleContainer}>
                    <ThemedText colorType={"white"}>Name</ThemedText>
                  </ThemedView>
                  <IconTextInput
                    value={fullName ?? ""}
                    autoCapitalize="words"
                    onChangeText={(text) => setFullName(text.trimStart())}
                    containerStyle={[
                      {
                        width: "100%",
                        borderWidth: 0,
                      },
                      getMarginVertical(1),
                    ]}
                    showClearIcon={false}
                    icon={null}
                    placeholder="Full Name"
                    placeholderTextColor={"darkGray"}
                    style={{
                      flex: 1,
                      paddingVertical: getWidthnHeight(2)?.width,
                      textAlignVertical: "center",
                      fontSize: fontSizeH4().fontSize + 5,
                      borderWidth: 0,
                    }}
                  />
                </View>
                <View style={getMarginTop(1)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ThemedView
                      colorType={"black"}
                      style={styles.titleContainer}
                    >
                      <ThemedText colorType={"white"}>Phone</ThemedText>
                    </ThemedView>
                    {userProfileDetails &&
                      userProfileDetails?.user.providerId !== "firebase" && (
                        <ThemedText>(Optional)</ThemedText>
                      )}
                  </View>
                  <IconTextInput
                    value={phone ?? ""}
                    multiline
                    keyboardType={"phone-pad"}
                    editable={
                      userProfileDetails &&
                      userProfileDetails.user.providerId === "firebase"
                        ? false
                        : true
                    }
                    onChangeText={(text) =>
                      setPhone(text.replace(/[^0-9]/g, ""))
                    }
                    containerStyle={[
                      {
                        width: "70%",
                        borderWidth: 0,
                      },
                      getMarginVertical(1),
                    ]}
                    showClearIcon={false}
                    icon={null}
                    placeholder="Phone"
                    placeholderTextColor={"darkGray"}
                    style={{
                      flex: 1,
                      paddingVertical: getWidthnHeight(2)?.width,
                      textAlignVertical: "center",
                      fontSize: fontSizeH4().fontSize + 5,
                      borderWidth: 0,
                    }}
                  />
                </View>
                <View style={getMarginTop(1)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ThemedView
                      colorType={"black"}
                      style={styles.titleContainer}
                    >
                      <ThemedText colorType={"white"}>Email</ThemedText>
                    </ThemedView>
                    {userProfileDetails &&
                      userProfileDetails?.user.providerId === "firebase" && (
                        <ThemedText>(Optional)</ThemedText>
                      )}
                  </View>
                  <IconTextInput
                    value={email ?? ""}
                    multiline
                    onChangeText={(text) => {
                      const check =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      if (check.test(String(text).toLowerCase())) {
                        setEmail(text);
                        setEmailError(false);
                      } else {
                        setEmail(text);
                        setEmailError(true);
                      }
                    }}
                    containerStyle={[
                      {
                        width: "100%",
                        borderWidth: 0,
                      },
                      getMarginVertical(1),
                    ]}
                    showClearIcon={false}
                    icon={null}
                    placeholder="Email"
                    placeholderTextColor={"darkGray"}
                    style={{
                      flex: 1,
                      paddingVertical: getWidthnHeight(2)?.width,
                      textAlignVertical: "center",
                      fontSize: fontSizeH4().fontSize + 5,
                      borderWidth: 0,
                    }}
                  />
                  {email && emailError && (
                    <ThemedText colorType={"red"}>Invalid email</ThemedText>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          <FlatButton
            title={"Save"}
            colorType={fullName && fullName.length >= 3 ? "yellow" : "gradeOut"}
            onPress={() => {
              if (email && emailError) {
                return;
              }
              console.log(
                "^^^ Saving user details: ",
                JSON.stringify(userProfileDetails, null, 4)
              );
              if (
                userProfileDetails &&
                (userProfileDetails?.additionalUserInfo?.providerId ===
                  "phone" ||
                  userProfileDetails?.user?.providerId === "firebase")
              ) {
                if (fullName && phone) {
                  uploadImage();
                }
              }
            }}
            style={{
              paddingVertical: getWidthnHeight(1)?.width,
              marginHorizontal: getWidthnHeight(3)?.width,
              borderRadius: getWidthnHeight(10)?.width,
            }}
          />
        </KeyboardAvoidingView>
      </ThemedView>
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
                  if (photoRef.current) {
                    closeBottomSheet(photoRef.current);
                  }
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
      <Loader visible={loading} transparent title={"Saving user details"} />
    </ThemedSafe>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    alignSelf: "flex-start",
    paddingVertical: getWidthnHeight(1)?.width,
    paddingHorizontal: getWidthnHeight(2)?.width,
    borderRadius: getWidthnHeight(5)?.width,
  },
});

export { UserProfile };
