import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ThemedSafe } from "../../components/ThemedSafe";
import { ThemedView } from "../../components/ThemedView";
import {
  fontSizeH4,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { ThemedText } from "../../components/ThemedText";
import { IconTextInput } from "../../components/IconTextInput";
import { ThemedIonicons } from "../../components/ThemedIonicons";
import { MessageComponent } from "../../components/MessageComponent";
import { getUserList } from "../../firebase/read/fetchUsers";
import { getAllChats } from "../../firebase/read/fetchChats";
import { RootState } from "../../redux/store";
import { UserDetails } from "../../redux/slice/auth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BrowseStackNavigationProps } from ".";

const Messages: React.FC = () => {
  const { details } = useSelector((state: RootState) => state.auth);
  const { chats } = useSelector((state: RootState) => state.chats);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation<BrowseStackNavigationProps>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      if (userDetails?.user?.uid) {
        getAllChats(userDetails?.user?.uid);
      }
      setRefreshing(false);
    }, 1500);
  }, [userDetails]);

  useEffect(() => {
    const parsedDetails: UserDetails = JSON.parse(details as string);
    setUserDetails(parsedDetails);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userDetails?.user?.uid) {
        getAllChats(userDetails?.user?.uid);
      }
    }, [userDetails])
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{
          flex: 1,
          paddingHorizontal: getWidthnHeight(3)?.width,
        }}
      >
        <View style={[getMarginVertical(2)]}>
          <IconTextInput
            icon={
              <ThemedIonicons
                name={"search-outline"}
                colorType={"darkGray"}
                size={getWidthnHeight(5)?.width}
              />
            }
            containerStyle={{
              paddingVertical: getWidthnHeight(3)?.width,
            }}
            placeholder="Search"
            placeholderTextColor={"gradeOut"}
            style={{
              flex: 1,
              fontSize: fontSizeH4().fontSize + 4,
              paddingHorizontal: getWidthnHeight(3)?.width,
            }}
            onChangeText={(text) => {}}
          />
        </View>
        <View style={[{ flex: 1 }]}>
          {/* <MessageComponent />
          <MessageComponent style={[getMarginTop(2)]} /> */}
          {userDetails && (
            <FlatList
              data={chats}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => {
                return (
                  <MessageComponent
                    item={item}
                    userDetails={userDetails}
                    onPress={() => {
                      navigation.navigate("pvtMessage", {
                        userId: userDetails?.user?.uid,
                        recipientId: item?.recipientId,
                        bookAgain: false,
                        chatId: item?.id,
                        chatDetails: item,
                      });
                    }}
                  />
                );
              }}
            />
          )}
        </View>
      </ThemedView>
    </ThemedView>
  );
};

export { Messages };
