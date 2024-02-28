import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useState, useEffect, useContext } from "react";
import SearchBar from "../component/SearchBar";
import SearchArea from "../component/SearchArea";

export default function SearchPage({ navigation }) {
  const [userSearch, setUserSearch] = useState("");    

  return (
    <View style={styles.container}>
      {/* <View>
        <Image
          style={styles.image}
          source={require("../assets/white-disgo.png")}
        />
      </View>
      <View style={styles.headerWrap}>
        <Text style={styles.headerText}>What are you in the mood for?</Text>
      </View> */}
      <View>
      <SearchArea />
      </View>
      <SearchBar setUserSearch={setUserSearch} userSearch={userSearch} />
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: 'center',
    alignContent: "center",
    backgroundColor: "#3AD6A7",
  },
  image: {
    width: 70,
    height: 78,
    overflow: "hidden",
    marginTop: 32,
    marginBottom: 32,
  },
  headerWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    width: 260,
  },
  searchButton: {
    width: 139,
    height: 57,
    backgroundColor: "#4C5B61",
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  searchButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
