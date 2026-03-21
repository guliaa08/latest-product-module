import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const SubmitOsa = ({ submitOSA, pending, scanned, isDisabled = true }) => {
  return (
    <View style={styles.submitOSA}>
      <Text style={styles.text}>
        {scanned > 0 ? scanned : 0}/{pending} items done
      </Text>
      <View>
        <Pressable
          disabled={isDisabled ? true : false}
          style={[
            styles.submitButton,
            isDisabled && { opacity: 0.5 }, // 👈 visual feedback
          ]}
          onPress={submitOSA}
        >
          <Text style={styles.submitOSAButton}>Submit OSA</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  submitOSA: {
    height: 64,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#000000",
  },
  submitOSAText: {
    height: 16,
    fontSize: 12,
    lineHeight: 16,
    color: "#FFFFFF",
  },
  submitButton: {
    height: 40,
  },

  submitOSAButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    lineHeight: 16,
    fontWeight: 600,
    gap: 10,
    color: "#ffffff",
    backgroundColor: "#2D64B8",
  },
  text: {
    color: "#ffffff",
  },
  buttonText: {
    color: "#ffffff",
  },
});

export default SubmitOsa;
