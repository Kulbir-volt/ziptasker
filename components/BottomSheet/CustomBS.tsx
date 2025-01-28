import React, { useMemo, useCallback, forwardRef, useEffect } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { fontSizeH4, getMarginTop, getWidthnHeight } from "../width";
import { ThemedText } from "../ThemedText";
import { ThemedBSView } from "../ThemedBSView";

interface BottomSheetProps extends Partial<BottomSheetModalProps> {
  snapPoints?: string[]; // Snap points for the BottomSheet
  children?: React.ReactNode; // Content to render in the BottomSheet
  onOpen?: () => void;
  onClose?: () => void; // Callback when BottomSheet closes
  backgroundStyle?: StyleProp<ViewStyle>; // Custom background style
  bsStyle?: StyleProp<ViewStyle>;
}

const CustomBS = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      snapPoints = ["70%"],
      children,
      onClose,
      backgroundStyle,
      bsStyle,
      onOpen = () => {},
      ...otherProps
    },
    ref
  ) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const handleSheetChanges = useCallback((index: number) => {
      if (index < 0) {
        console.log("Additional Bottom Sheet", index);
      } else {
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
