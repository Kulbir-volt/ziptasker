import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Menu } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { ThemedSafe } from "../../components/ThemedSafe";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { getMarginTop, getWidthnHeight } from "../../components/width";
import { RoundedDropdown } from "../../components/RoundedDropdown";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import { TaskCard } from "../../components/TaskCard";
import { BrowseStackNavigationProps } from ".";

const MyTasks: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const navigation = useNavigation<BrowseStackNavigationProps>();
  const [visible, setVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("All tasks");

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const menuItems = [
    {
      id: "1",
      name: "All tasks",
    },
    {
      id: "2",
      name: "Posted",
    },
    {
      id: "3",
      name: "Assigned",
    },
    {
      id: "4",
      name: "Booking Requests",
    },
    {
      id: "5",
      name: "Offered",
    },
    {
      id: "6",
      name: "Completed",
    },
  ];

  const data = [
    {
      id: "1",
      title: "PDF to Excel",
      status: "Completed",
    },
    {
      id: "2",
      title: "MS Word",
      status: "Unpaid",
    },
  ];

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView
        style={{ paddingHorizontal: getWidthnHeight(3)?.width, borderWidth: 0 }}
      >
        <View style={{ borderWidth: 0, alignItems: "flex-start" }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={{
              marginTop: getMarginTop(5).marginTop,
              backgroundColor: Colors[theme]["background"],
            }}
            anchor={
              <RoundedDropdown
                onPress={openMenu}
                title={selectedItem}
                style={{
                  // borderWidth: 1,
                  alignSelf: "center",
                  paddingHorizontal: getWidthnHeight(3)?.width,
                  paddingVertical: getWidthnHeight(1)?.width,
                  borderRadius: getWidthnHeight(10)?.width,
                }}
              />
            }
          >
            {menuItems.map((menu, index) => {
              return (
                <Menu.Item
                  key={`${index}.${menu.id}`}
                  title={menu.name}
                  onPress={() => {
                    setSelectedItem(menu.name);
                    closeMenu();
                  }}
                />
              );
            })}
          </Menu>
        </View>
      </ThemedView>
      <ThemedView
        style={{ flex: 1 }}
        lightColor={Colors[theme]["commonScreenBG"]}
        darkColor={Colors[theme]["background"]}
      >
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View
                style={[
                  {
                    paddingHorizontal: getWidthnHeight(3)?.width,
                    paddingVertical: getWidthnHeight(2)?.width,
                    borderWidth: 1,
                    borderColor: "transparent",
                  },
                ]}
              >
                <TaskCard title={item.title} status={item.status} />
              </View>
            );
          }}
        />
      </ThemedView>
    </ThemedView>
  );
};

export { MyTasks };
