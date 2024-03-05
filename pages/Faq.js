import { ScrollView, View, Text, Button } from "react-native";
import React from "react";
import { Pressable, StyleSheet, Line } from "react-native";

export default function Faq({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.containerOuter}>
      <View style = {styles.titleContainer}>
        <Text style={styles.title}>How does this work?</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Step 1: Crave It:</Text>
        <Text style={styles.text}>
          Start typing in our smart search bar and watch suggested dishes appear.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Step 2: Filter the Feast:</Text>
        <Text style={styles.text}>
          Narrow down options based on your location, ensuring
          your food adventure is just around the corner.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Step 3: Map Munch:</Text>
        <Text style={styles.text}>
          Check the map, plan your stroll and get ready to embark on a delicious journey.
        </Text>
      </View>
      <>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("HomePage")}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FFF" }}>
            Lets Go!
          </Text>
        </Pressable>
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerOuter: {
    alignItems: "center",
    padding: 15,
    gap: 20,
  },
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#4C5B61",
    marginTop: 20,
    marginBottom: 10,
  },
  titleContainer:{
    borderBottomColor: "#3AD6A7",
    borderBottomWidth: 4,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#4C5B61",
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#3AD6A7",
    paddingBottom: 10,
  },
  button: {
    width: 109,
    height: 45,
    backgroundColor: "#4C5B61",
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
  },

});
