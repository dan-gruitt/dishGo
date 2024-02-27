import React, { useContext, useState } from "react";
import { Alert, StyleSheet, View, AppState } from "react-native";
import { Modal, Portal, Text } from "react-native-paper";
import { supabase } from "../lib/supabase";
import { Button, Input } from "react-native-elements";
import { UserContext } from "../context/UserContext";
import { Session } from '@supabase/supabase-js'




// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth({ session }: { session: Session }) {



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { User, setUser } = useContext(UserContext);

  // pop up
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  // pop up

  //////

  async function getProfile() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUser(data);
        setLoading(false);
        console.log(data, "<<<< user?");
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        console.log(error, "<<< inside getProfile catch");
      }
    }
  }

  /////

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: signInEmail,
      password: signInPassword,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      getProfile();
    }
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);

    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.popUpContainer}
        >
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Text style={styles.signInText}>Welcome back!</Text>
            <Input
              inputContainerStyle={styles.inputInnerContainer}
              inputStyle={styles.input}
              containerStyle={styles.inputOuterContainer}
              labelStyle={styles.labels}
              label="Email"
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "#FFF",
                size: 16,
              }}
              onChangeText={(text) => setSignInEmail(text)}
              value={signInEmail}
              placeholder="email@address.com"
              autoCapitalize={"none"}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              inputContainerStyle={styles.inputInnerContainer}
              inputStyle={styles.input}
              containerStyle={styles.inputOuterContainer}
              labelStyle={styles.labels}
              label="Password"
              leftIcon={{
                type: "font-awesome",
                name: "lock",
                color: "#FFF",
                size: 16,
              }}
              onChangeText={(text) => setSignInPassword(text)}
              value={signInPassword}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
            />
          </View>
          <View>
            <Button
              titleStyle={styles.signUpButtonText}
              buttonStyle={styles.signInButton}
              title="Sign In"
              disabled={loading}
              onPress={() => signInWithEmail()}
            />
          </View>
        </Modal>
      </Portal>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            inputContainerStyle={styles.inputInnerContainer}
            inputStyle={styles.input}
            containerStyle={styles.inputOuterContainer}
            labelStyle={styles.labels}
            label="Email"
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "#FFF",
              size: 16,
            }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            inputContainerStyle={styles.inputInnerContainer}
            inputStyle={styles.input}
            containerStyle={styles.inputOuterContainer}
            labelStyle={styles.labels}
            label="Password"
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: "#FFF",
              size: 16,
            }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={"none"}
          />
        </View>

        <View style={styles.signUpView}>
          <Button
            titleStyle={styles.signUpButtonText}
            buttonStyle={styles.signUpButton}
            title="Sign Up"
            disabled={loading}
            onPress={() => signUpWithEmail()}
          />
        </View>
        <View style={styles.signInView}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <Button
            buttonStyle={styles.signInButton}
            titleStyle={styles.signInButtonText}
            title="Sign in"
            disabled={loading}
            onPress={() => {
              showModal();
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 36,
    display: "flex",
    flex: 1,
    paddingHorizontal: 28,
    backgroundColor: "#4C5B61",
  },
  popUpContainer: {
    padding: 28,
    borderRadius: 38,
    backgroundColor: "#3AD6A7",
  },
  labels: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  inputOuterContainer: {
    paddingHorizontal: 0,
    fontSize: 20,
  },
  inputInnerContainer: {
    borderBottomWidth: 2,
    borderColor: "#FFF",
  },
  input: {
    color: "#FFF",
    textDecorationLine: "none",
    paddingLeft: 24,
    fontSize: 14,
  },
  signUpView: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  signUpButton: {
    width: 93,
    backgroundColor: "#3AD6A7",
    borderRadius: 29,
  },
  signUpButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.6,
  },
  signInView: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  signInText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.6,
  },
  signInButton: {
    width: 93,
    backgroundColor: "#4C5B61",
    borderRadius: 29,
  },
  signInButtonText: {
    color: "#3AD6A7",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.6,
  },
  verticallySpaced: {
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
