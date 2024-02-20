import { View, Button } from "react-native";
import {useEffect} from 'react'
import { getRestaurantsById } from "../utils/getRestaurantsById";
import React from "react";


export default function LandingPage({ navigation }) {

  const testArray = [1, 2, 3]

  useEffect(() => {
    getRestaurantsById(testArray).then((response) => {
    console.log(response)
    })
  }, [])

  return (
    <>
      <View>
        <Button
          title="Add Restaurants Page"
          onPress={() => navigation.navigate("AddRestaurantPage")}
        />
        <Button
          title="Results Page"
          onPress={() => navigation.navigate("ResultsPage")}
        />

        <Button
          title="Search Page"
          onPress={() => navigation.navigate("SearchPage")}
        />

      </View>
    </>
  );
}
