import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Pressable,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/styles";
import RoundBtn from "@/components/RoundBtn";
import Dropdown from "@/components/Dropdown";
import { usePlayerStore } from "@/store/playerStore";
import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import SquareBtn from "@/components/SquareBtn";

const page = () => {
  const { players, createPlayer, editPlayer, deletePlayer } = usePlayerStore();

  const addSomething = () => {
    console.log("addSomething");
  };

  const createRandomPlayer = () => {
    createPlayer({
      id: Math.random().toString(),
      name: "Added Player",
      team: "Added Team",
      gender: "Male",
      created: new Date(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
    });
  };

  const editSelectedPlayer = () => {
    console.log("editSelectedPlayer");
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={defaultStyles.header}>
          {players.length} Players recorded!
        </Text>
      </View>
      <View style={styles.actionRow}>
        <RoundBtn icon={"create"} title="Add" onPress={createRandomPlayer} />
        <RoundBtn icon={"copy"} title="Copy" onPress={addSomething} />
        <RoundBtn icon={"trash-bin"} title="Delete" onPress={deletePlayer} />
        <Dropdown />
      </View>

      <ScrollView>
        <View style={styles.players}>
          {players.length === 0 ? (
            <Text style={{ padding: 14, color: colors.gray }}>No Players</Text>
          ) : (
            players.map((player) => (
              <View key={player.id} style={styles.player}>
                <View style={styles.circle}>
                  <Ionicons
                    name={player.gender === "Male" ? "male" : "female"}
                    size={24}
                    color={colors.dark}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{player.name}</Text>
                  <Text>{player.team}</Text>
                </View>
                <View>
                  <SquareBtn
                    title="Edit"
                    onPress={() => {}}
                    backgroundColor="blue"
                  />
                </View>
                <View style={{ paddingRight: 10 }}>
                  <SquareBtn
                    title="Delete"
                    onPress={() => {}}
                    backgroundColor="red"
                  />
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  container: {
    height: Dimensions.get("window").height / 8,
    padding: 10,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  players: {
    padding: 10,
    fontSize: 50,
    backgroundColor: "white",
    borderRadius: 16,
    fontWeight: "bold",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  player: {
    flexDirection: "row",
    gap: 20,
    paddingVertical: 10,
  },
});

export default page;
