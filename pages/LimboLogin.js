import { View, Text, ScrollView, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";


export default function LimboLogin() {
  const navigation = useNavigation();

  return (
      <ScrollView style={styles.container}>
        <View style={styles.headerTextView}>
          <Text style={styles.headerText}><Text>You must be logged in to view your restaurants</Text></Text>
        </View>
        <View style={styles.signInButtonView}>
          <Pressable style={styles.signInButton}>
            <Text
              style={styles.signInButtonText}
              onPress={() => navigation.navigate("Profile")}
            > Sign in </Text>
          </Pressable>
        </View>
        <View style={styles.imgWrap}>
          <Image
            style={styles.image}
            source={require("../assets/limbo-login.png")}
          />
      </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: "#4C5B61",
    paddingTop: 60
  },
  headerTextView:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText:{
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    width: 226,
    marginBottom: 20,
  },
  signInButtonView:{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60
  },
  signInButton:{
    width: 93,
    height: 38,
    backgroundColor: "#3AD6A7",
    borderRadius: 29,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonText:{
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.6,
  },
  imgWrap: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 280,
    height: 279,
    overflow: "hidden",
    marginBottom: 100,
  }
});