import React, {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  SendProps,
  Bubble,
  BubbleProps,
  Time,
  TimeProps,
  Avatar,
  AvatarProps,
  ActionsProps,
} from "react-native-gifted-chat";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import * as ImagePicker from "expo-image-picker";

import { ThemedView } from "../../components/ThemedView";
import {
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginRight,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { ThemedText } from "../../components/ThemedText";
import { IconTextInput } from "../../components/IconTextInput";
import { ThemedIonicons } from "../../components/ThemedIonicons";
import { MessageComponent } from "../../components/MessageComponent";
import { ThemedMaterialIcons } from "../../components/ThemedMaterialIcon";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ThemedMaterialCommunityIcons } from "../../components/ThemedMaterialCommunityIcon";
import { Conversation } from "../../components/Converstation";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CustomBS } from "../../components/BottomSheet/CustomBS";
import { FlatButton } from "../../components/Buttons/FlatButton";
import { PrimaryInput } from "../../components/PrimaryInput";
import { ThemedSafe } from "../../components/ThemedSafe";
import { PrimaryStackParamList } from ".";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import { checkInternetConnectivity } from "../../netInfo";
import { listing, SaveDetailsProps } from "./CreateTask/CreateTask";
import { verifyAuth } from "../../firebase/authCheck/verifyAuth";
import { defaultUserImage } from "../../firebase/create/saveQuestion";

type PvtMessageProps = {
  title?: string;
  subtitle?: string;
};

const PHOTO = "photo";
const CAMERA = "camera";

const PvtMessage: React.FC = () => {
  type PvtMessageRouteProp = RouteProp<PrimaryStackParamList, "pvtMessage">;
  const theme = useColorScheme() ?? "light";
  const navigation = useNavigation();
  const bookRef = useRef<BottomSheetModal>(null);
  const photoRef = useRef<BottomSheetModal>(null);
  const route = useRoute<PvtMessageRouteProp>();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [messageText, setMessageText] = useState<string>("");

  const { userId, recipientId, bookAgain, chatId, chatDetails } = route?.params;

  // console.log("&&& CHATID: ", chatId);

  function openBottomSheet(sheetRef: BottomSheetModal) {
    sheetRef.present();
  }

  function closeBottomSheet(sheetRef: BottomSheetModal) {
    sheetRef.close();
  }

  const pickImage = async (type = PHOTO) => {
    // No permissions request is necessary for launching the image library
    let result: ImagePicker.ImagePickerResult;
    if (type === PHOTO) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        aspect: [4, 3],
        quality: 0.5,
        selectionLimit: 1,
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
      sendImageMessage(newImageUri);
      // Use Set to ensure no duplicates
      // const updatedImages = Array.from(
      //   new Set([...(images || []), newImageUri])
      // );

      // console.log("^^^ Updated IMAGES: ", newImageUri);
      // setImages(updatedImages);
    }
  };

  const chatsRef = firestore()
    .collection("chats")
    .doc(chatId)
    .collection("messages");

  useEffect(() => {
    const unsubscribe = chatsRef
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const messagesFirestore: IMessage[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              _id: doc.id,
              text: data.text,
              createdAt: data?.createdAt?.toDate(),
              seen: data?.seen ?? false,
              user: {
                _id: data?.senderId,
                // avatar: data?.avatar,
              },
              image: data?.image,
            };
          });
          // console.log("^^^ CHAT: ", messagesFirestore);
          setMessages(messagesFirestore);
        }
      });

    return () => unsubscribe();
  }, []);

  const sendImageMessage = async (imageUri: string) => {
    const newMessage: IMessage = {
      _id: uuidv4(),
      createdAt: new Date(),
      user: {
        _id: auth().currentUser?.uid!, // Current user ID
      },
      image: imageUri, // Use local image URI
      text: "",
    };
    console.log("&&& IMAGE MESSAGE: ", newMessage);
    const { isConnected } = await checkInternetConnectivity();
    const isAuthenticated = verifyAuth();
    const { _id, createdAt, text, image, user } = newMessage;
    if (isConnected && isAuthenticated) {
      try {
        chatsRef.doc(`${_id}`).set({
          senderId: userId,
          recipientId,
          image,
          text,
          createdAt,
          seen: false,
          seenAt: null,
          user,
          // avatar: user?.avatar,
        });
        setMessages((prevMessages) =>
          GiftedChat.append(prevMessages, [newMessage])
        );
      } catch (error) {
        console.log("!!! CHAT ERROR: ", error);
      }
    }
  };

  const sendMessage = useCallback(
    async (allMessages: IMessage[]) => {
      const { isConnected } = await checkInternetConnectivity();
      const isAuthenticated = verifyAuth();
      console.log("***$$$ STATUS: ", isConnected, isAuthenticated, allMessages);
      const { _id, createdAt, text, user } = allMessages[0] as IMessage;
      if (isConnected && isAuthenticated) {
        try {
          chatsRef.doc(`${_id}`).set({
            senderId: userId,
            recipientId,
            text,
            createdAt,
            seen: false,
            seenAt: null,
            // avatar: user?.avatar,
          });
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, allMessages)
          );
        } catch (error) {
          console.log("!!! CHAT ERROR: ", error);
        }
      }
    },
    [chatsRef, userId]
  );

  const renderInputToolbar = (props: any) => (
    <View
      style={{
        borderWidth: 0,
      }}
    >
      {/* {bookAgain && (
        <FlatButton
          title={"Book Ruchit again"}
          onPress={() => bookRef.current?.present()}
          style={[
            {
              marginHorizontal: getWidthnHeight(5)?.width,
              borderRadius: getWidthnHeight(10)?.width,
              marginBottom: getWidthnHeight(3)?.width,
            },
          ]}
        />
      )} */}
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: Colors[theme]["lightYellow"],
          // paddingVertical: getWidthnHeight(2)?.width,
        }}
        primaryStyle={{
          paddingVertical: getWidthnHeight(2)?.width,
          // backgroundColor: Colors[theme]["lightYellow"],
          borderWidth: 0,
        }}
      />
    </View>
  );

  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <View
        style={[
          // { flexDirection: "row", alignItems: "center" },
          Platform.select({
            ios: { top: getMarginTop(-0.35).marginTop },
          }),
        ]}
      >
        {/* <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: getWidthnHeight(1)?.width,
              paddingHorizontal: getWidthnHeight(2)?.width,
              borderWidth: 0,
            },
          ]}
        >
          <ThemedMaterialCommunityIcons
            name={"camera-plus"}
            size={getWidthnHeight(7)?.width}
            colorType={"iconColor"}
            onPress={() => {
              if (photoRef.current) {
                openBottomSheet(photoRef.current);
              }
            }}
          />
        </View> */}
        <Send alwaysShowSend {...props}>
          <ThemedText
            style={[
              {
                padding: getWidthnHeight(2)?.width,
                fontSize: fontSizeH4().fontSize + 5,
                fontWeight: "500",
                borderWidth: 0,
              },
            ]}
          >
            Send
          </ThemedText>
        </Send>
      </View>
    );
  };

  const renderBubble = (props: Readonly<BubbleProps<IMessage>>) => {
    const { currentMessage, user } = props;
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors[theme]["yellow"], // Sender's messages (blue)
            alignSelf: "flex-end",
            right: getWidthnHeight(0.7)?.width,
          },
          left: {
            backgroundColor: "#E5E5EA", // Recipient's messages (light gray)
            alignSelf: "flex-start",
            left: getWidthnHeight(-10)?.width,
          },
        }}
        textStyle={{
          right: {
            color: Colors[theme]["black"], // White text for sender's message
          },
          left: {
            color: Colors[theme]["black"], // Black text for recipient's message
          },
        }}
      />
    );
  };

  const renderTime = (props: TimeProps<IMessage>) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          right: {
            color: Colors[theme]["iconColor"],
          },
          left: {
            color: Colors[theme]["iconColor"],
          },
        }}
      />
    );
  };

  const renderAvatar = (props: AvatarProps<IMessage>) => {
    const { currentMessage, position } = props;
    if (!currentMessage) return null;
    let uri = defaultUserImage;
    if (currentMessage?.user?.avatar) {
      uri = currentMessage?.user?.avatar as string;
    }
    if (position === "right") {
      return (
        <View style={{ marginRight: 5, borderWidth: 0 }}>
          <Image
            source={{ uri: uri }}
            style={{
              width: getWidthnHeight(10)?.width,
              height: getWidthnHeight(10)?.width,
              borderRadius: getWidthnHeight(5)?.width,
            }}
            resizeMode="cover"
          />
        </View>
      );
    }

    // Normal recipient avatar (left side)
    return (
      <View style={{ marginLeft: 5 }}>
        <Image
          source={{ uri: uri }}
          style={{
            width: getWidthnHeight(10)?.width,
            height: getWidthnHeight(10)?.width,
            borderRadius: getWidthnHeight(5)?.width,
          }}
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderActions = (props: ActionsProps) => {
    return (
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: getWidthnHeight(1)?.width,
            paddingHorizontal: getWidthnHeight(2)?.width,
            borderWidth: 0,
          },
          getMarginBottom(0.5),
        ]}
      >
        <ThemedMaterialCommunityIcons
          name={"camera-plus"}
          size={getWidthnHeight(7)?.width}
          colorType={"iconColor"}
          onPress={() => {
            if (photoRef.current) {
              openBottomSheet(photoRef.current);
            }
          }}
        />
      </View>
    );
  };

  return (
    <ThemedSafe style={{ flex: 1 }}>
      <ThemedView
        style={{
          padding: getWidthnHeight(3)?.width,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.01,
        }}
      >
        <ThemedMaterialIcons
          name="keyboard-backspace"
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
          onPress={() => navigation.goBack()}
        />
        <View style={{ alignItems: "center" }}>
          <ThemedText
            style={{ fontWeight: "600", fontSize: fontSizeH4().fontSize + 6 }}
          >
            {userId !== chatDetails?.senderId
              ? chatDetails?.senderName
              : chatDetails?.taskDetails?.tasker_name}
          </ThemedText>
          <ThemedText
            colorType={"darkGray"}
            style={{ fontSize: fontSizeH4().fontSize }}
          >
            {/* Active 1 year ago */}
          </ThemedText>
        </View>
        <ThemedMaterialCommunityIcons
          name={"dots-horizontal"}
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
          onPress={() => {}}
        />
      </ThemedView>
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: getWidthnHeight(3)?.width!,
          borderTopWidth: 0.5,
          paddingVertical: getWidthnHeight(2)?.width!,
          elevation: 4,
          shadowColor:
            Platform.OS === "ios"
              ? `${Colors[theme]["lightBlack"]}80`
              : Colors[theme]["black"],
          shadowOpacity: 0.4,
          shadowRadius: 6,
          shadowOffset: {
            width: 0,
            height: getWidthnHeight(1)?.width!,
          },
        }}
      >
        <Image
          source={require("../../assets/lock.jpg")}
          resizeMode="contain"
          style={{
            width: getWidthnHeight(15)?.width,
            height: getWidthnHeight(15)?.width,
            borderRadius: getWidthnHeight(8)?.width,
          }}
        />
        <View style={{ flex: 1, paddingHorizontal: getWidthnHeight(3)?.width }}>
          <ThemedText
            numberOfLines={1}
            style={{ fontSize: fontSizeH4().fontSize + 5, fontWeight: "500" }}
          >
            {chatDetails?.taskDetails?.title}
          </ThemedText>
          <ThemedText
            colorType={"darkGray"}
            style={{ fontSize: fontSizeH4().fontSize + 2, fontWeight: "500" }}
          >
            {chatDetails?.taskDetails?.tasker_name}
          </ThemedText>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <ThemedText
            style={{ fontSize: fontSizeH4().fontSize + 5, fontWeight: "500" }}
          >
            {chatDetails?.taskDetails?.budget}
          </ThemedText>
          <ThemedText
            colorType={"darkGray"}
            style={{ fontSize: fontSizeH4().fontSize + 2, fontWeight: "500" }}
          >
            {chatDetails?.taskDetails?.status?.replace(/^\w/, (c) =>
              c.toUpperCase()
            )}
          </ThemedText>
        </View>
      </ThemedView>
      <View
        style={[
          {
            flex: 1,
            borderWidth: 0,
            // paddingHorizontal: getWidthnHeight(3)?.width,
          },
        ]}
      >
        <View style={[{ flex: 1, borderWidth: 0 }]}>
          <GiftedChat
            messages={messages}
            user={{
              _id: auth().currentUser?.uid!,
              // avatar: auth().currentUser?.photoURL || defaultUserImage,
            }}
            renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
            renderBubble={renderBubble}
            renderTime={renderTime}
            // renderMessageImage={() => null}
            // renderAvatar={renderAvatar}
            renderActions={renderActions}
            renderMessageImage={(props) => {
              return (
                <Image
                  source={{ uri: props.currentMessage.image }}
                  style={{
                    width: getWidthnHeight(50)?.width,
                    height: getWidthnHeight(50)?.width,
                    borderRadius: 10,
                  }}
                  resizeMode="cover"
                />
              );
            }}
            renderAvatarOnTop={false}
            showUserAvatar={false}
            onSend={(allMessages) => sendMessage(allMessages)}
          />
        </View>
      </View>
      <ThemedView colorType={"screenBG"}>
        {/* <PrimaryInput
          value={messageText}
          colorType={"commonScreenBG"}
          containerStyle={{
            marginHorizontal: getWidthnHeight(5)?.width,
            borderRadius: getWidthnHeight(2)?.width,
          }}
          placeholder="Private message to Ruchit D."
          placeholderTextColor={"gradeOut"}
          onChangeText={(text) => setMessageText(text.trimStart())}
          style={{
            margin: getWidthnHeight(4)?.width,
          }}
        /> */}
        {/* <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: getWidthnHeight(5)?.width,
            },
            getMarginVertical(1),
          ]}
        >
          <ThemedMaterialCommunityIcons
            name={"camera-plus"}
            size={getWidthnHeight(7)?.width}
            colorType={"iconColor"}
            onPress={() => {}}
          />
        </View> */}
      </ThemedView>
      <CustomBS ref={bookRef} snapPoints={["60%"]}>
        <ThemedView
          style={[{ flex: 1, alignItems: "center" }, getMarginTop(1)]}
        >
          <ThemedText
            style={{ fontSize: fontSizeH3().fontSize + 0, fontWeight: "500" }}
          >
            Book Ruchit again
          </ThemedText>
          <ThemedText style={[{ textAlign: "center" }, getMarginTop(1)]}>
            Provide a brief description of the task
          </ThemedText>
          <View style={[{ flex: 1 }, getMarginTop(2)]}>
            <PrimaryInput
              colorType={"commonScreenBG"}
              containerStyle={[
                {
                  marginHorizontal: getWidthnHeight(5)?.width,
                  borderRadius: getWidthnHeight(2)?.width,
                },
                getMarginTop(2),
              ]}
              multiline
              placeholder="Private message to Ruchit D."
              placeholderTextColor={"darkGray"}
              style={{
                margin: getWidthnHeight(4)?.width,
                fontSize: fontSizeH4().fontSize + 4,
                width: getWidthnHeight(80)?.width,
                height: getWidthnHeight(30)?.width,
                textAlignVertical: "top",
              }}
            />
            <ThemedText
              style={[{ textAlign: "right" }, getMarginRight(6)]}
              colorType={"darkGray"}
            >
              Minimum 25 characters
            </ThemedText>
          </View>
          <FlatButton
            style={[
              { width: "90%", borderRadius: getWidthnHeight(10)?.width },
              getMarginBottom(1),
            ]}
            title={"Get a quote"}
            onPress={() => {}}
          />
        </ThemedView>
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
    </ThemedSafe>
  );
};

export { PvtMessage };
