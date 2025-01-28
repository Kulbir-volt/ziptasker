import React, { useEffect, useState } from "react";
import { Modal, Portal, Text, ModalProps } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { ThemedView } from "../ThemedView";
import {
  FlatList,
  Pressable,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import {
  fontSizeH4,
  getMarginHorizontal,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "../width";
import { ThemedIonicons } from "../ThemedIonicons";
import { ThemedText } from "../ThemedText";
import { ThemedMaterialIcons } from "../ThemedMaterialIcon";
import { IconTextInput } from "../IconTextInput";
import { ThemedAntDesign } from "../ThemedAntDesign";
import { FlatButton } from "../Buttons/FlatButton";

type dataFormat =
  | Array<{ id: string; title: string; selected: boolean }>
  | undefined;

type CategoriesProps = Partial<ModalProps> & {
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  data?: dataFormat;
  setSelectedData?: (items: dataFormat) => void;
};

type ItemComponentProps = {
  onPress?: () => void;
  item: {
    id: string;
    title: string;
  };
  icon?: React.ReactNode;
};

const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
  onPress,
  icon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
    >
      <ThemedView
        style={{
          flex: 1,
          paddingVertical: getWidthnHeight(4)?.width,
        }}
      >
        <ThemedText
          numberOfLines={1}
          style={{ fontSize: fontSizeH4().fontSize + 4 }}
        >
          {item.title}
        </ThemedText>
      </ThemedView>
      {icon}
    </Pressable>
  );
};

const Categories: React.FC<CategoriesProps> = ({
  visible,
  onDismiss = () => {},
  data,
  setSelectedData = () => {},
  ...otherProps
}) => {
  const [totalSelections, setTotalSelections] = useState<number>(1);
  const [search, setSearch] = useState<string | undefined>("");
  const [result, setResult] = useState<dataFormat>([]);
  const [tempSelection, setTempSelection] = useState<dataFormat>([]);

  function resetSelection() {
    const length = data?.length!;
    const resetData = data?.map((item, index) => {
      const sameIndex = index === length - 1;
      return {
        ...item,
        selected: sameIndex ? true : false,
      };
    });
    setTotalSelections(1);
    setTempSelection(resetData);
  }

  function setToDefaults() {
    const duplicateData = data?.map((item) => item);
    const totalCount = duplicateData?.filter(
      (subItem) => subItem.selected
    ).length;
    setTempSelection(duplicateData);
    setTotalSelections(totalCount!);
  }

  useEffect(() => {
    if (visible) {
      setToDefaults();
    }
  }, [visible]);

  useEffect(() => {
    const selectedTempData = tempSelection?.filter(
      (item) => item.selected
    ).length;
    if (selectedTempData === 0) {
      setToDefaults();
    }
  }, [tempSelection]);

  useEffect(() => {
    if (search) {
      const searchedResult = searchCategory();
      setResult(searchedResult);
    }
  }, [search]);

  function searchCategory() {
    return data?.filter((item) => {
      let title = item?.title;
      const searchSupplierName = title.substring(0, search?.length);
      if (searchSupplierName.toLowerCase() === search?.toLowerCase()) {
        return true;
      }
      return false;
    });
  }

  return (
    <Portal>
      <Modal visible {...otherProps}>
        <ThemedView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: getWidthnHeight(3)?.width,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{ borderWidth: 0, padding: getWidthnHeight(2)?.width }}
                  onPress={() => {
                    setTempSelection([]);
                    onDismiss();
                  }}
                >
                  <ThemedMaterialIcons
                    name={"keyboard-backspace"}
                    colorType={"iconColor"}
                    size={getWidthnHeight(7)?.width}
                  />
                </TouchableOpacity>
                <ThemedText
                  colorType={"iconColor"}
                  style={[
                    { fontSize: fontSizeH4().fontSize + 8 },
                    getMarginLeft(3),
                  ]}
                >
                  Categories
                </ThemedText>
              </View>
              <View style={{}}>
                <TouchableOpacity
                  style={{ borderWidth: 0, padding: getWidthnHeight(2)?.width }}
                  onPress={resetSelection}
                >
                  <ThemedText
                    colorType={"iconColor"}
                    style={[{ fontSize: fontSizeH4().fontSize + 4 }]}
                  >
                    Clear
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ paddingHorizontal: getWidthnHeight(4)?.width }}>
              <IconTextInput
                icon={
                  <ThemedIonicons
                    name={"search-outline"}
                    colorType={"darkGray"}
                    size={getWidthnHeight(5)?.width}
                  />
                }
                placeholder="Search categories"
                placeholderTextColor={"gradeOut"}
                style={{
                  flex: 1,
                  fontSize: fontSizeH4().fontSize + 4,
                  paddingHorizontal: getWidthnHeight(3)?.width,
                }}
                onChangeText={(text) => setSearch(text)}
              />
              <ThemedView style={[{ borderWidth: 0 }, getMarginTop(2)]}>
                <FlatList
                  data={tempSelection?.filter((tempItem) => {
                    if (search) {
                      return result?.some(
                        (resultItem) => resultItem.id === tempItem.id
                      );
                    }
                    return tempItem;
                  })}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    if (item.selected) {
                      return (
                        <ItemComponent
                          item={item}
                          onPress={() => {
                            const currentSelectionData: dataFormat =
                              tempSelection?.map((subItem) => {
                                if (item.id == subItem.id) {
                                  return {
                                    ...subItem,
                                    selected: !subItem.selected,
                                  };
                                }
                                return subItem;
                              });
                            const totalCount =
                              currentSelectionData?.filter(
                                (subItem) => subItem.selected
                              ).length || 0;
                            setTotalSelections(totalCount!);
                            setTempSelection(currentSelectionData);
                          }}
                          icon={
                            <ThemedAntDesign
                              name={"minuscircleo"}
                              colorType={"darkYellow"}
                              size={getWidthnHeight(5)?.width}
                            />
                          }
                        />
                      );
                    }
                    return (
                      <ItemComponent
                        item={item}
                        onPress={() => {
                          const currentSelectionData: dataFormat =
                            tempSelection?.map((subItem) => {
                              if (item.id == subItem.id) {
                                return {
                                  ...subItem,
                                  selected: !subItem.selected,
                                };
                              }
                              return subItem;
                            });
                          const totalCount =
                            currentSelectionData?.filter(
                              (subItem) => subItem.selected
                            ).length || 0;
                          setTotalSelections(totalCount!);
                          setTempSelection(currentSelectionData);
                        }}
                        icon={
                          <ThemedAntDesign
                            name={"pluscircleo"}
                            colorType={"check"}
                            size={getWidthnHeight(5)?.width}
                          />
                        }
                      />
                    );
                  }}
                />
              </ThemedView>
            </View>
          </View>
          <View>
            <FlatButton
              title={`Select ${totalSelections} category`}
              onPress={() => {
                const copyData: dataFormat = tempSelection?.map((item) => item);
                setSelectedData(copyData);
                onDismiss();
                setTempSelection([]);
              }}
            />
          </View>
        </ThemedView>
      </Modal>
    </Portal>
  );
};

export { Categories };
