import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/styles";
import colors from "@/constants/colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

enum SignInType {
  Phone,
  Email,
  Google,
}

const Page = () => {
  const onSignin = async (type: SignInType) => {
    if (type === SignInType.Email) {
      console.log("onEmailSignin");
    } else if (type === SignInType.Google) {
      console.log("onGoogleSignin");
    } else if (type === SignInType.Phone) {
      console.log("onPhoneSignin");
    }
  };

  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Welcome back!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter the phone number associated with your account.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.inputField, { width: 60 }]}
          value={countryCode}
          placeholder="+XX"
          placeholderTextColor={colors.gray}
          keyboardType="numeric"
          onChangeText={setCountryCode}
        />
        <TextInput
          style={[styles.inputField, { flex: 1 }]}
          placeholder="Phone number"
          placeholderTextColor={colors.gray}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          phoneNumber !== "" ? styles.enabled : styles.disabled,
          { marginBottom: 20, marginTop: 20 },
        ]}
        // onPress={() => onSignin(SignInType.Phone)}
        disabled={phoneNumber === ""}
      >
        <Text style={defaultStyles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
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
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            backgroundColor: colors.lightGray,
            marginTop: 20,
            flexDirection: "row",
            gap: 16,
          },
        ]}
        onPress={() => onSignin(SignInType.Google)}
      >
        <Ionicons name="logo-google" size={24} color="black" />
        <Text style={[defaultStyles.buttonText, { color: colors.dark }]}>
          Continue with Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          {
            backgroundColor: colors.lightGray,
            marginTop: 20,
            flexDirection: "row",
            gap: 16,
          },
        ]}
        onPress={() => onSignin(SignInType.Email)}
      >
        <Ionicons name="mail" size={24} color="black" />
        <Text style={[defaultStyles.buttonText, { color: colors.dark }]}>
          Continue with Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  inputField: {
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 16,
    fontSize: 20,
  },
  enabled: {
    backgroundColor: colors.primary,
  },
  disabled: {
    backgroundColor: colors.primaryMuted,
  },
});

export default Page;