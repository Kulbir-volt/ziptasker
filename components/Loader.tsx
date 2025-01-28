import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  ModalProps,
  ActivityIndicator,
  Text,
} from "react-native";

import { Colors } from "../constants/Colors";
import {
  fontSizeH3,
  fontSizeH4,
  getMarginLeft,
  getMarginTop,
  getWidthnHeight,
} from "./width";

type LoaderProps = ModalProps & {
  title?: string;
  details?: ReactNode | undefined;
};

const Loader: React.FC<LoaderProps> = ({
  title = "Loading",
  details,
  visible,
  ...otherProps
}) => {
  const [text, setText] = useState<string>("");
  const [count, setCount] = useState<number>(0); // Tracks the dot count
  const [incrementing, setIncrementing] = useState<boolean>(true); // Flag to determine if counting should be incrementing or decrementing

  useEffect(() => {
    if (visible) {
      const intervalId = setInterval(() => {
        if (incrementing) {
          setCount((prevCount) => {
            if (prevCount === 3) {
              setIncrementing(false);
              return prevCount;
            }
            return prevCount + 1;
          });
        } else {
          setCount((prevCount) => {
            if (prevCount === 0) {
              setIncrementing(true);
              return prevCount;
            }
            return prevCount - 1;
          });
        }
      }, 500);

      // Cleanup interval when the component unmounts or visibility changes
      return () => clearInterval(intervalId);
    } else {
      setText(""); // Clear text when modal is hidden
    }
  }, [visible, incrementing]);

  useEffect(() => {
    setText(".".repeat(count));
  }, [count]);

  return (
    <Modal visible={visible} {...otherProps}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <ActivityIndicator
          style={{ transform: [{ scale: 1.5 }] }}
          size={"large"}
          color={Colors.light.yellow}
        />
        <View
          style={[
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            },
            getMarginTop(1),
          ]}
        >
          <Text
            style={[
              {
                fontSize: fontSizeH3().fontSize - 2,
                color: Colors.light.white,
                fontWeight: "500",
              },
              getMarginLeft(8),
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              {
                fontSize: fontSizeH3().fontSize,
                color: Colors.light.white,
                fontWeight: "500",
                width: "8%",
                height: "100%",
                borderWidth: 0,
              },
            ]}
          >
            {text}
          </Text>
        </View>
        {details}
      </View>
    </Modal>
  );
};

export { Loader };
