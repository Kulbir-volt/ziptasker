import React, {
  useMemo,
  useCallback,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInput,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetBackdropProps,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import {
  fontSizeH4,
  getMarginTop,
  getMarginVertical,
  getWidthnHeight,
} from "../width";
import { ThemedText } from "../ThemedText";
import { ThemedBSView } from "../ThemedBSView";
import { ThemedView } from "../ThemedView";
import { ThemedSafe } from "../ThemedSafe";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconTextInput } from "../IconTextInput";
import { ThemedIonicons } from "../ThemedIonicons";

interface BottomSheetProps extends Partial<BottomSheetModalProps> {
  snapPoints?: string[]; // Snap points for the BottomSheet
  children?: React.ReactNode; // Content to render in the BottomSheet
  onOpen?: () => void;
  onClose?: () => void; // Callback when BottomSheet closes
  backgroundStyle?: StyleProp<ViewStyle>; // Custom background style
  bsStyle?: StyleProp<ViewStyle>;
  enableSearch?: boolean;
  clearSearch?: () => void;
  searchText?: string;
  onChangeText?: (value: string) => void;
}

const CustomBS = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      snapPoints = ["70%"],
      children,
      onClose = () => {},
      backgroundStyle,
      bsStyle,
      onOpen = () => {},
      enableSearch = false,
      clearSearch = () => {},
      searchText,
      onChangeText = () => {},
      ...otherProps
    },
    ref
  ) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, []);

    const locationInputRef = useRef<TextInput>(null);

    function focusLocationInput() {
      locationInputRef.current?.focus();
    }

    const handleSheetChanges = useCallback((index: number) => {
      if (index < 0) {
        // console.log("Additional Bottom Sheet", index);
        onClose();
      } else {
        // console.log("Open Bottom Sheet", index);
        focusLocationInput();
        onOpen();
      }
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={memoizedSnapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        onChange={handleSheetChanges}
        animateOnMount
        backgroundStyle={[
          {
            borderRadius: getWidthnHeight(5)?.width,
          },
          backgroundStyle,
        ]}
        {...otherProps}
      >
        <ThemedBSView style={[styles.contentContainer, bsStyle]}>
          {enableSearch && (
            <IconTextInput
              ref={locationInputRef}
              value={searchText}
              onChangeText={onChangeText}
              onClear={clearSearch}
              containerStyle={[
                { width: "90%", borderWidth: 0 },
                getMarginVertical(2),
              ]}
              icon={
                <ThemedIonicons
                  name="location"
                  colorType={"iconColor"}
                  size={getWidthnHeight(7)?.width}
                />
              }
              placeholder="Enter your postcode"
              placeholderTextColor={"darkGray"}
              style={{
                flex: 1,
                paddingHorizontal: getWidthnHeight(3)?.width,
                marginVertical: getWidthnHeight(2)?.width,
                marginHorizontal: getWidthnHeight(1)?.width,
                fontSize: fontSizeH4().fontSize + 5,
                height: "100%",
              }}
            />
          )}
          {children}
        </ThemedBSView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});

export { CustomBS };
