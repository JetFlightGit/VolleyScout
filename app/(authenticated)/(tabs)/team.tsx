import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import React, { useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import RoundBtn from "@/components/RoundBtn";
import { useTeamStore } from "@/store/teamStore";
import colors from "@/constants/colors";
import { Modal } from "@/components/Modal";
import TeamInput from "@/components/inputs/TeamInput";

interface TeamItem {
  teamId: string;
  name: string;
}

const Separator = () => <View style={styles.itemSeparator} />;

const RightSwipeActions = ({ item }: { item: TeamItem }) => {
  const { deleteTeam } = useTeamStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this team?",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "OK", onPress: () => deleteTeam(item.teamId) },
            ],
            { cancelable: false },
          );
        }}
        style={{
          backgroundColor: "#d54b48",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "100%",
        }}
      >
        <Text
          style={{
            color: "#1b1a17",
            fontWeight: "800",
            paddingHorizontal: 30,
            paddingVertical: 20,
            fontSize: 18,
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(true);
        }}
        style={{
          backgroundColor: "#53bcdc",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "100%",
        }}
      >
        <Text
          style={{
            color: "#1b1a17",
            fontSize: 18,
            fontWeight: "800",
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Edit
        </Text>
      </TouchableOpacity>
      <Modal isOpen={isModalVisible}>
        <TeamInput
          setIsModalVisible={setIsModalVisible}
          isCreate={false}
          item={item}
        />
      </Modal>
    </>
  );
};

const ListItem = ({ item }: { item: TeamItem }) => {
  const swipeableRef = useRef<Swipeable>(null);
  const resetSwipeableState = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  return (
    <View>
      <Swipeable
        renderRightActions={() => <RightSwipeActions item={item} />}
        leftThreshold={50}
        ref={swipeableRef}
        onSwipeableOpen={resetSwipeableState}
      >
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontSize: 24 }}>{item.name} </Text>
        </View>
      </Swipeable>
    </View>
  );
};

const teamsPage = () => {
  const { teams } = useTeamStore();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", marginVertical: 20 }}>
        Swipe left to Edit or Delete.
      </Text>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={teams}
        keyExtractor={(item) => item.teamId}
        renderItem={({ item }) => <ListItem item={item} />}
        ItemSeparatorComponent={() => <Separator />}
      />
      <View style={styles.absoluteView}>
        <RoundBtn
          icon={"create"}
          title=""
          onPress={() => setIsModalVisible(true)}
        />
      </View>
      <Modal isOpen={isModalVisible}>
        <TeamInput setIsModalVisible={setIsModalVisible} isCreate={true} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemSeparator: {
    flex: 1,
    height: 1,
    backgroundColor: "#444",
  },
  absoluteView: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
});

export default teamsPage;
