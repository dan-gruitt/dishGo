import React, { useEffect, useState, useContext } from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {MapMarkers} from "./MapMarker";
import { LocationContext } from "../context/LocationContext";
import {MarkerPressedCard} from "./MarkerPressedCard";
import { ScrollView } from "react-native";


export const GoogleMapView = ({mapResults, results}) => {
  const [mapRegion, setMapRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pressedMarkerArr, setPressedMarkerArr] = useState(null);
  const [pressedMarkerDishes, setPressedMarkerDishes] = useState(null);

  const { location, radius } = useContext(LocationContext); 
  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: radius * 0.035,
        longitudeDelta: radius * 0.035,
      });
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const markerPressed = (result) => {
    const allDishes = mapResults
      .filter((item) => item.dish.restaurant_id === result.restaurant.id)
      .map((item) => item.dish);
    setPressedMarkerArr(result);
    setPressedMarkerDishes(allDishes);
  }

  return (
    <ScrollView>
    <View style={{ marginTop: 20, borderRadius: 45, overflow: "hidden", justifyContent: "center", alignItems: "center", flex: 1 }}>
      <MapView
        style={{
          flex: 1,
          width: Dimensions.get("screen").width * 1,
          height: Dimensions.get("screen").height * 0.5, 
        }}
        clusteringEnabled={true}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
        scrollEnabled={true}
        zoomEnabled={true}
      >
        <MapMarkers mapResults={mapResults} markerPressed={markerPressed} />
      </MapView>
      {pressedMarkerArr? <MarkerPressedCard pressedMarkerArr={pressedMarkerArr} pressedMarkerDishes={pressedMarkerDishes} results={results} /> : null}
    </View>
    </ScrollView>
  );
};

export default GoogleMapView;