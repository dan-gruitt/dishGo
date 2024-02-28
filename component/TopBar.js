import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Text, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { UserContext } from "../context/UserContext";
import AvatarImage from "./AvatarImage";

export default function TopBar() {
  //this is the current page context
  const { CurrentPage } = useContext(CurrentPageContext);
  const { User } = useContext(UserContext);

  console.log(User, "<<<<<<");

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      return session;
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.appBar} mode="medium">
      <View style={styles.container}>
        <View>
          <Pressable onPress={() => navigation.navigate("LandingPage")}>
            <Image
              style={styles.image}
              source={require("../assets/dish-go-logo.png")}
            />
          </Pressable>
        </View>

        <View>
          {session && session.user ? (
            <>
               <AvatarImage User={User} />
            </>
          ) : (
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("HomePageBusiness")}
            >
              <Text style={{ fontWeight: "bold", fontSize: 14, color: "#FFF" }}>
                Partners
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  appBar: {
    elevation: 5,
    backgroundColor: "#FFF",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 26,
  },
  image: {
    width: 47,
    height: 52,
  },
  button: {
    width: 93,
    height: 38,
    backgroundColor: "#3AD6A7",
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
  },
});
