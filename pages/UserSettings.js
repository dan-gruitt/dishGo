import { View, Text } from "react-native";
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
          <View>
            <Text>No account? Sign up now</Text>
          </View>
          <Auth />
        </>
      )}
    </ScrollView>
  );
}
