import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/styles";
import RoundBtn from "@/components/RoundBtn";
import Dropdown from "@/components/dropdown";
const addSomething = () => {
  console.log("Add something");
};
const page = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={defaultStyles.header}>Home</Text>
      </View>
      <View style={styles.actionRow}>
        <RoundBtn icon={"create"} title="Add" onPress={addSomething} />
        <RoundBtn icon={"copy"} title="Copy" onPress={addSomething} />
        <RoundBtn icon={"trash-bin"} title="Delete" onPress={addSomething} />
        <Dropdown />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  container: {
    height: Dimensions.get("window").height / 4,
    padding: 10,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default page;
