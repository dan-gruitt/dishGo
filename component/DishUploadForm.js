import { View, Text } from "react-native";
import React from "react";
import { TextInput, Chip } from "react-native-paper";
import ChipList from "./ChipList";

export default function DishUploadForm(props) {
  const { restaurant } = props;

  const [dish, setDish] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(null);

  const [dietary, setDietary] = React.useState({
    vegan: false,
    vegetarian: false,
    pescatarian: false,
  })


  return (
    <View>
      <TextInput
        label="Name of dish"
        value={dish}
        onChangeText={(dish) => setDish(dish)}
        mode="outlined"
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={(description) => setDescription(description)}
        mode="outlined"
        numberOfLines={3}
        multiline={true}
        maxLength={250}
      />
      <TextInput
        label="Price"
        value={price}
        onChangeText={(price) => setPrice(price)}
        mode="outlined"
        keyboardType="numeric"
      />
      <ChipList setDietary={setDietary} dietary={dietary}></ChipList>

    </View>
  );
}
