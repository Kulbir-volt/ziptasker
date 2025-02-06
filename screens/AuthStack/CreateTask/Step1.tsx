import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Checkbox from "expo-checkbox";
import {
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  Keyboard,
  ListRenderItem,
  TextInput,
} from "react-native";
import * as _ from "lodash";
import moment from "moment";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { ThemedView } from "../../../components/ThemedView";
import { ThemedText } from "../../../components/ThemedText";
import {
  fontSizeH4,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "../../../components/width";
import { Colors } from "../../../constants/Colors";
import { PrimaryInput } from "../../../components/PrimaryInput";
import { RoundedDropdown } from "../../../components/RoundedDropdown";
import { DateTimePicker } from "../../../components/DateTimePicker";
import { TimeOfDayProps } from "./CreateTask";
export interface Step1Props {
  checked: boolean;
  timeOfDay: TimeOfDayProps[];
  certainTime: string | null;
  setCertainTime: (value: string | null) => void;
  submitStep1: boolean;
  taskTitle: string | undefined;
  setTaskTitle: (value: string) => void;
  setOnDate: (value: string | null) => void;
  onDate: string | null;
  setShowOnDate: (value: boolean) => void;
  showOnDate: boolean;
  fromTimeStamp: number;
  setFromTimeStamp: (value: number) => void;
  currentTimeStamp: number;
  setFlexibleTimings: (value: boolean) => void;
  flexibleTimings: boolean;
  setBeforeDate: (value: string | null) => void;
  beforeDate: string | null;
  toTimeStamp: number;
  setToTimeStamp: (value: number) => void;
  showBeforeDate: boolean;
  setShowBeforeDate: (value: boolean) => void;
  step1DateError: boolean;
  setChecked: (value: boolean) => void;
  openDateBS: () => void;
}

type DisplayDataProps = {
  id: string;
};

const displayData: DisplayDataProps[] = [
  {
    id: "block1",
  },
  {
    id: "block2",
  },
];

const Step1: React.FC<Step1Props> = ({
  checked,
  timeOfDay,
  certainTime,
  setCertainTime,
  submitStep1,
  taskTitle,
  setTaskTitle,
  setOnDate,
  onDate,
  setShowOnDate,
  showOnDate,
  fromTimeStamp,
  setFromTimeStamp,
  currentTimeStamp,
  setFlexibleTimings,
  flexibleTimings,
  setBeforeDate,
  beforeDate,
  toTimeStamp,
  setToTimeStamp,
  showBeforeDate,
  setShowBeforeDate,
  step1DateError,
  setChecked,
  openDateBS,
}) => {
  const theme = useColorScheme() ?? "light";
  const textRef = useRef<TextInput>(null);

  useEffect(() => {
    if (Platform.OS === "ios" && (showOnDate || showBeforeDate)) {
      openDateBS();
    }
  }, [showOnDate, showBeforeDate]);

  // RE-RENDER BUG WHILE USING TEXTINPUT IN ***TopComponent***                <---- FOR TESTING AND LEARNING ---->

  // const TopComponent = (): React.JSX.Element => {
  //   return (
  //     <>
  //       <View style={[getMarginTop(4)]}>
  //         <ThemedText
  //           style={[
  //             {
  //               fontSize: fontSizeH4().fontSize + 4,
  //               fontWeight: "500",
  //             },
  //           ]}
  //         >
  //           In a few words, what do you need done?
  //         </ThemedText>
  //         <View
  //           style={[
  //             {
  //               backgroundColor: Colors[theme]["screenBG"],
  //               borderRadius: getWidthnHeight(3)?.width,
  //               borderWidth:
  //                 theme === "light" ? (submitStep1 && !taskTitle ? 1 : 0) : 1,
  //               borderColor:
  //                 submitStep1 && !taskTitle
  //                   ? Colors[theme]["red"]
  //                   : Colors[theme]["iconColor"],
  //             },
  //             getMarginTop(1.5),
  //           ]}
  //         >
  //           <PrimaryInput
  //             containerStyle={{
  //               backgroundColor: "transparent",
  //             }}
  //             multiline={false}
  //             numberOfLines={1}
  //             value={taskTitle}
  //             style={{
  //               fontSize: fontSizeH4().fontSize + 4,
  //               marginVertical: getWidthnHeight(4)?.width,
  //               marginHorizontal: getWidthnHeight(4)?.width,
  //             }}
  //             placeholder="eg. Help me move sofa"
  //             placeholderTextColor={"darkGray"}
  //             onChangeText={(text) => {
  //               setTaskTitle(text.trimStart());
  //             }}
  //           />
  //           {submitStep1 && !taskTitle && (
  //             <View>
  //               <ThemedText
  //                 style={{
  //                   position: "absolute",
  //                   color: Colors[theme]["red"],
  //                   fontSize: fontSizeH4().fontSize - 1,
  //                 }}
  //               >
  //                 *Task title is required
  //               </ThemedText>
  //             </View>
  //           )}
  //         </View>
  //       </View>
  //       <View style={[getMarginTop(3)]}>
  //         <ThemedText
  //           style={[
  //             {
  //               fontSize: fontSizeH4().fontSize + 4,
  //               fontWeight: "500",
  //             },
  //           ]}
  //         >
  //           When do you need this done?
  //         </ThemedText>
  //         <View
  //           style={[
  //             {
  //               flexDirection: "row",
  //               alignItems: "center",
  //               justifyContent: "space-between",
  //             },
  //             getMarginTop(2),
  //           ]}
  //         >
  //           <View>
  //             <RoundedDropdown
  //               title={onDate ? `On ${onDate}` : "On date"}
  //               onPress={() => setShowOnDate(true)}
  //               titleStyle={{
  //                 fontSize: fontSizeH4().fontSize + (onDate ? 1 : 3),
  //               }}
  //               style={{
  //                 borderWidth: 2,
  //                 borderColor: Colors[theme]["iconColor"],
  //                 paddingHorizontal: getWidthnHeight(2)?.width,
  //                 paddingVertical: getWidthnHeight(1)?.width,
  //                 borderRadius: getWidthnHeight(10)?.width,
  //                 backgroundColor: onDate
  //                   ? Colors[theme]["yellow"]
  //                   : "transparent",
  //               }}
  //             />
  //             {Platform.OS === "android" && showOnDate && (
  //               <View>
  //                 <DateTimePicker
  //                   value={moment(fromTimeStamp).utc().toDate()}
  //                   display="default"
  //                   minimumDate={moment(currentTimeStamp).utc().toDate()}
  //                   onChange={(event, date) => {
  //                     if (event.type === "dismissed") {
  //                       setShowOnDate(!showOnDate);
  //                       return;
  //                     }
  //                     setFlexibleTimings(false);
  //                     setBeforeDate(null);
  //                     const timeStamp = event.nativeEvent.timestamp;
  //                     setFromTimeStamp(timeStamp);
  //                     if (Platform.OS === "android") {
  //                       setShowOnDate(!showOnDate);
  //                       setOnDate(moment(date).format("ddd DD,MMM"));
  //                       if (fromTimeStamp > toTimeStamp) {
  //                         setBeforeDate(null);
  //                       }
  //                     }
  //                     Keyboard.dismiss();
  //                   }}
  //                 />
  //               </View>
  //             )}
  //           </View>
  //           <View>
  //             <RoundedDropdown
  //               title={beforeDate ? `Before ${beforeDate}` : "Before date"}
  //               onPress={() => setShowBeforeDate(true)}
  //               titleStyle={{
  //                 fontSize: fontSizeH4().fontSize + (beforeDate ? 1 : 3),
  //               }}
  //               style={{
  //                 borderWidth: 2,
  //                 borderColor: Colors[theme]["iconColor"],
  //                 paddingHorizontal: getWidthnHeight(2)?.width,
  //                 paddingVertical: getWidthnHeight(1)?.width,
  //                 borderRadius: getWidthnHeight(10)?.width,
  //                 backgroundColor: beforeDate
  //                   ? Colors[theme]["yellow"]
  //                   : "transparent",
  //               }}
  //             />
  //             {Platform.OS === "android" && showBeforeDate && (
  //               <View>
  //                 <DateTimePicker
  //                   value={moment(toTimeStamp).utc().toDate()}
  //                   display="default"
  //                   minimumDate={moment(currentTimeStamp)
  //                     .add(1, "day")
  //                     .utc()
  //                     .toDate()}
  //                   onChange={(event, date) => {
  //                     if (event.type === "dismissed") {
  //                       setShowBeforeDate(!showBeforeDate);
  //                       return;
  //                     }
  //                     setFlexibleTimings(false);
  //                     setOnDate(null);
  //                     const timeStamp = event.nativeEvent.timestamp;
  //                     setToTimeStamp(timeStamp);
  //                     if (Platform.OS === "android") {
  //                       setShowBeforeDate(!showBeforeDate);
  //                       setBeforeDate(moment(date).format("ddd DD,MMM"));
  //                     }
  //                     Keyboard.dismiss();
  //                   }}
  //                 />
  //               </View>
  //             )}
  //           </View>
  //           <RoundedDropdown
  //             title={"I'm flexible"}
  //             onPress={() => {
  //               setOnDate(null);
  //               setBeforeDate(null);
  //               setFlexibleTimings(true);
  //             }}
  //             iconSize={null}
  //             titleStyle={{
  //               fontSize: fontSizeH4().fontSize + 3,
  //             }}
  //             style={{
  //               borderWidth: 2,
  //               borderColor: Colors[theme]["iconColor"],
  //               backgroundColor: flexibleTimings
  //                 ? Colors[theme]["yellow"]
  //                 : "transparent",
  //               paddingHorizontal: getWidthnHeight(2)?.width,
  //               paddingVertical: getWidthnHeight(1.5)?.width,
  //               borderRadius: getWidthnHeight(10)?.width,
  //             }}
  //           />
  //         </View>
  //         {submitStep1 && step1DateError && (
  //           <View>
  //             <ThemedText
  //               style={{
  //                 position: "absolute",
  //                 color: Colors[theme]["red"],
  //                 fontSize: fontSizeH4().fontSize - 1,
  //               }}
  //             >
  //               *Date is required
  //             </ThemedText>
  //           </View>
  //         )}
  //         <View
  //           style={[
  //             {
  //               flexDirection: "row",
  //               alignItems: "center",
  //             },
  //             getMarginTop(3),
  //           ]}
  //         >
  //           <Checkbox
  //             value={checked}
  //             onValueChange={() => {
  //               if (checked) {
  //                 setCertainTime(null);
  //               }
  //               setChecked(!checked);
  //             }}
  //           />
  //           <ThemedText style={getMarginLeft(3)}>
  //             I need certain time of day
  //           </ThemedText>
  //         </View>
  //       </View>
  //       {checked && submitStep1 && !certainTime && (
  //         <View>
  //           <ThemedText
  //             style={{
  //               position: "absolute",
  //               color: Colors[theme]["red"],
  //               fontSize: fontSizeH4().fontSize - 1,
  //             }}
  //           >
  //             *Please select certain time
  //           </ThemedText>
  //         </View>
  //       )}
  //     </>
  //   );
  // };

  const CertainTimeComponent: ListRenderItem<TimeOfDayProps> = useCallback(
    ({ item }) => {
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
              <ThemedText style={[fontSizeH4()]}>{item.subtitle}</ThemedText>
            </>
          </TouchableOpacity>
        </ThemedView>
      );
    },
    [certainTime, theme, setCertainTime]
  );

  return (
    <View
      style={[
        {
          flex: 1,
        },
      ]}
    >
      {/* <TopComponent /> */}
      <FlatList
        data={checked ? timeOfDay : []}
        // keyboardShouldPersistTaps={"always"}
        numColumns={2}
        keyExtractor={(item) => `${item.id}`}
        renderItem={(data) => {
          return <CertainTimeComponent {...data} />;
        }}
      />
      {/* <View
        style={[
          {
            flex: 1,
          },
        ]}
      >
        <FlatList
          data={displayData}
          extraData={checked}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            if (index === 0) {
              return <TopComponent />;
            } else if (index === 1) {
              return <MemoizedCertainTimeList />;
            }
            return null;
          }}
        />
      </View> */}
    </View>
  );
};

export { Step1 };
