import { View, Text} from "react-native";
import React from "react";
import { TextInput, Button} from "react-native-paper";
import ChipList from "./ChipList";

import { postDishByRestaurantId } from "../utils/api";

export default function DishUploadForm(props) {
  const { restaurant, menu, setMenu } = props;

  const [dishName, setDishName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");

  const [dietary, setDietary] = React.useState({
    vegan: false,
    vegetarian: false,
    pescatarian: false,
  })

  function handleSubmit(){
    console.log(restaurant)
    postDishByRestaurantId(dishName, description, price, dietary, restaurant.id)
    .then((dishData)=>{
      const newDish = dishData
      setMenu(() => {
        const updatedMenu = [newDish, ...menu]
        console.log(updatedMenu)
        return updatedMenu
      })
      setDishName("")
      setDescription("")
      setPrice("")
      setDietary({
        vegan: false,
        vegetarian: false,
        pescatarian: false,
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <View>
      <TextInput
        label="Name of dish"
        value={dishName}
        onChangeText={(dishName) => setDishName(dishName)}
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
        maxLength={5}
        keyboardType="numeric"
      />
      <ChipList setDietary={setDietary} dietary={dietary}></ChipList>
      <Button mode="contained" onPress={() => handleSubmit()}>
    Add dish
  </Button>
    </View>
  );
}
