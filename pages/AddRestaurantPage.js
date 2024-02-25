import {ScrollView, View} from 'react-native'
import React, { useEffect } from "react";
import { Text, TextInput, Button, HelperText } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { postRestaurant } from "../utils/api";
import { UserContext } from "../context/UserContext";

import PlaceIdSearcher from "../component/PlaceIdSearcher";
import { restaurantSchema } from "../validation/RestaurantValidation";
import getRestaurantByUserId from '../utils/getRestaurantsById';

import setUserContext from '../utils/setUserContext';

export default function AddRestaurantPage({navigation}) {
  
  setUserContext();

  const [restaurantName, setRestaurantName] = React.useState("");
  const [restaurantDescription, setRestaurantDescription] = React.useState("");
  const [cuisine, setCuisine] = React.useState("");
  const [placeId, setPlaceId] = React.useState(null);
  const { user: user } = React.useContext(UserContext);
  
  const [restaurant, setRestaurant] = React.useState(null)

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errors, setErrors] = React.useState(null)

  const cuisines = ["Mexican", "Italian", "Asian", "Pub", "Seafood"];

  useEffect(()=>{
    if (user){
      getRestaurantByUserId(user.id).then((restaurantData)=>{
        setRestaurant(restaurantData)
      })
    }
  }, [])

  async function handleSubmit(){
    setIsSubmitting(true)

    const formInput = {
      restaurantName: restaurantName,
      restaurantDescription: restaurantDescription,
      cuisine: cuisine,
      placeId: placeId
    }

      try{
        await restaurantSchema.validate(formInput, {abortEarly: false})
        setErrors(null)
        submitRestaurant();
      } catch (error) {
        console.log(error.inner)
        const newError = {}
        error.inner.forEach((err)=>{
          newError[err.path] = err.message
        })
        setErrors(newError)
        setIsSubmitting(false)
      }
  }

  function submitRestaurant(){
    const input = {restaurantName, restaurantDescription, cuisine, placeId, user};
    postRestaurant(input)
      .then((restaurantData) => {
        setIsSubmitting(false)
        console.log(restaurantData, "added successfully")
        navigation.navigate("BusinessMenuPage", {restaurant: restaurantData})
      })
      .catch((err) => {
        setIsSubmitting(false)
        console.log(err);
      });
  }

  return (
    // <ScrollView>
    <View>
      <TextInput
        label="Restaurant Name"
        mode="outlined"
        value={restaurantName}
        onChangeText={(restaurantName) => setRestaurantName(restaurantName)} />
              {!errors ? null : Object.hasOwn(errors, 'restaurantName') ? <HelperText type="error">
        {errors.restaurantName}
      </HelperText> : null}
      <TextInput
        label="Restaurant Description"
        mode="outlined"
        value={restaurantDescription}
        onChangeText={(restaurantDescription) => setRestaurantDescription(restaurantDescription)} />
              {!errors ? null : Object.hasOwn(errors, 'restaurantDescription') ? <HelperText type="error">
        {errors.restaurantDescription}
      </HelperText> : null}
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
              {!errors ? null : Object.hasOwn(errors, 'cuisine') ? <HelperText type="error">
        {errors.cuisine}
      </HelperText> : null}
        <PlaceIdSearcher setPlaceId={setPlaceId}/>
        {!errors ? null : Object.hasOwn(errors, 'placeId') ? <HelperText type="error">
        {errors.placeId}
      </HelperText> : null}
      <Button
        mode="contained"
        onPress={() => {handleSubmit()} }
        disabled = {isSubmitting}
      >
        Submit
      </Button>
      <HelperText type="error" visible={errors}>
        Unable to submit form - invalid input(s)
      </HelperText>
    </View> 
    
    // </ScrollView>
  );
}
