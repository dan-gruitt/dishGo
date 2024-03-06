import React, { useEffect, useState, useContext } from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Callout } from "react-native-maps";
import {MapMarkers} from "./MapMarker";
import { LocationContext } from "../context/LocationContext";
import {MarkerPressedCard} from "./MarkerPressedCard";
import { ScrollView } from "react-native";
import ResultDishCard from "./ResultDishCard";

export const GoogleMapView = (props) => {

  const {mapResults, results, setMapResults, storeMapResults} = props

  const [mapRegion, setMapRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pressedMarkerArr, setPressedMarkerArr] = useState(null);
  const [pressedMarkerDish, setPressedMarkerDish] = useState(null);

  const { location, radius } = useContext(LocationContext); 
  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: radius * 0.5,
        longitudeDelta: radius * 0.5,
      });
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3AD6A7" />
      </View>
    );
  }

  const markerPressed = (result) => {
    // const allDishes = mapResults
    //   .filter((item) => item.dish.restaurant_id === result.restaurant.id)
    //   .map((item) => item.dish);
    setPressedMarkerArr(result);
    setPressedMarkerDish(result);
  }

  return (
    <View>
      <View style={{ marginTop: -120, zIndex: -1}}>
        <MapView
          style={{
            flex: 1,
            width: Dimensions.get("screen").width * 1,
            height: Dimensions.get("screen").height * 0.65
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
      </View>
        {pressedMarkerArr? (
          <Callout style={{position: "absolute", width: 350, bottom: 0}}>
             <ResultDishCard dish={pressedMarkerDish.dish} restaurants={[pressedMarkerDish.restaurant]} restaurantsPlaces={[pressedMarkerDish.place]} storeMapResults={storeMapResults} setMapResults={setMapResults}/>
        </Callout>
        ): null}
    </View>
  );
        }

export default GoogleMapView;