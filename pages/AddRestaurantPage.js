import { ScrollView, Text } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { postRestaurant } from "../utils/api";

import PlaceIdSearcher from "../component/PlaceIdSearcher";

export default function AddRestaurantPage({navigation}) {
  const [restaurantName, setRestaurantName] = React.useState("");
  const [restaurantDescription, setRestaurantDescription] = React.useState("");
  const [cuisine, setCuisine] = React.useState("");
  const [placeID, setPlaceID] = React.useState(null);

  const cuisines = ["Mexican", "Italian", "Asian", "Pub", "Seafood"];

  return (
    <ScrollView>
      <Text>Add Restaurant</Text>
      <TextInput
        label="Restaurant Name"
        mode="outlined"
        value={restaurantName}
        onChangeText={(restaurantName) => setRestaurantName(restaurantName)} />
      <TextInput
        label="Restaurant Description"
        mode="outlined"
        value={restaurantDescription}
        onChangeText={(restaurantDescription) => setRestaurantDescription(restaurantDescription)} />
      <SelectDropdown
        data={cuisines}
        onSelect={(selectedItem, index) => {
          setCuisine(selectedItem);
        } }
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        } }
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        } }
        defaultButtonText="Select a cuisine" />
        <PlaceIdSearcher setPlaceID={setPlaceID}/>

      <Button
        mode="contained"
        onPress={() => {
          const input = { cuisine, restaurantName, restaurantDescription, placeID };
          postRestaurant(input)
            .then((restaurantData) => {
              console.log(restaurantData, "added successfully")
              navigation.navigate("BusinessMenuPage", {restaurant: restaurantData})
            })
            .catch((err) => {
              console.log(err);
            });
        } }
      >
        Submit
      </Button>
    </ScrollView>
  );
}
