import { ScrollView, View } from "react-native";
import React from "react";
import { Text, TextInput, Button, HelperText, Card } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { postRestaurant, patchRestaurantById } from "../utils/api";
import { getRestaurantsByUserId } from "../utils/getRestaurantsByUserId";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";
import PlaceIdSearcher from "../component/PlaceIdSearcher";
import { restaurantSchema } from "../validation/RestaurantValidation";

export default function AddRestaurantPage({ navigation }) {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [restaurantName, setRestaurantName] = React.useState("");
  const [restaurantDescription, setRestaurantDescription] = React.useState("");
  const [cuisine, setCuisine] = React.useState("");
  const [placeId, setPlaceId] = React.useState(null);

  const [searcherPlaceHolder, setSearcherPlaceHolder] = React.useState("");

  const [restaurant, setRestaurant] = React.useState(null);
  const [restaurantToEdit, setRestaurantToEdit] = React.useState(null);

  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState(null);

  const cuisines = ["Mexican", "Italian", "Asian", "Pub", "Seafood"];

  React.useEffect(() => {
    if (session) {
      console.log("2-TESTING SESSION", session.user.id);
      getRestaurantsByUserId(session.user.id).then((restaurantData) => {
        console.log(restaurantData.data[0], "<<<< restaurant data");
        setRestaurant(restaurantData.data[0]);
      });
    }
  }, [session]);

  async function handleSubmit() {
    setIsSubmitting(true);

    const formInput = {
      restaurantName: restaurantName,
      restaurantDescription: restaurantDescription,
      cuisine: cuisine,
      placeId: placeId,
    };

    try {
      await restaurantSchema.validate(formInput, { abortEarly: false });
      setErrors(null);
      if (isEditMode) {
        updateRestaurantById();
      } else if (!isEditMode) submitRestaurant();
    } catch (error) {
      console.log(error.inner);
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
      setIsSubmitting(false);
    }
  }

  function submitRestaurant() {
    const input = {
      restaurantName,
      restaurantDescription,
      cuisine,
      placeId,
      user,
    };
    postRestaurant(input)
      .then((restaurantData) => {
        setRestaurant(restaurantData);
        setIsSubmitting(false);
        console.log(restaurantData, "added successfully");
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
      });
  }

  function updateRestaurantById() {
    const restaurantId = restaurantToEdit.id;
    const input = {
      restaurantName,
      restaurantDescription,
      cuisine,
      placeId,
      user,
    };
    patchRestaurantById(input, restaurantId)
      .then((restaurantData) => {
        setIsEditMode(false);
        setRestaurant(restaurantData);
        setIsSubmitting(false);
        console.log(restaurantData, "updated successfully");
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
      });
  }

  return restaurant ? (
    <View>
      <Card>
        <Card.Title subtitle={restaurant.cuisine} />
        <Card.Content>
          <Text variant="titleLarge">{restaurant.name}</Text>
          <Text variant="bodyMedium">{restaurant.description}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={() => {
              navigation.navigate("BusinessMenuPage", {
                restaurant: restaurant,
              });
            }}
          >
            Manage Menu
          </Button>
          <Button
            onPress={() => {
              setIsEditMode(true);
              setRestaurantToEdit(restaurant);
              setRestaurant(null);
            }}
          >
            Edit
          </Button>
        </Card.Actions>
      </Card>
    </View>
  ) : (
    // <ScrollView>
    <View>
      <TextInput
        label="Restaurant Name"
        mode="outlined"
        value={restaurantName}
        onChangeText={(restaurantName) => setRestaurantName(restaurantName)}
      />
      {!errors ? null : Object.hasOwn(errors, "restaurantName") ? (
        <HelperText type="error">{errors.restaurantName}</HelperText>
      ) : null}
      <TextInput
        label="Restaurant Description"
        mode="outlined"
        value={restaurantDescription}
        onChangeText={(restaurantDescription) =>
          setRestaurantDescription(restaurantDescription)
        }
      />
      {!errors ? null : Object.hasOwn(errors, "restaurantDescription") ? (
        <HelperText type="error">{errors.restaurantDescription}</HelperText>
      ) : null}
      <SelectDropdown
        data={cuisines}
        onSelect={(selectedItem, index) => {
          setCuisine(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        defaultButtonText="Select a cuisine"
        defaultValue={cuisine ? cuisine : null}
      />
      {!errors ? null : Object.hasOwn(errors, "cuisine") ? (
        <HelperText type="error">{errors.cuisine}</HelperText>
      ) : null}
      <PlaceIdSearcher
        setPlaceId={setPlaceId}
        searcherPlaceHolder={searcherPlaceHolder}
        setSearcherPlaceHolder={setSearcherPlaceHolder}
      />
      {!errors ? null : Object.hasOwn(errors, "placeId") ? (
        <HelperText type="error">{errors.placeId}</HelperText>
      ) : null}
      <Button
        mode="contained"
        onPress={() => {
          handleSubmit();
        }}
        disabled={isSubmitting}
      >
        {isEditMode ? "Update" : "Submit"}
      </Button>
      {isEditMode ? (
        <Button
          mode="outlined"
          onPress={() => {
            setIsEditMode(false);
            setRestaurant(restaurantToEdit);
          }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      ) : null}
      <HelperText type="error" visible={errors}>
        Unable to submit form - invalid input(s)
      </HelperText>
    </View>

    // </ScrollView>
  );
}
