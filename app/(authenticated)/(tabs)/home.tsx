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
    const firstName = Math.random().toString(36).substring(7);

    createPlayer({
      playerId: firstName + Math.random().toString(36).substring(7),
      firstName: firstName,
      lastName: "",
      gender: "",
      height: 0,
      email: "",
      phoneNumber: "",
      birthDate: new Date(),
      position: "",
      teamId: "",
      team: "",
      created: new Date(),
    });
  };

  const editSelectedPlayer = () => {
    console.log("editSelectedPlayer");
  };

  return (
    <View style={{ flex: 1 }}>
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

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.players}>
          {players.length === 0 ? (
            <Text style={{ padding: 14, color: colors.gray }}>No Players</Text>
          ) : (
            players.map((player) => (
              <View key={player.playerId} style={styles.player}>
                <View style={styles.circle}>
                  <Ionicons
                    name={player.gender === "Male" ? "male" : "female"}
                    size={24}
                    color={colors.dark}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "bold" }}>{player.firstName}</Text>
                  <Text>{player.lastName}</Text>
                  <Text>{player.playerId}</Text>
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
