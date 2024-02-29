import React, { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LogBox } from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getPlacesById } from "../utils/getPlacesById";
import { LocationContext } from "../context/LocationContext";
import { ScrollView } from "react-native-virtualized-view";
import { CurrentRenderContext } from "@react-navigation/native";

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
  <View style={styles.searchBar}>
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      placeholderTextColor="#A9A9AC" // Set placeholder text color
      autoFocus={true}
      mode="elevated"
      listViewDisplayed="auto"
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
          width: 320,
          flex: 1,
        },
        textInputContainer: {
          paddingTop: 10,
          height: 70,
          backgroundColor: "transparent",
        },
        textInput: {
          borderRadius: 50,
          height: 52,
          color: "#5d5d5d",
          fontSize: 16,
          marginBottom: 15,
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
    />
  </View>
  <View style={styles.pickerContainer}>
    <View style={styles.distancePickerView}>
      <Picker
        style={{color: "#4C5B61",  fontWeight: "bolder", borderRadius: 20, width: 160}}
        selectedValue={radius}
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
  <View style={{width: 300, marginTop: 20}}>
    <Pressable onPress={handleUserLocation}>
      <Text
        style={{
          marginLeft: 0,
          fontWeight: "bold",
          fontSize: 12,
          marginTop: -18,
          color: "#3AD6A7",
          backgroundColor: "white",
          height: 52,
          borderRadius: 50,
          textAlign: "center",
          width: 150,
          paddingTop: 10,
        }}
      >
        Use My Current Location
      </Text>
    </Pressable>
  </View>
</View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4C5B61",
    marginTop: -50,
    paddingBottom: 15,
    paddingTop: 10,
  },
  locationSearchWrap: {
    marginBottom: -50,
  },
  searchBarContainer: {
    marginTop: 10,
    position: "relative",
    // height: 53,
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 330,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  distancePickerView: {
    // position: "absolute",
    top: 52,
    marginLeft: 160,
    right: 0,
    height: 52,
    width: 160,
    color: "green",
    borderRadius: 5,
    backgroundColor: "white",
    fontWeight: "bold"
  },
  searchBar: {
    marginTop: 100,
    marginBottom: -50,
  },
});

const autocompleteStyles = {
  container: {
    borderRadius: 45,
    flex: 1,
    marginBottom: 5,
  },
  textInputContainer: {
    textAlign: "center",
    borderRadius: 45,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    borderRadius: 50,
    marginLeft: 0,
    marginRight: 0,
    height: 40,
    color: "#5d5d5d",
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: "#1faadb",
  },
};

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export default SearchArea;
