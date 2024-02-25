import { View, Button, Text, Image, StyleSheet } from "react-native";
import GoogleMapView from "../component/GoogleMapView";
import React from "react";

export default function LandingPage({ navigation }) {

  return (
    <>
      <View>
        <Button
          title="DEV Add Restaurants Page"
          onPress={() => navigation.navigate("AddRestaurantPage")}
        />

        <Button
          title="Partners"
          onPress={() => navigation.navigate("BusinessSignUp")}
        />
        <View style={styles.imgWrap}>
          <Image style={styles.image} source={require("../assets/food.jpeg")} />
        </View>

        <Button
          title="Lets Go"
          onPress={() => navigation.navigate("SearchPage")}
        />

        <Button
          title="Sign Up!"
          onPress={() => navigation.navigate("BusinessSignUp")}
        />

        <Button
          title="DEV Test Page"
          onPress={() => navigation.navigate("TestPage")}
        />

        <Text
          onPress={() => {
            console.log("FAQ PAGE");
          }}
        >
          How does it work?
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imgWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    overflow: "hidden",
    marginTop: 50,
    marginBottom: 50,
  },
});
