import React, { useContext, useState } from "react";
import { Alert, StyleSheet, View, AppState, Text } from "react-native";
import { Modal, Portal} from "react-native-paper";
import { supabase } from "../lib/supabase";
import { Button, Input } from "react-native-elements";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { useRoute } from "@react-navigation/native";
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

export default function Auth(props) {

  const currentPage = useRoute()

  const {isBusiness} = props

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // pop up
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  // pop up

  //////

  

  /////

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: signInEmail,
      password: signInPassword,
    });

    if (error) {
      Alert.alert(error.message);
    } 
    setLoading(false)
  }

  async function signUpWithEmail() {


    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp(
      {
      email: email,
      password: password,
      options: {
        data: {
          isBusiness: isBusiness,
        },
      },
    });

    if (error) Alert.alert(error.message);

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
          <View style={styles.verticallySpaced2}>
            <View style={styles.textContainer}>
            <Text style={{color: "#3AD6A7", fontWeight: "bold", fontSize: 23, textAlign: 'center', marginTop: 10}}>Welcome back!</Text>
            </View>
  
            <Input
              // inputContainerStyle={styles.inputInnerContainer}
              // inputStyle={styles.input}
              // containerStyle={styles.inputOuterContainer}
              // labelStyle={styles.labels}
              label="Email"
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "#4C5B61",
                size: 16,
              }}
              onChangeText={(text) => setSignInEmail(text)}
              value={signInEmail}
              placeholder="email@address.com"
              autoCapitalize={"none"}
              inputStyle={styles.input}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              // inputContainerStyle={styles.inputInnerContainer}
              // inputStyle={styles.input}
              // containerStyle={styles.inputOuterContainer}
              // labelStyle={styles.labels}
              label="Password"
              leftIcon={{
                type: "font-awesome",
                name: "lock",
                color: "#4C5B61",
                size: 16,
              }}
              inputStyle={styles.input}
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
              buttonStyle={styles.signInButton2}
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
            inputStyle={{color: "#FFF", ...styles.input}}
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
            inputStyle={{color: "#FFF", ...styles.input}}
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
    display: "flex",
    flex: 1,
    paddingHorizontal: 20,
  },
  popUpContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 38,
    backgroundColor: "white",
    margin: 10,
    alignItems:'center'
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
    textDecorationLine: "none",
    paddingLeft: 24,
    fontSize: 14,
  },
  signUpView: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButton: {
    width: 93,
    backgroundColor: "#3AD6A7",
    borderRadius: 29,
    marginTop:10,
    marginBottom: 30,
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
  },
  signInText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.6,
  },
  signInButton: {
    width: 93,
    backgroundColor: "rgba(0, 0, 0, 0)",
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
  signInButton2: {
    width: 93,
    backgroundColor: "#4C5B61",
    borderRadius: 29,
  },
  verticallySpaced2: {
    alignSelf: "stretch",
  },
  textContainer: {
    marginBottom: 20,
    marginTop: -10
  }
});
