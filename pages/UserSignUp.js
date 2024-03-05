import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Account from "../component/Account";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ScrollView } from "react-native-virtualized-view";
import Auth from "../component/Auth";

export default function UserSignUp() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ScrollView style = {styles.container}>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <>
               <><View style = {{backgroundColor: "#4C5B61"}}>
          <Text style={styles.headerText}>Sign Up Today!</Text>
        </View></>
          <Auth />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10,
    backgroundColor: '#4C5B61',
  },
  headerText:{
    padding: 28,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
})