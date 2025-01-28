import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { ThemedView } from "../../components/ThemedView";
import { ThemedSafe } from "../../components/ThemedSafe";
import {
  fontSizeH1,
  fontSizeH2,
  fontSizeH3,
  fontSizeH4,
  getMarginBottom,
  getMarginLeft,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../../components/width";
import { ThemedText } from "../../components/ThemedText";
import { BrowseStackNavigationProps, TaskDetailsStackParamList } from ".";
import { ThemedAntDesign } from "../../components/ThemedAntDesign";
import { Colors } from "../../constants/Colors";
import { PostComponent } from "../../components/PostComponent";
import { ThemedFontAwesome } from "../../components/ThemedFontAwesome";
import { ThemedIonicons } from "../../components/ThemedIonicons";
import { FlatButton } from "../../components/Buttons/FlatButton";
import { ThemedPicker } from "../../components/ThemedPicker";
import { ThemedGradientView } from "../../components/ThemedGradientView";
import { ThemedMaterialIcons } from "../../components/ThemedMaterialIcon";
import { ThemedEvilIcons } from "../../components/ThemedEvilicons";
import { UserDetails } from "../../components/UserDetails";
import { ThemedMaterialCommunityIcons } from "../../components/ThemedMaterialCommunityIcon";
import { PrimaryInput } from "../../components/PrimaryInput";
import { ChatComponent } from "../../components/ChatComponent";

type TaskDetailsRouteProp = RouteProp<TaskDetailsStackParamList, "taskDetails">;
const HEADER_MAX_HEIGHT = getWidthnHeight(40)?.width!; // Max header height
const HEADER_MIN_HEIGHT = getWidthnHeight(40)?.width!; // Min header height after scrolling
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const TaskDetails: React.FC = () => {
  const theme = useColorScheme() ?? "light";
  const route = useRoute<TaskDetailsRouteProp>();
  const navigation = useNavigation<BrowseStackNavigationProps>();
  const taskDetails = route.params?.details;
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(true);
  const [animateSlide, setAnimateSlide] = useState<Animated.Value>(
    new Animated.Value(1)
  );
  const [selectedOffers, setSelectedOffers] = useState<boolean>(true);

  const scrollY = new Animated.Value(0);

  const items = [
    {
      label: "Post a similar task",
      value: "item1",
    },
    {
      label: "Set up Alerts",
      value: "item2",
    },
  ];

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

  const animateVertically: ViewStyle = {
    transform: [
      {
        translateY: animateSlide.interpolate({
          inputRange: [0, 1],
          outputRange: [0, getMarginTop(-7).marginTop],
        }),
      },
    ],
  };

  return (
    <ThemedSafe style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_MAX_HEIGHT, 0, HEADER_SCROLL_DISTANCE],
                  outputRange: [
                    -HEADER_MAX_HEIGHT / 2,
                    0,
                    HEADER_SCROLL_DISTANCE / 2,
                  ],
                  extrapolate: "clamp",
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_MAX_HEIGHT, 0],
                  outputRange: [2, 1],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <ThemedView
          colorType={"screenBG"}
          style={[
            {
              paddingHorizontal: getWidthnHeight(3)?.width,
              borderWidth: 0,
              flex: 1,
              paddingBottom: getWidthnHeight(4)?.width,
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
            Make an offer now
          </ThemedText>
          <ThemedText
            style={[
              {
                fontSize: fontSizeH4().fontSize + 5,
                fontWeight: "normal",
              },
              getMarginTop(1.5),
            ]}
          >
            60 Taskers have viewed this task already
          </ThemedText>
          <FlatButton
            lightColor={Colors[theme]["yellow"]}
            darkColor={Colors[theme]["yellow"]}
            title="Make an offer"
            onPress={() => {}}
            style={[
              {
                borderRadius: getWidthnHeight(10)?.width,
                paddingHorizontal: getWidthnHeight(5)?.width,
                width: "100%",
              },
              getMarginTop(2),
            ]}
            textStyle={{
              paddingVertical: getWidthnHeight(3)?.width,
              fontSize: fontSizeH4().fontSize + 4,
            }}
          />
        </ThemedView>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <ThemedView
          colorType={"screenBG"}
          style={{
            flex: 1,
            paddingHorizontal: getWidthnHeight(3)?.width,
          }}
        >
          <ThemedView colorType={"white"} style={[styles.shadow]}>
            <View
              style={[
                {
                  paddingTop: getWidthnHeight(2)?.width,
                },
              ]}
            >
              <View
                style={{
                  paddingHorizontal: getWidthnHeight(2)?.width,
                }}
              >
                <View
                  style={[
                    {
                      shadowColor: Colors[theme]["iconColor"],
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                  ]}
                >
                  <ThemedView
                    colorType={"yellow"}
                    style={{
                      paddingHorizontal: getWidthnHeight(2)?.width,
                      borderRadius: getWidthnHeight(5)?.width,
                    }}
                  >
                    <ThemedText style={{ fontSize: fontSizeH4().fontSize - 2 }}>
                      OPEN
                    </ThemedText>
                  </ThemedView>
                  <ThemedView
                    colorType={"iconColor"}
                    style={{
                      paddingHorizontal: getWidthnHeight(2)?.width,
                      borderRadius: getWidthnHeight(5)?.width,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <ThemedAntDesign
                      name={"heart"}
                      colorType={"buttonBG"}
                      size={getWidthnHeight(3)?.width}
                    />
                    <ThemedText
                      colorType={"buttonBG"}
                      style={[
                        { fontSize: fontSizeH4().fontSize - 2 },
                        getMarginLeft(1),
                      ]}
                    >
                      Follow
                    </ThemedText>
                  </ThemedView>
                </View>
                <ThemedText
                  style={[
                    fontSizeH2(),
                    {
                      fontFamily: "SquadaOne_400Regular",
                      color: Colors[theme]["iconColor"],
                    },
                    getMarginTop(2),
                  ]}
                >
                  {taskDetails?.title}
                </ThemedText>
              </View>
              <PostComponent
                showDropdownIcon={true}
                style={{
                  marginTop: getMarginTop(2).marginTop,
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  paddingVertical: getWidthnHeight(1)?.width,
                  borderWidth: 0.01,
                  borderColor: "transparent",
                }}
                subtitle="Jane A."
                icon={
                  <ThemedFontAwesome
                    name={"user-circle"}
                    colorType={"yellow"}
                    size={getWidthnHeight(7)?.width}
                  />
                }
              />
              <PostComponent
                style={{
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  paddingVertical: getWidthnHeight(1)?.width,
                  borderWidth: 0.01,
                  borderColor: "transparent",
                  backgroundColor: Colors[theme]["commonScreenBG"],
                }}
                time={null}
                title={"LOCATION"}
                subtitle="Remote"
                icon={
                  <ThemedIonicons
                    name={"location-outline"}
                    colorType={"iconColor"}
                    size={getWidthnHeight(7)?.width}
                  />
                }
              />
              <PostComponent
                style={{
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  paddingVertical: getWidthnHeight(1)?.width,
                  borderWidth: 0.01,
                  borderColor: "transparent",
                }}
                time={null}
                title={"TO BE DONE ON"}
                subtitle={"Flexible"}
                icon={
                  <ThemedFontAwesome
                    name={"calendar-check-o"}
                    colorType={"iconColor"}
                    size={getWidthnHeight(6)?.width}
                  />
                }
              />
              <PostComponent
                style={{
                  paddingHorizontal: getWidthnHeight(2)?.width,
                  paddingVertical: getWidthnHeight(1)?.width,
                  borderWidth: 0.01,
                  borderColor: "transparent",
                  backgroundColor: Colors[theme]["commonScreenBG"],
                }}
                time={null}
                title={"TASK BUDGET"}
                subtitle="700 USD"
                icon={
                  <ThemedFontAwesome
                    name={"dollar"}
                    colorType={"iconColor"}
                    size={getWidthnHeight(6)?.width}
                  />
                }
              />
            </View>
          </ThemedView>

          <View>
            <Animated.View
              style={[
                {
                  borderWidth: 0,
                },
                getMarginTop(2),
              ]}
            >
              <ThemedView
                colorType={"white"}
                style={[
                  {
                    padding: getWidthnHeight(3)?.width,
                  },
                  styles.shadow,
                ]}
              >
                <ThemedText
                  style={{
                    fontSize: fontSizeH4().fontSize + 4,
                    fontWeight: "500",
                  }}
                >
                  Details
                </ThemedText>
                <ThemedText
                  style={[
                    {
                      fontSize: fontSizeH4().fontSize + 2,
                      textAlign: "justify",
                      borderWidth: 0,
                    },
                    getMarginTop(2),
                  ]}
                >
                  {`We are seeking a detail-oriented freelancer to transcribe data from PDF files into Excel spreadsheets.
              \nThe ideal candidate will have experience in accurately converting text and tables, ensuring that all data is entered correctly and formatted appropriately. This project requires attention to detail and proficiency with both PDF and Excel. If you have a keen eye for detail and can work efficiently, we would love to hear from you!`}
                </ThemedText>
                {/* <Animated.View
                  style={[
                    {
                      borderWidth: 0,
                    },
                    animatedStyle,
                  ]}
                >
                  <ThemedGradientView
                    style={{
                      paddingTop: getWidthnHeight(20)?.width,
                      borderWidth: 0,
                    }}
                    colors={["transparent", Colors[theme]["background"]]}
                    locations={[0, 0.6]} // Top color takes up 80% of the space
                    start={{ x: 0, y: 0 }} // Top
                    end={{ x: 0, y: 1 }} // Bottom
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0,
                      }}
                      onPress={() => setExpand(!expand)}
                    >
                      <ThemedText>{expand ? "More" : "Less"}</ThemedText>
                      <ThemedMaterialIcons
                        name={
                          expand ? "keyboard-arrow-down" : "keyboard-arrow-up"
                        }
                        colorType={"iconColor"}
                        size={getWidthnHeight(6)?.width}
                      />
                    </TouchableOpacity>
                  </ThemedGradientView>
                </Animated.View> */}
                <ThemedView
                  colorType={"commonScreenBG"}
                  style={[
                    {
                      flexDirection: "row",
                      borderRadius: getWidthnHeight(10)?.width,
                    },
                    getMarginTop(2),
                  ]}
                >
                  <FlatButton
                    colorType={selectedOffers ? "yellow" : "transparent"}
                    title="Offers"
                    onPress={() => setSelectedOffers(true)}
                    style={[
                      {
                        borderRadius: getWidthnHeight(10)?.width,
                        paddingHorizontal: getWidthnHeight(5)?.width,
                        width: "50%",
                      },
                    ]}
                    textStyle={{
                      paddingVertical: getWidthnHeight(3)?.width,
                      fontSize: fontSizeH4().fontSize + 4,
                    }}
                  />
                  <FlatButton
                    colorType={!selectedOffers ? "yellow" : "transparent"}
                    title="Questions"
                    onPress={() => setSelectedOffers(false)}
                    style={[
                      {
                        borderRadius: getWidthnHeight(10)?.width,
                        paddingHorizontal: getWidthnHeight(5)?.width,
                        width: "50%",
                      },
                    ]}
                    textStyle={{
                      paddingVertical: getWidthnHeight(3)?.width,
                      fontSize: fontSizeH4().fontSize + 4,
                    }}
                  />
                </ThemedView>
                <ThemedView style={[{ borderWidth: 0 }, getMarginTop(3)]}>
                  {selectedOffers && (
                    <>
                      <UserDetails
                        title={"Leonardo C."}
                        ratings={"4.9"}
                        count={25}
                        subTitle={"94%"}
                      />
                      <ThemedView
                        style={{
                          flex: 1,
                        }}
                      >
                        <Animated.View
                          style={[
                            {
                              padding: getWidthnHeight(4)?.width,
                              borderRadius: getWidthnHeight(2)?.width,
                              backgroundColor: Colors[theme]["commonScreenBG"],
                            },
                            animateHeight,
                          ]}
                        >
                          <ThemedText
                            style={[
                              {
                                fontSize: fontSizeH4().fontSize + 2,
                                textAlign: "justify",
                                borderWidth: 0,
                              },
                            ]}
                          >
                            {`We are seeking a detail-oriented freelancer to transcribe data from PDF files into Excel spreadsheets.
              \nThe ideal candidate will have experience in accurately converting text and tables, ensuring that all data is entered correctly and formatted appropriately. This project requires attention to detail and proficiency with both PDF and Excel. If you have a keen eye for detail and can work efficiently, we would love to hear from you!`}
                          </ThemedText>
                          <Animated.View
                            style={[
                              { flex: 1 },
                              animateVertically,
                              getMarginTop(2),
                            ]}
                          >
                            <ThemedView
                              colorType={"commonScreenBG"}
                              style={{
                                flex: 1,
                                paddingTop: getWidthnHeight(5)?.width,
                              }}
                            >
                              <TouchableOpacity
                                style={{
                                  justifyContent: "flex-start",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  // paddingBottom: getMarginTop(4).marginTop,
                                }}
                                onPress={() => setExpand(!expand)}
                              >
                                <ThemedText>
                                  {expand ? "More" : "Less"}
                                </ThemedText>
                                <ThemedMaterialIcons
                                  name={
                                    expand
                                      ? "keyboard-arrow-down"
                                      : "keyboard-arrow-up"
                                  }
                                  colorType={"iconColor"}
                                  size={getWidthnHeight(6)?.width}
                                />
                              </TouchableOpacity>
                            </ThemedView>
                          </Animated.View>
                        </Animated.View>
                      </ThemedView>
                      <View
                        style={[
                          {
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          },
                          getMarginTop(3),
                        ]}
                      >
                        <View
                          style={[
                            {
                              flexDirection: "row",
                              alignItems: "center",
                            },
                          ]}
                        >
                          <ThemedAntDesign
                            name={"back"}
                            colorType={"iconColor"}
                            size={getWidthnHeight(5)?.width}
                          />
                          <ThemedText
                            style={[
                              {
                                fontSize: fontSizeH4().fontSize + 2,
                                fontWeight: "500",
                              },
                              getMarginLeft(2),
                            ]}
                          >
                            View replies (1)
                          </ThemedText>
                          <ThemedText
                            colorType={"darkGray"}
                            style={[
                              {
                                fontSize: fontSizeH4().fontSize + 2,
                              },
                              getMarginLeft(2),
                            ]}
                          >
                            1 week ago
                          </ThemedText>
                        </View>
                        <ThemedMaterialCommunityIcons
                          name={"dots-horizontal"}
                          colorType={"darkGray"}
                          size={getWidthnHeight(5)?.width}
                        />
                      </View>
                    </>
                  )}
                  {!selectedOffers && (
                    <ThemedView>
                      <ThemedView
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <ThemedIonicons
                          name="eye-outline"
                          colorType={"darkGray"}
                          size={getWidthnHeight(6)?.width}
                        />
                        <ThemedText
                          colorType={"darkGray"}
                          style={[
                            {
                              flex: 1,
                              fontSize: fontSizeH4().fontSize + 3,
                            },
                            getMarginLeft(2),
                          ]}
                        >
                          {
                            "These messages are publlic and can be seen by anyone. Do not share your personal info."
                          }
                        </ThemedText>
                      </ThemedView>
                      <View style={[{ flexDirection: "row" }, getMarginTop(2)]}>
                        <ThemedFontAwesome
                          name={"user-circle-o"}
                          colorType={"darkGray"}
                          size={getWidthnHeight(5)?.width}
                        />
                        <ThemedView
                          colorType={"commonScreenBG"}
                          style={[
                            {
                              borderRadius: getWidthnHeight(2)?.width,
                              paddingHorizontal: getWidthnHeight(2)?.width,
                              flex: 1,
                            },
                            getMarginLeft(2),
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
                            placeholder="Ask a question"
                            placeholderTextColor={"darkGray"}
                            onChangeText={(text) => {}}
                          />
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              paddingBottom: getWidthnHeight(2)?.width,
                            }}
                          >
                            <ThemedIonicons
                              name={"image"}
                              colorType={"darkGray"}
                              size={getWidthnHeight(5)?.width}
                            />
                            <FlatButton
                              title={"Send"}
                              onPress={() => {}}
                              colorType={"commonScreenBG"}
                              style={{
                                borderRadius: getWidthnHeight(10)?.width,
                                borderWidth: 1,
                              }}
                              textStyle={{
                                fontWeight: "normal",
                                fontSize: fontSizeH4().fontSize + 3,
                                paddingHorizontal: getWidthnHeight(5)?.width,
                                paddingVertical: getWidthnHeight(1)?.width,
                              }}
                            />
                          </View>
                        </ThemedView>
                      </View>
                      <View style={[{ flex: 1 }, getMarginTop(2)]}>
                        <ChatComponent />
                        <ChatComponent style={getMarginTop(2)} />
                      </View>
                    </ThemedView>
                  )}
                </ThemedView>
              </ThemedView>
            </Animated.View>
          </View>
          <ThemedView
            colorType={"white"}
            style={[styles.shadow, getMarginVertical(2)]}
          >
            <View
              style={{
                padding: getWidthnHeight(3)?.width,
              }}
            >
              <ThemedText
                style={{
                  fontSize: fontSizeH4().fontSize + 4,
                  fontWeight: "500",
                }}
              >
                What happens when a task is cancelled
              </ThemedText>
              <ThemedText
                style={[
                  {
                    fontSize: fontSizeH4().fontSize + 2,
                    // lineHeight: -1,
                    textAlign: "justify",
                    borderWidth: 0,
                  },
                  getMarginTop(2),
                ]}
              >
                {`If you are responsible for cancelling this task, a Cancellation Fee will be deducted from your next payment payout(s).`}
              </ThemedText>
            </View>
          </ThemedView>
        </ThemedView>
      </Animated.ScrollView>
    </ThemedSafe>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    width: "100%",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT - getWidthnHeight(5)?.width!, // Space for the header
  },
});

export { TaskDetails };
