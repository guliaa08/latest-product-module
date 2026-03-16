import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions, Pressable } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const BottomSheet = ({ visible, onClose, children, height =100 }) => {

  const sheetHeight =  height;

  const translateY = useRef(new Animated.Value(sheetHeight)).current;

  useEffect(() => {

    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,              // move up
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: sheetHeight,    // move down
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>

      <Pressable style={styles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          styles.sheet,
          {
            height: sheetHeight,
            transform: [{ translateY }],
          },
        ]}
      >
        {children}
      </Animated.View>

    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  sheet: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  
});