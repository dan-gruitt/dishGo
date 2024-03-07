import { useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert, Pressable, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import Avatar from "./Avatar";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function Account({ session }: { session: Session }) {

  const navigation = useNavigation()
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  // const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { User, setUser } = useContext(UserContext);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
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
        setUsername(data.username);
        // setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setUser(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    // website,
    avatar_url,
  }: {
    username: string;
    // website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        // website,
        avatar_url,
        updated_at: new Date(),
      };

      const { data, error } = await supabase
        .from("profiles")
        .upsert(updates)
        .select();

      setUser(data[0]);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
        <Avatar
          size={130}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, avatar_url: url });
          }}
        />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input style = {styles.input} labelStyle={styles.labels} 
        leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "#FFF",
              size: 16,
            }} label="Email" value={session?.user?.email} disabled />
      </View>

<View style={styles.buttonContainer}>

      <View>
        <Pressable
          style={styles.button}
          onPress={() =>
            updateProfile({ username, avatar_url: avatarUrl })
          }
          disabled={loading}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#FFF" }}>
            {loading? "Loading..." : "Update"}
          </Text>
        </Pressable>
      </View>


      <View>
        <Pressable
          style={styles.button2}
          onPress={() => {
            supabase.auth.signOut();
            setUser(null);
            navigation.getParent()?.goBack()
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#FFF" }}>
            Sign Out
          </Text>
        </Pressable>
      </View>

</View>

      {/* <View style={styles.verticallySpaced}>
        <Button
          title="Sign Out"
          onPress={() => {
            supabase.auth.signOut();
            setUser(null);
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 12,
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    display: "flex"

  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    width: 110,
    height: 45,
    backgroundColor: "#3AD6A7",
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },
  button2: {
    width: 110,
    height: 45,
    backgroundColor: "#DC143C",
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30
  },
  buttonText: {
    color: "#FFF",
  },
  input: {
    textDecorationLine: "none",
    paddingLeft: 24,
    fontSize: 14,
    color: '#fff'
  },
  labels: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
});
