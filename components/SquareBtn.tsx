import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

interface SquareBtnProps extends TouchableOpacityProps {
  title: string;
  backgroundColor: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
}

const SquareBtn: React.FC<SquareBtnProps> = ({
  onPress,
  title,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
  },
  buttonText: {
    color: "#ffffff", // White color, you can change this to your desired color
    fontSize: 16,
  },
});

export default SquareBtn;
