import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/styles";
import colors from "@/constants/colors";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  isClerkAPIResponseError,
  useClerk,
  useSignIn,
} from "@clerk/clerk-expo";

enum SignInType {
  Phone,
  Email,
  Google,
  EmailPassword,
}

const Page = () => {
  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { signIn, setActive } = useSignIn();
  const { signOut } = useClerk();

  const onSignin = async (type: SignInType) => {
    if (type === SignInType.Email) {
      try {
        console.log(email);
        const { supportedFirstFactors } = await signIn!.create({
          identifier: email,
        });
        const firstEmailFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "email_code";
          },
        );

        const { emailAddressId } = firstEmailFactor;

        await signIn!.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId,
        });

        router.push({
          pathname: "/verify/email/[email]",
          params: { email: email, signin: "true" },
        });
      } catch (err) {
        console.log("Error on Signin Email");
        console.log("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          }
        }
      }
    } else if (type === SignInType.EmailPassword) {
      try {
        signOut();
        const password = "Clefli1.";
        const completeSignIn = await signIn!.create({
          identifier: email,
          password,
        });

        if (completeSignIn.status !== "complete") {
          // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
          // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
          console.log(JSON.stringify(completeSignIn, null, 2));
        }

        if (completeSignIn.status === "complete") {
          // If complete, user exists and provided password match -- set session active
          await setActive!({ session: completeSignIn.createdSessionId });
          // redirect the user how you see fit.
        }
      } catch (err: any) {
        // This can return an array of errors.
        // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
        console.error(JSON.stringify(err, null, 2));
      }
    } else if (type === SignInType.Google) {
      console.log("onGoogleSignin");
    } else if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          },
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/phone/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (err) {
        console.log("error", JSON.stringify(err, null, 2));
        if (isClerkAPIResponseError(err)) {
          if (err.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", err.errors[0].message);
          }
        }
      }
    }
  };

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Welcome back!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter the Email address associated with your account.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.inputField, { flex: 1 }]}
          placeholder="Email address"
          placeholderTextColor={colors.gray}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          email !== "" ? styles.enabled : styles.disabled,
          { marginBottom: 20, marginTop: 20 },
        ]}
        onPress={() => onSignin(SignInType.Email)}
        disabled={email === ""}
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
