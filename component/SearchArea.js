import React, { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getPlacesById } from "../utils/getPlacesById";
import { LocationContext } from "../context/LocationContext";
import { ScrollView } from "react-native-virtualized-view";

const SearchArea = () => {
  const { location, setLocation, radius, setRadius } =
    useContext(LocationContext);
  const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const [placeId, setPlaceId] = useState("");
  const [distance, setDistance] = useState(1);
  const [placeholder, setPlaceholder] = useState("Search Location...");

  useEffect(() => {
    if (placeId) {
      getPlacesById(placeId)
        .then((response) => {
          const { data } = response;
          const location = data.result.geometry.location;
          const address = data.result.formatted_address;
          const locationObj = {
            coords: { latitude: location.lat, longitude: location.lng },
          };
          setPlaceholder(address);
          setLocation(locationObj);
        })
        .catch((error) => {
          console.error("Error fetching place details:", error);
        });
    }
  }, [placeId]);

  const handleUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        setPlaceholder(address);
      } else {
        console.error("No address found for the current location");
      }
      setLocation(currentLocation);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.locationSearchWrap}>
        <Text style={styles.locationHeaderText}>Enter Your Search Area</Text>
        <View style={styles.distancePickerContainer}>
          <Text style={styles.distancePickerLabel}>Distance:</Text>
          <Picker
            selectedValue={radius}
            style={styles.distancePicker}
            onValueChange={(itemValue, itemIndex) => setRadius(itemValue)}
          >
            <Picker.Item label="+0.5 miles" value={0.5} />
            <Picker.Item label="+1 mile" value={1} />
            <Picker.Item label="+3 miles" value={3} />
            <Picker.Item label="+5 miles" value={5} />
            <Picker.Item label="+10 miles" value={10} />
          </Picker>
        </View>
      </View>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
        onPress={(data, details = null) => {
          setPlaceId(data.place_id);
        }}
        onFail={(error) => console.error(error)}
      />
      <View>
        <Pressable onPress={handleUserLocation}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FFF" }}>
            Use My Current Location
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3AD6A7",
  },
  locationSearchWrap: {
    marginBottom: 10,
  },
  locationHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFF",
  },
  distancePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  distancePickerLabel: {
    marginRight: 10,
    color: "#FFF",
  },
  distancePicker: {
    width: 120,
    color: "#FFF",
  },
});

export default SearchArea;
