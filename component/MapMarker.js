import { Marker } from "react-native-maps";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export const MapMarkers = ({ mapResults, markerPressed }) => {
    
    const markerResults = mapResults.map((result, index) => {
        const markerLat = result.place.geometry.location.lat
        const markerLng = result.place.geometry.location.lng
        const restaurantName = result.restaurant.name

        return (<Marker
            key={index}
            coordinate={{ latitude: markerLat, longitude: markerLng }}
            title={restaurantName}
            onPress={() => markerPressed(result)}
          />)

    })
    const uniqueMarkers = [...new Set(markerResults)]
    return uniqueMarkers
}
export default MapMarkers;

