import { Marker, Callout } from "react-native-maps";
import React from "react";
import { IconButton } from "react-native-paper";
import { View, Text } from "react-native";
import ResultDishCard from "./ResultDishCard";

export const MapMarkers = ({ mapResults, markerPressed, }) => {
    
    return mapResults.map((result, index) => {
        const markerLat = result.place.geometry.location.lat
        const markerLng = result.place.geometry.location.lng
        const restaurantName = result.restaurant.name

        return (<Marker
            key={`marker-${restaurantName}-${index}`}
            coordinate={{ latitude: markerLat, longitude: markerLng }}
            title={restaurantName}
            pinColor="#3AD6A7" 
            onPress={() => markerPressed(result)}
          >
          </Marker>)

    })
}
export default MapMarkers;

