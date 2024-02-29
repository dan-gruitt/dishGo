import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
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
  const [results, setResults] = useState([null]);

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

  const storeMapResults = (results) => {
    const resultObj = {
      dish: results[0],
      restaurant: results[1],
      place: results[2],
    };

    const exists =
      mapResults &&
      mapResults.some(
        (r) =>
          r.dish.id === resultObj.dish.id &&
          r.restaurant.id === resultObj.restaurant.id &&
          r.place.id === resultObj.place.id
      );
    if (!exists) {
      setMapResults((prevResults) => [...prevResults, resultObj]);
      setResults(results);
    }
  };

  return (
    <View style={styles.resultsContainer}>
     <View style={styles.resultHeader}>
     <Text style={styles.resultHeader}>
  Results for: <Text style={{ color: "#3AD6A7" }}>{route.params.dish}</Text>
</Text>
</View>
      <ScrollView>
        <Button
          style={styles.mapViewButton}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={() => setMapView(!mapView)}
        >
          {mapView ? "Show List View" : "Show Map View"}
        </Button>
        {mapView ? (
          <GoogleMapView mapResults={mapResults} results={results} />
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

const styles = StyleSheet.create({
  resultsContainer: {
    marginBottom: 70,
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4C5B61",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 5,
  },
  mapViewButton: {
    borderRadius: 45,
    backgroundColor: "#4C5B61",
    color: "#3AD6A7",
    width: '50%',
    marginLeft: '25%',
    marginBottom: 15,
    marginTop: 10,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "bold",
    width: "65%",
    color: "white",
  },
});
// 