import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from 'react-native-paper';
import { useState, useEffect, useContext } from "react";
import SearchBar from "../component/SearchBar";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getPlacesById } from "../utils/getPlacesById";
import { LocationContext } from '../context/LocationContext';

export default function SearchPage({ navigation }) {
  const { location, setLocation } = useContext(LocationContext);
  const [userSearch, setUserSearch] = useState("");
  const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const [placeId, setPlaceId] = useState("");
  // const [userLocation, setUserLocation] = useState("");

  useEffect(() => {
    if (placeId) { // Check if placeId is truthy (i.e., not empty or undefined)
      getPlacesById(placeId)
        .then((response) => {
          const { data } = response;
          const location = data.result.geometry.location;
          const locationObj = {coords: {latitude: location.lat, longitude: location.lng}};
          setLocation(locationObj);
        })
        .catch((error) => {
          console.error("Error fetching place details:", error);
        });
    }
  }, [placeId]);

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/white-disgo.png")}
        />
      </View>
      <View style={styles.locationSearchWrap}>
        <Text style={styles.locationHeaderText}>Enter Your Search Area</Text>
      </View>
      <View>
        <GooglePlacesAutocomplete
          placeholder={(placeholder="SearchArea")}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en", // language of the results
          }}
          onPress={(data, details = null) => {
            setPlaceId(data.place_id);
          }}
          onFail={(error) => console.error(error)}
        />
      </View>
      <View style={styles.headerWrap}>
        <Text style={styles.headerText}>What are you in the mood for?</Text>
      </View>
      <SearchBar
        setUserSearch={setUserSearch}
        userSearch={userSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: 'center',
    alignContent: "center",
    backgroundColor: "#3AD6A7",
  },
  image: {
    width: 70,
    height: 78,
    overflow: "hidden",
    marginTop: 32,
    marginBottom: 32,
  },
  headerWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationSearchWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationHeaderText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    width: 260,
  },
  searchButton: {
    width: 139,
    height: 57,
    backgroundColor: "#4C5B61",
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  searchButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});
