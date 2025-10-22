import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomSheetComponent = ({
  isOpen = false,
  onClose = () => {},
  snapPoint = ['100%'],
  isInsideSafeArea = false,
  children,
  ...props
}) => {
  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => snapPoint || ['10%', '70%'], [snapPoint]);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  useEffect(() => {
    setBottomSheetOpen(isOpen);
  }, [isOpen]);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      setBottomSheetOpen(false);
      onClose();
    }
  }, []);

  useEffect(() => {
    if (!bottomSheetRef.current) return;

    const timer = setTimeout(() => {
      if (bottomSheetOpen) {
        bottomSheetRef.current.expand();
      } else {
        bottomSheetRef?.current?.close();
        onClose?.();
      }
    }, 50); // wait a bit to ensure layout is ready

    return () => clearTimeout(timer);
  }, [bottomSheetOpen]);

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity={1.4}
        zIndex={10}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
      />
    ),
    []
  );

  const insets = useSafeAreaInsets();

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      enableDynamicSizing={true}
      style={{ zIndex: 999 }}
      onChange={handleSheetChanges}
      {...props}>
      <BottomSheetScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: isInsideSafeArea ? 22 : insets.bottom + 12 },
        ]}>
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    // backgroundColor: '#fff',
    // paddingVertical: 30,
  },
});

export default BottomSheetComponent;
