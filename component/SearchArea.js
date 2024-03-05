import React, { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { List } from "react-native-paper";
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
  const [placeholder, setPlaceholder] = useState("Enter Location");


  useEffect(() => {
    handleUserLocation()
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
  <View style={styles.searchBar}>
  <Pressable onPress={handleUserLocation}  style={{
          fontWeight: "bold",
          fontSize: 12,
          color: "#3AD6A7",
          backgroundColor: "white",
          height: 52,
          borderRadius: 50,
          textAlign: "center",
          width: 52,
          paddingTop: 13,
        }}>
        <List.Icon color="#3AD6A7" icon="crosshairs" />
    </Pressable>
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      placeholderTextColor="#A9A9AC" // Set placeholder text color
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: "en",
      }}
      onPress={(data, details = null) => {
        setPlaceId(data.place_id);
      }}
      onFail={(error) => console.error(error)}
      styles={{
        container: {
          borderRadius: 45,
        },
        textInputContainer: {
          marginLeft: -5,
          height: 52,
        },
        textInput: {
          borderRadius: 50,
          height: 52,
          fontSize: 16,
          backgroundColor: "rgba(0,0,0,0)",
        },
      }}
    />
  </View>
</View>
{/* <View>
<Picker
        style={{color: "#4C5B61",  fontWeight: "bolder", marginBottom: -20}}
        selectedValue={radius}
        onValueChange={(itemValue, itemIndex) => setRadius(itemValue)}
      >
        <Picker.Item label="+0.5 miles" value={0.5} />
        <Picker.Item label="+1 mile" value={1} />
        <Picker.Item label="+3 miles" value={3} />
        <Picker.Item label="+5 miles" value={5} />
        <Picker.Item label="+10 miles" value={10} />
      </Picker>
</View> */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 10,
    marginTop: 20,
  },
  locationSearchWrap: {
    width: 310,
  },
  searchBarContainer: {
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
  },
});

export default SearchArea;
