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
import Hairline from "@/components/hairline";

const Page = () => {
  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const { signUp } = useSignUp();
  const router = useRouter();

  const onSignup = async () => {
    if (email.length > 0) {
      console.log(email);
      try {
        await signUp!.create({ emailAddress: email });
        signUp!.prepareEmailAddressVerification();
        router.push({
          pathname: "/verify/email/[email]",
          params: { email: email },
        });
      } catch (error) {
        console.error("Email SignUp", error);
      }
    } else {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      try {
        await signUp!.create({
          phoneNumber: fullPhoneNumber,
        });
        signUp!.preparePhoneNumberVerification();
        router.push({
          pathname: "/verify/phone/[phone]",
          params: { phone: fullPhoneNumber },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Lets get started!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number or email address. We will send you a
        confirmation code there.
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
      <Hairline />
      <View>
        <TextInput
          style={[styles.inputField, { width: "100%" }]}
          value={email}
          placeholder="Email Address"
          placeholderTextColor={colors.gray}
          keyboardType="email-address"
          onChangeText={setEmail}
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
          (phoneNumber !== "" || email !== "") &&
          (phoneNumber === "" || email === "")
            ? styles.enabled
            : styles.disabled,
          { marginBottom: 20 },
        ]}
        onPress={onSignup}
        disabled={
          (phoneNumber === "" && email === "") ||
          (phoneNumber !== "" && email !== "")
        }
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
