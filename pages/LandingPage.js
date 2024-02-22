import { View, Button } from "react-native";
import React from "react";
import Auth from "../component/Auth";
import TestContext from "../component/TestContext";

export default function LandingPage({ navigation }) {
  return (
    <>
      <View>
        <Button
          title="Add Restaurants Page"
          onPress={() => navigation.navigate("AddRestaurantPage")}
        />

        <Button
          title="Search Page"
          onPress={() => navigation.navigate("SearchPage")}
        />

        <Button
          title="Business SignUp"
          onPress={() => navigation.navigate("BusinessSignUp")}
        />

        <Button
          title="Test Page"
          onPress={() => navigation.navigate("TestPage")}
        />
      </View>

      <View>
        <TestContext />
      </View>
    </>
  );
}
