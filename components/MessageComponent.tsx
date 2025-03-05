import React from "react";
import { ThemedView } from "./ThemedView";
import {
  Image,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  fontSizeH4,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "./width";
import { ThemedText } from "./ThemedText";
import { ChatsProps } from "../redux/slice/chats";
import { UserDetails } from "../redux/slice/auth";
import moment from "moment";

type MessageComponentProps = {
  style?: StyleProp<ViewStyle>;
  showDate?: boolean;
  numberOfLines?: number;
  title?: string;
  item?: ChatsProps;
  userDetails?: UserDetails;
  onPress?: () => void;
};

const MessageComponent: React.FC<MessageComponentProps> = ({
  style,
  showDate = true,
  numberOfLines = 3,
  title = "Remove a radiator",
  item,
  userDetails,
  onPress,
}) => {
  const image = item?.taskDetails?.tasker_image;
  let messageTime = "N/A";
  if (item?.createdAt instanceof Object && "seconds" in item?.createdAt) {
    const date = item?.createdAt.toDate();
    const now = moment();
    const diffInHours = now.diff(date, "hours");

    // If within last 24 hours, show "minutes ago"
    if (diffInHours < 24) {
      messageTime = moment(date).fromNow(); // Example: "5 minutes ago"
    } else {
      // If older than 24 hours, show date
      messageTime = moment(date).format("DD MMM, YYYY"); // Example: "19 Feb, 2025"
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          borderWidth: 0,
        },
        style,
      ]}
    >
      <Image
        source={image ? { uri: image } : require("../assets/chat.jpg")}
        resizeMode="contain"
        style={{
          width: getWidthnHeight(12)?.width,
          height: getWidthnHeight(12)?.width,
          borderRadius: getWidthnHeight(10)?.width,
        }}
      />
      <ThemedView
        style={[
          { flex: 1, borderWidth: 0, justifyContent: "space-between" },
          getMarginLeft(2),
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 0,
          }}
        >
          <ThemedText
            style={{ flex: 1 }}
            type={"defaultSemiBold"}
            colorType={"iconColor"}
            numberOfLines={2}
          >
            {item?.taskDetails?.title}
          </ThemedText>
          {showDate && (
            <ThemedText
              style={{
                fontSize: fontSizeH4().fontSize + 2,
                paddingLeft: getWidthnHeight(2)?.width,
                borderWidth: 0,
              }}
              colorType={"darkGray"}
            >
              {messageTime}
            </ThemedText>
          )}
        </View>
        <ThemedText
          numberOfLines={numberOfLines}
          style={[{ fontSize: fontSizeH4().fontSize + 2 }, getMarginTop(0)]}
          colorType={"darkGray"}
        >
          {item?.text}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

export { MessageComponent };
