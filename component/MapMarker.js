import { Marker } from "react-native-maps";
import React from "react";

export const MapMarkers = ({ mapResults, markerPressed }) => {
    
    return mapResults.map((result, index) => {
        const markerLat = result.place.geometry.location.lat
        const markerLng = result.place.geometry.location.lng
        const restaurantName = result.restaurant.name

        return (<Marker
            key={`marker-${index}`}
            coordinate={{ latitude: markerLat, longitude: markerLng }}
            title={restaurantName}
            pinColor="#3AD6A7" 
            onPress={() => markerPressed(result)}
          />)

    })
}
export default MapMarkers;

