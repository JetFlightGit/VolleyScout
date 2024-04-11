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
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

const Page = () => {
  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { signUp } = useSignUp();
  const router = useRouter();

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    console.log(fullPhoneNumber);
    try {
      await signUp!.create({
        phoneNumber: fullPhoneNumber,
      });
      signUp!.preparePhoneNumberVerification();
      router.push({
        pathname: "/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Lets get started!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number. We will send you a confirmation code there.
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

      <Link href={"/login"} style={{ marginTop: 20 }} replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>I already have an account</Text>
        </TouchableOpacity>
      </Link>

      <View style={{ flex: 1 }} />
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          phoneNumber !== "" ? styles.enabled : styles.disabled,
          { marginBottom: 20 },
        ]}
        onPress={onSignup}
        disabled={phoneNumber === ""}
      >
        <Text style={defaultStyles.buttonText}>Sign Up</Text>
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
