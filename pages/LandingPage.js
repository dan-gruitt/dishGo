import React, { useState, useEffect, useContext } from "react";
import { View, Button, Text, Image, StyleSheet, Pressable } from "react-native";
import { supabase } from "../lib/supabase";
import { useRoute } from "@react-navigation/native";
import { CurrentPageContext } from "../context/CurrentPageContext";

export default function LandingPage({ navigation }) {
  const { setCurrentPage } = useContext(CurrentPageContext);
  const CurrentScreen = useRoute();

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    setCurrentPage(CurrentScreen.name);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../assets/landing-image.png")}
        />
      </View>

      <View style={styles.introButton}>
        <Pressable
          style={{backgroundColor: "#4C5B61", ...styles.button}}
          onPress={() => navigation.navigate("HomePage")}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FFF" }}>
            Lets Go!
          </Text>
        </Pressable>

        {session && session.user ? (
          <>
            <Pressable
              style={{backgroundColor: '#DC143C', ...styles.button}}
              onPress={() => supabase.auth.signOut()}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FFF" }}>
                Sign Out
              </Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={{backgroundColor: '#3AD6A7', ...styles.button}}
            onPress={() => navigation.navigate("HomePage",{ screen: 'Account' })}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FFF" }}>
              Sign Up
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.faqView}>
        <Pressable style={styles.faqButton}>
          <Text
            style={{ fontWeight: "bold", fontSize: 15, color: "#FFF" }}
            onPress={() => navigation.navigate("Faq")}
          >
            How does this work?
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgWrap: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 336,
    height: 336,
    overflow: "hidden",
  },
  mainContainer: {
    height: '100vh',
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFF",
    justifyContent: "space-between", // Adjust mainContainer to justify content between its children
  },
  introButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 26,
  },
  button: {
    width: 139,
    height: 57,
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
  },
  faqView: {
    width: "100%",
    height: 60,
    backgroundColor: "#3AD6A7",
  },
  faqButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%", // Set height to fill the container
  },
});
