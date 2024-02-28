import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { getDishes } from "../utils/getDishes";
import ResultDishCard from "../component/ResultDishCard";
import { filterSearch } from "../utils/filterSearch";
import { getRestaurantsById } from "../utils/getRestaurantsById";
import { getPlacesById } from "../utils/getPlacesById";
import GoogleMapView from "../component/GoogleMapView";

export default function ResultsPage({ navigation, route }) {
  const [dishesToShow, setDishesToShow] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsPlaces, setRestaurantsPlaces] = useState([]);
  const [mapView, setMapView] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mapResults, setMapResults] = useState([]);



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
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const storeMapResults = (result) => {
    const resultObj = {
      dish: result[0],
      restaurant: result[1],
      place: result[2],
    };

    const exists = mapResults && mapResults.some((r) => (
      r.dish.id === resultObj.dish.id &&
      r.restaurant.id === resultObj.restaurant.id &&
      r.place.id === resultObj.place.id
    ));
    if (!exists) {
      setMapResults((prevResults) => [...prevResults, resultObj]);
    }
  };

  return (
    <View>
      <Text>
      Result's for: {route.params.dish}
      </Text>
      <ScrollView>
        <Button mode="contained" onPress={() => setMapView(!mapView)}>
          {mapView ? "Show List View" : "Show Map View"}
        </Button>
        {mapView ? (
          <GoogleMapView mapResults={mapResults} />
        ) : dataLoaded ? (
          dishesToShow.map((dish) => (
            <ResultDishCard
              setMapResults={setMapResults}
              mapResults={mapResults}
              storeMapResults={storeMapResults}
              key={dish.id}
              dish={dish}
              restaurants={restaurants}
              restaurantsPlaces={restaurantsPlaces}
            />
          ))
        ) : (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
