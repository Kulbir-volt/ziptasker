import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";
import { Switch } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

import { ThemedView } from "../../../components/ThemedView";
import { ThemedSafe } from "../../../components/ThemedSafe";
import { TaskCard } from "../../../components/TaskCard";
import MapStyle from "../../../MapStyle.json";
import {
  fontSizeH3,
  fontSizeH4,
  getMarginLeft,
  getMarginRight,
  getMarginTop,
  getWidthnHeight,
} from "../../../components/width";
import { BrowseStackNavigationProps } from "..";
import { Colors } from "../../../constants/Colors";
import { ThemedAntDesign } from "../../../components/ThemedAntDesign";
import { ThemedSimpleLineIcons } from "../../../components/ThemedSimpleIcons";
import { ThemedText } from "../../../components/ThemedText";
import { ThemedMaterialIcons } from "../../../components/ThemedMaterialIcon";
import { CustomBS } from "../../../components/BottomSheet/CustomBS";
import { ThemedBSView } from "../../../components/ThemedBSView";
import { ThemedOcticons } from "../../../components/ThemedOctions";
import { DropdownField } from "../../../components/DropdownField";
import { FlatButton } from "../../../components/Buttons/FlatButton";
import { PrimaryInput } from "../../../components/PrimaryInput";
import { Categories } from "../../../components/Modal/Categories";
import { ThemedIonicons } from "../../../components/ThemedIonicons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { authActions } from "../../../redux/slice/auth";

const SORT = "sort";
const FILTER = "filter";
const maxStringLength = 20;

const listOfCategories = [
  {
    id: "1",
    title: "Accupuncture",
    selected: false,
  },
  {
    id: "2",
    title: "Accoustic Sound Proofing",
    selected: false,
  },
  {
    id: "3",
    title: "Advisory",
    selected: false,
  },
  {
    id: "4",
    title: "Beauty Services",
    selected: false,
  },
  {
    id: "5",
    title: "Bicycle Repair",
    selected: false,
  },
  {
    id: "6",
    title: "Body Art",
    selected: false,
  },
  {
    id: "7",
    title: "Wedding & Event Planning",
    selected: true,
  },
];

const BrowseTasks: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const dispatch = useDispatch();
  const navigation = useNavigation<BrowseStackNavigationProps>();
  const filterBSRef = useRef<BottomSheetModal>(null);
  const sortFilterRef = useRef<BottomSheetModal>(null);
  const [selectedSort, setSelectedSort] = useState<string>("1");
  const [selectedButton, setSelectedButton] = useState<string>("3");
  const [value, setValue] = useState<number>(0);
  const [availableTasks, setAvailableTasks] = useState<boolean>(true);
  const [showNoOffers, setShowNoOffers] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [categoriesList, setCategoriesList] = useState<
    Array<{ id: string; title: string; selected: boolean }> | undefined
  >(listOfCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    ""
  );
  const [countSelection, setCountSelection] = useState<number>(0);

  const { showMap } = useSelector((state: RootState) => state.auth);
  const { othersTasks } = useSelector((state: RootState) => state.tasks);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const region = {
    latitude: 37.422131,
    longitude: -122.084801,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const data = [
    {
      id: "1",
      title: "PDF to Excel",
    },
    {
      id: "2",
      title: "MS Word",
    },
  ];

  useEffect(() => {
    const selectedItem = categoriesList?.find((item) => item?.selected);
    const totalCount: number =
      categoriesList?.filter((item) => item.selected).length ?? 0;
    setCountSelection(totalCount);
    if (selectedItem) {
      setSelectedCategory(selectedItem.title);
    }
  }, [categoriesList]);

  function openBottomSheet(type = SORT) {
    if (type === SORT) {
      sortFilterRef.current?.present();
    } else if (type === FILTER) {
      filterBSRef.current?.present();
    }
  }

  function closeBottomSheet(type = SORT) {
    if (type === SORT) {
      sortFilterRef.current?.close();
    } else if (type === FILTER) {
      filterBSRef.current?.close();
    }
  }

  const sortTypes = [
    {
      id: "1",
      name: "Recommended",
    },
    {
      id: "2",
      name: "Price: High to low",
    },
    {
      id: "3",
      name: "Price: Low to high",
    },
    {
      id: "4",
      name: "Due date: Latest",
    },
    {
      id: "5",
      name: "Price: Earliest",
    },
    {
      id: "6",
      name: "Newest tasks",
    },
    {
      id: "7",
      name: "Oldest tasks",
    },
    {
      id: "8",
      name: "Closest to me",
    },
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerShadowVisible: false,
      headerTitle: "Browse Tasks",
      headerTitleStyle: {
        fontFamily: "DancingScript_700Bold",
        fontSize: fontSizeH3().fontSize + 4,
        color: Colors[theme]["iconColor"],
      },
      headerTitleAlign: "center",
      headerLeft: () => (
        <ThemedIonicons
          onPress={() => dispatch(authActions.setShowMap(!showMap))}
          name={showMap ? "map-outline" : "menu"}
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
        />
      ),
      headerRight: () => (
        <ThemedAntDesign
          onPress={() => navigation?.navigate("notifications")}
          name={"bells"}
          size={getWidthnHeight(6)?.width}
          colorType={"iconColor"}
        />
      ),
    });
  }, [showMap]);

  useEffect(() => {
    return () => {
      dispatch(authActions.setShowMap(false));
    };
  }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: getWidthnHeight(3)?.width,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: getWidthnHeight(2)?.width,
                },
              ]}
              onPress={() => openBottomSheet(FILTER)}
            >
              <ThemedSimpleLineIcons
                name={"equalizer"}
                colorType={"iconColor"}
                size={getWidthnHeight(4)?.width}
              />
              <ThemedText style={getMarginLeft(2)}>Filter</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openBottomSheet()}
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: getWidthnHeight(2)?.width,
                },
              ]}
            >
              <ThemedMaterialIcons
                name={"arrow-drop-down"}
                colorType={"iconColor"}
                size={getWidthnHeight(6)?.width}
              />
              <ThemedText style={getMarginLeft(1)}>Sort</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          {showMap ? (
            <ThemedView
              colorType={"screenBG"}
              style={{ flex: 1, borderWidth: 0 }}
            >
              <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                customMapStyle={MapStyle}
                showsUserLocation={true}
                zoomEnabled={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
                loadingEnabled
                showsCompass={true}
                toolbarEnabled={true}
                style={styles.mapViewStyle}
                region={region}
                onMapLoaded={() => {
                  // console.log("@#@#@ MAP RENDERED");
                  // setMapLoaded(true)
                }}
              >
                <Marker ref={markerRef} coordinate={region}>
                  <Callout>
                    <View style={{ alignItems: "center" }}>
                      <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: fontSizeH4().fontSize + 2 }}>
                          Shivam
                        </Text>
                        <Text
                          style={{ fontSize: fontSizeH4().fontSize - 1 }}
                        >{`(You are here)`}</Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              </MapView>
            </ThemedView>
          ) : (
            <ThemedView
              colorType={"screenBG"}
              style={{ flex: 1, borderWidth: 0 }}
            >
              <FlatList
                data={othersTasks}
                keyExtractor={(item) => item.id!}
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
                      <TaskCard
                        task={item}
                        onPress={() =>
                          navigation.navigate("taskDetails", {
                            details: item,
                          })
                        }
                      />
                    </View>
                  );
                }}
              />
            </ThemedView>
          )}
        </View>
        <CustomBS
          ref={sortFilterRef}
          style={{
            borderTopLeftRadius: getWidthnHeight(5)?.width,
            borderTopRightRadius: getWidthnHeight(5)?.width,
          }}
        >
          <ThemedBSView style={{ flex: 1 }}>
            <ThemedBSView
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
                getMarginTop(1),
              ]}
            >
              <ThemedBSView children={null} style={[getWidthnHeight(10)]} />
              <ThemedText
                style={{
                  textAlign: "center",
                  fontSize: fontSizeH4().fontSize + 4,
                }}
              >
                Sort by
              </ThemedText>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ padding: getWidthnHeight(2)?.width, borderWidth: 0 }}
                onPress={() => closeBottomSheet()}
              >
                <ThemedAntDesign
                  name={"close"}
                  colorType={"iconColor"}
                  size={getWidthnHeight(5)?.width}
                />
              </TouchableOpacity>
            </ThemedBSView>
            <BottomSheetFlatList
              style={getMarginTop(2)}
              data={sortTypes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <Pressable onPress={() => setSelectedSort(item.id)}>
                    <ThemedBSView
                      style={{
                        borderWidth: 0,
                        padding: getWidthnHeight(4)?.width,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <ThemedText
                        style={{ fontSize: fontSizeH4().fontSize + 4 }}
                      >
                        {item.name}
                      </ThemedText>
                      {selectedSort === item.id && (
                        <ThemedOcticons
                          name={"check"}
                          colorType={"check"}
                          size={getWidthnHeight(5)?.width}
                        />
                      )}
                    </ThemedBSView>
                  </Pressable>
                );
              }}
            />
          </ThemedBSView>
        </CustomBS>

        {/* FILTER BOTTOMSHEET */}
        <CustomBS
          ref={filterBSRef}
          style={{
            borderTopLeftRadius: getWidthnHeight(5)?.width,
            borderTopRightRadius: getWidthnHeight(5)?.width,
          }}
          snapPoints={["100%"]}
        >
          <ThemedBSView
            style={{ flex: 1, paddingHorizontal: getWidthnHeight(3)?.width }}
          >
            <ThemedBSView
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                },
                getMarginTop(1),
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ padding: getWidthnHeight(1)?.width, borderWidth: 0 }}
                onPress={() => closeBottomSheet(FILTER)}
              >
                <ThemedAntDesign
                  name={"close"}
                  colorType={"iconColor"}
                  size={getWidthnHeight(6)?.width}
                />
              </TouchableOpacity>
              <ThemedText
                style={[
                  {
                    textAlign: "center",
                    fontSize: fontSizeH3().fontSize,
                    fontWeight: "500",
                  },
                  getMarginLeft(2),
                ]}
              >
                Filters
              </ThemedText>
            </ThemedBSView>
            <View style={{ flex: 1 }}>
              <BottomSheetScrollView style={{ flex: 1, borderWidth: 0 }}>
                <ThemedBSView style={{ flex: 1 }}>
                  <ThemedBSView style={[getMarginTop(3)]}>
                    <DropdownField
                      onPress={() => setShowCategories(true)}
                      title={"Categories"}
                      selectionText={
                        countSelection > 1
                          ? selectedCategory?.length! > maxStringLength
                            ? `${selectedCategory?.substring(
                                0,
                                maxStringLength
                              )}... & ${countSelection} more`
                            : `${selectedCategory} & ${countSelection} more`
                          : selectedCategory ?? "--"
                      }
                    />
                    <View style={[getMarginTop(3)]}>
                      <ThemedText
                        style={[
                          {
                            fontSize: fontSizeH4().fontSize + 5,
                            fontWeight: "500",
                          },
                        ]}
                      >
                        To be done
                      </ThemedText>
                    </View>
                    <View
                      style={[
                        {
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        },
                        getMarginTop(1.5),
                      ]}
                    >
                      <FlatButton
                        colorType={
                          selectedButton === "1" ? "yellow" : "screenBG"
                        }
                        title="In person"
                        onPress={() => {
                          setSelectedButton("1");
                        }}
                        style={[
                          {
                            borderRadius: getWidthnHeight(2)?.width,
                            paddingHorizontal: getWidthnHeight(5)?.width,
                            width: "32%",
                          },
                        ]}
                        textStyle={{
                          paddingVertical: getWidthnHeight(3)?.width,
                          fontSize: fontSizeH4().fontSize + 4,
                        }}
                      />
                      <FlatButton
                        colorType={
                          selectedButton === "2" ? "yellow" : "screenBG"
                        }
                        title="Remotely"
                        onPress={() => {
                          setSelectedButton("2");
                        }}
                        style={[
                          {
                            borderRadius: getWidthnHeight(2)?.width,
                            paddingHorizontal: getWidthnHeight(5)?.width,
                            width: "32%",
                          },
                        ]}
                        textStyle={{
                          paddingVertical: getWidthnHeight(3)?.width,
                          fontSize: fontSizeH4().fontSize + 4,
                        }}
                      />
                      <FlatButton
                        colorType={
                          selectedButton === "3" ? "yellow" : "screenBG"
                        }
                        title="All"
                        onPress={() => {
                          setSelectedButton("3");
                        }}
                        style={[
                          {
                            borderRadius: getWidthnHeight(2)?.width,
                            paddingHorizontal: getWidthnHeight(5)?.width,
                            width: "32%",
                          },
                        ]}
                        textStyle={{
                          paddingVertical: getWidthnHeight(3)?.width,
                          fontSize: fontSizeH4().fontSize + 4,
                        }}
                      />
                    </View>
                  </ThemedBSView>
                  <ThemedBSView style={[getMarginTop(3)]}>
                    <ThemedText
                      style={[
                        {
                          fontSize: fontSizeH4().fontSize + 5,
                          fontWeight: "500",
                        },
                      ]}
                    >
                      Location
                    </ThemedText>
                    <View
                      style={[
                        {
                          backgroundColor: Colors[theme]["screenBG"],
                          borderRadius: getWidthnHeight(3)?.width,
                          borderWidth: theme === "light" ? 0 : 1,
                          borderColor: Colors[theme]["iconColor"],
                        },
                        getMarginTop(1.5),
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
                        placeholder="your location here"
                        placeholderTextColor={"darkGray"}
                        onChangeText={(text) => {}}
                      />
                    </View>
                  </ThemedBSView>
                  <ThemedBSView style={[getMarginTop(3)]}>
                    <ThemedText
                      style={[
                        {
                          fontSize: fontSizeH4().fontSize + 5,
                          fontWeight: "500",
                        },
                      ]}
                    >
                      Distance
                    </ThemedText>
                    <View style={[getMarginTop(1.5)]}>
                      <Slider
                        style={{
                          width: "100%",
                        }}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={value}
                        onValueChange={(val) => setValue(val)}
                        minimumTrackTintColor={Colors[theme]["check"]}
                        maximumTrackTintColor={Colors[theme]["darkGray"]}
                        thumbTintColor={Colors[theme]["check"]}
                      />
                    </View>
                  </ThemedBSView>
                  <ThemedBSView style={[getMarginTop(3)]}>
                    <ThemedText
                      style={[
                        {
                          fontSize: fontSizeH4().fontSize + 5,
                          fontWeight: "500",
                        },
                      ]}
                    >
                      Price
                    </ThemedText>
                    <View style={[getMarginTop(1.5)]}>
                      <Slider
                        style={{
                          width: "100%",
                        }}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={value}
                        onValueChange={(val) => setValue(val)}
                        minimumTrackTintColor={Colors[theme]["check"]}
                        maximumTrackTintColor={Colors[theme]["darkGray"]}
                        thumbTintColor={Colors[theme]["check"]}
                      />
                    </View>
                  </ThemedBSView>
                  <ThemedBSView style={[getMarginTop(3)]}>
                    <ThemedText
                      style={[
                        {
                          fontSize: fontSizeH4().fontSize - 1,
                          fontWeight: "400",
                        },
                      ]}
                    >
                      OTHER FILTERS
                    </ThemedText>
                  </ThemedBSView>
                  <ThemedBSView style={[getMarginTop(3)]}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <ThemedText
                          style={{ fontSize: fontSizeH4().fontSize + 5 }}
                        >
                          Available tasks only
                        </ThemedText>
                        <ThemedText
                          colorType={"darkGray"}
                          style={{ fontSize: fontSizeH4().fontSize + 1 }}
                        >
                          Hide tasks that are already assigned
                        </ThemedText>
                      </View>
                      <Switch
                        color={Colors[theme]["yellow"]}
                        value={availableTasks}
                        onValueChange={() => setAvailableTasks(!availableTasks)}
                        style={[
                          {
                            transform: [
                              {
                                scale: 1.5,
                              },
                            ],
                          },
                          getMarginRight(3),
                        ]}
                      />
                    </View>
                  </ThemedBSView>
                  <ThemedBSView style={[getMarginTop(3)]}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <ThemedText
                          style={{ fontSize: fontSizeH4().fontSize + 5 }}
                        >
                          Show tasks with no offers
                        </ThemedText>
                        <ThemedText
                          colorType={"darkGray"}
                          style={{ fontSize: fontSizeH4().fontSize + 1 }}
                        >
                          Hide tasks that have offers
                        </ThemedText>
                      </View>
                      <Switch
                        color={Colors[theme]["yellow"]}
                        value={showNoOffers}
                        onValueChange={() => setShowNoOffers(!showNoOffers)}
                        style={[
                          {
                            transform: [
                              {
                                scale: 1.5,
                              },
                            ],
                          },
                          getMarginRight(3),
                        ]}
                      />
                    </View>
                  </ThemedBSView>
                </ThemedBSView>
              </BottomSheetScrollView>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: getWidthnHeight(3)?.width,
                paddingVertical: getWidthnHeight(2)?.width,
              }}
            >
              <FlatButton
                colorType={"lightYellow"}
                title="Reset"
                onPress={() => {}}
                style={[
                  {
                    borderRadius: getWidthnHeight(10)?.width,
                    paddingHorizontal: getWidthnHeight(5)?.width,
                    width: "47%",
                  },
                ]}
                textStyle={{
                  paddingVertical: getWidthnHeight(3)?.width,
                  fontSize: fontSizeH4().fontSize + 4,
                }}
              />
              <FlatButton
                colorType={"yellow"}
                title="Apply"
                onPress={() => {}}
                style={[
                  {
                    borderRadius: getWidthnHeight(10)?.width,
                    paddingHorizontal: getWidthnHeight(5)?.width,
                    width: "47%",
                  },
                ]}
                textStyle={{
                  paddingVertical: getWidthnHeight(3)?.width,
                  fontSize: fontSizeH4().fontSize + 4,
                }}
              />
            </View>
          </ThemedBSView>
        </CustomBS>
      </View>
      {showCategories && (
        <Categories
          data={categoriesList}
          setSelectedData={setCategoriesList}
          visible={showCategories}
          onDismiss={() => setShowCategories(false)}
          contentContainerStyle={{ flex: 1 }}
          dismissable={false}
          dismissableBackButton={true}
        />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  mapViewStyle: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
  },
});

export { BrowseTasks };
