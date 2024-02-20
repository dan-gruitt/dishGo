import { View, Text } from "react-native";
import React from "react";
import { TextInput, Button } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { postRestaurant } from "../utils/api";

export default function AddRestaurantPage() {
  const [restaurantName, setRestaurantName] = React.useState("");
  const [restaurantDescription, setRestaurantDescription] = React.useState("");
  const [cuisine, setCuisine] = React.useState("");
  const [placeID, setPlaceID] = React.useState(null);

  const cuisines = ["Mexican", "Italian", "Asian", "Pub", "Seafood"];

  return (
    <><View>
      <Text>Add Restaurant</Text>
      <TextInput
        label="Restaurant Name"
        mode="outlined"
        value={restaurantName}
        onChangeText={(restaurantName) => setRestaurantName(restaurantName)} />
      <TextInput
        label="Restaurant Description"
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

      <Button
        mode="contained"
        onPress={() => {
          const input = { cuisine, restaurantName, restaurantDescription, placeID };
          postRestaurant(input)
            .then(() => {
              console.log('restaurant submitted');
            })
            .catch((err) => {
              console.log(err);
            });
        } }
      >
        Submit
      </Button>
    </View></>
  );
}
