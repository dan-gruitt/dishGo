import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Account from "../component/Account";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { ScrollView } from "react-native-virtualized-view";
import Auth from "../component/Auth";

export default function UserSettings() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session)
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ScrollView>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <>
               <><View style = {{backgroundColor: "#000000"}}>
          <Text style={styles.headerText}>Sign Up Today!</Text>
        </View><Auth /></>
          <Auth />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerText:{
    marginTop: 20,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    paddingVertical: 28,
  },
})