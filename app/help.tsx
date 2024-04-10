import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/styles";
import colors from "@/constants/colors";
import { router } from "expo-router";
import { BlurView } from "expo-blur";

const Page = () => {
  return (
    <BlurView intensity={100} style={styles.modalContainer}>
      <View style={styles.modal}>
        <Text style={{ flex: 1 }}>Page</Text>
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: colors.gray,
              width: "95%",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.dark,
            },
          ]}
          onPress={router.back}
        >
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "500",
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

export default Page;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.lightGray,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    paddingTop: 150,
  },
});
