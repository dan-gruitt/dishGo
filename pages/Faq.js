import { View, Text, Button } from "react-native";
import React from "react";

export default function Faq() {
  return (
    <>
      <View>
        <Text>So How does it all work?</Text>
      </View>

      <View>
        <Text>Step 1: Crave It:</Text>
        <Text>
          Unleash your cravings with a tap! Our smart search bar serves up your
          favorite dishes instantly.
        </Text>
      </View>

      <View>
        <Text>Step 2: Local Vibes:</Text>
        <Text>
          Filter the feast! Narrow down options based on your location, ensuring
          your food adventure is just around the corner.
        </Text>
      </View>

      <View>
        <Text>Step 3: Map Munch:</Text>
        <Text>
          Check the map, plan your stroll. Discover how close you are to flavor
          town and get ready to embark on a delicious journey.
        </Text>
      </View>

      <View>
        <Text>Step 4: Nom Nom Now:</Text>
        <Text>
          Tuck into bliss! Your favorite food is within reach – savor the moment
          and indulge in a culinary experience like no other.
        </Text>
      </View>

      <Button title="Sign Up" onPress={() => console.log("button!")} />

      <Button title="Search" onPress={() => console.log("button!")} />
    </>
  );
}
