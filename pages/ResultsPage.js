import {
  ScrollView,
  FlatList,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Item,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDishes } from "../utils/getDishes";
import ResultDishCard from "../component/ResultDishCard";
import { filterSearch } from "../utils/filterSearch";
import { getRestaurantsById } from "../utils/getRestaurantsById";
import { getPlacesById } from "../utils/getPlacesById";

export default function ResultsPage({ navigation, route }) {
  const [dishesToShow, setDishesToShow] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsPlaces, setRestaurantsPlaces] = useState([]);

  useEffect(() => {
    getDishes()
      .then((data) => {
        setDishesToShow(filterSearch(data, route.params.dish));
        return filterSearch(data, route.params.dish);
      })
      .then((data) => {
        const restaurantsIds = data.map((restaurant) => {
          return restaurant.restaurant_id;
        });

        return getRestaurantsById(restaurantsIds).then((response) => {
          setRestaurants(response.data);
          return response.data;
        });
      })
      .then((data) => {
        const placesPromises = data.map((restaurant) => {
          return getPlacesById(restaurant.place_id).then((response) => {
            return response.data.result;
          });
        });
        return Promise.all(placesPromises);
      })
      .then((placesData) => {
        setRestaurantsPlaces(placesData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View>
      <Text>
        {" "}
        {dishesToShow.length} Results for: {route.params.dish}
      </Text>
      <ScrollView>
        {dishesToShow.map((dish) => {
          return (
            <ResultDishCard
              key={dish.id}
              dish={dish}
              restaurants={restaurants}
              restaurantsPlaces={restaurantsPlaces}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
