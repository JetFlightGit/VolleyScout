import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "@/constants/colors";

const Hairline = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: 20,
        marginTop: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          height: StyleSheet.hairlineWidth,
          backgroundColor: colors.gray,
        }}
      />
      <Text style={{ color: colors.gray, fontSize: 20 }}>or</Text>
      <View
        style={{
          flex: 1,
          height: StyleSheet.hairlineWidth,
          backgroundColor: colors.gray,
        }}
      />
    </View>
  );
};

export default Hairline;
