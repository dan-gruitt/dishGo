import { View} from "react-native";
import React from "react";
import { HelperText, TextInput, Button, Text, List} from "react-native-paper";

import ChipList from "./ChipList";
import { dishSchema } from "../validation/DishValidation";

import { postDishByRestaurantId } from "../utils/api";

export default function DishUploadForm(props) {

  const { restaurant, menu, setMenu } = props;

  const [dishName, setDishName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState(null)

  const [dietary, setDietary] = React.useState({
    vegan: false,
    vegetarian: false,
    pescatarian: false,
  })

  async function handleSubmit(){

    const formInput = {
      dishName: dishName,
      description: description,
      price: price,
    };

    try{
      await dishSchema.validate(formInput, {abortEarly: false})
      setErrors(null)
      submitDish();
    } catch (error) {
      console.log(error.inner)
      const newError = {}
      error.inner.forEach((err)=>{
        newError[err.path] = err.message
      })
      setErrors(newError)
    }

  }

  function submitDish(){
    setIsSubmitting(true)
    postDishByRestaurantId(dishName, description, price, dietary, restaurant.id)
    .then((dishData)=>{
      const newDish = dishData
      setMenu(() => {
        const updatedMenu = [newDish, ...menu]
        return updatedMenu
      })
      setIsSubmitting(false)
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
      <List.Accordion
        title={"Add New Dish"}
        >
      <TextInput
        label="Name of dish"
        value={dishName}
        onChangeText={(dishName) => setDishName(dishName)}
        mode="outlined"
      />
      {!errors ? null : Object.hasOwn(errors, 'dishName') ? <HelperText type="error">
        {errors.dishName}
      </HelperText> : null}
      <TextInput
        label="Description"
        value={description}
        onChangeText={(description) => setDescription(description)}
        mode="outlined"
        numberOfLines={3}
        multiline={true}
        maxLength={250}
      />
      {!errors ? null : Object.hasOwn(errors, 'description') ? <HelperText type="error">
        {errors.description}
      </HelperText> : null}
    <TextInput
        label="£ Price"
        placeholder="0.00"
        value={price}
        onChangeText={(price) => setPrice(price)}
        mode="outlined"
        keyboardType="numeric"
        left={<TextInput.Affix text="£" />}
      />
      {!errors ? null : Object.hasOwn(errors, 'price') ? <HelperText type="error">
        {errors.price}
      </HelperText> : null}
      <ChipList setDietary={setDietary} dietary={dietary}></ChipList>
      <Button mode="contained" 
      onPress={() => handleSubmit()}
      disabled = {isSubmitting}
      >
    Add dish
  </Button>
<HelperText type="error" visible={errors}>
        Unable to submit form - invalid input(s)
      </HelperText>
      </List.Accordion>
    </View>
  );
}
