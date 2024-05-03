import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import colors from "@/constants/colors";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { TextInput } from "react-native-gesture-handler";
import { useTeamStore } from "@/store/teamStore";
import { Item } from "zeego/dropdown-menu";

interface Props {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isCreate: boolean;
  item?: Team;
}

interface Team {
  name: string;
  teamId: string;
}

const TeamInput: React.FC<Props> = ({ setIsModalVisible, isCreate, item }) => {
  const [text, onChangeText] = React.useState(item != null ? item.name : "");
  const teamCurrent = item;
  const { createTeam, editTeam } = useTeamStore();

  return (
    <View style={styles.Modal}>
      <Text style={{ fontSize: 34 }}>Team Creation</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        selectTextOnFocus
        placeholder="Team Name"
        value={text}
      />
      <View
        style={{ flexDirection: "row", alignContent: "space-between", gap: 30 }}
      >
        <Pressable
          style={{
            backgroundColor: colors.gray,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => setIsModalVisible(false)}
        >
          <Text>Close</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#F3AE4D",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            setIsModalVisible(false);
            if (isCreate === true) {
              createTeam({
                name: text,
                teamId:
                  text +
                  Math.random().toString(36).substring(7).replace(/\s/g, ""),
              });
            } else if (teamCurrent) {
              console.log(teamCurrent.teamId);
              editTeam({
                name: text,
                teamId: teamCurrent.teamId,
              });
            }
          }}
        >
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Modal: {
    backgroundColor: colors.background,
    width: "90%",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "90%",
  },
});

export default TeamInput;
