import React, { useEffect, useState, useContext } from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { LocationContext } from "../context/LocationContext";

export const GoogleMapView = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  const { location } = useContext(LocationContext); 
  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 2 * 0.03,
        longitudeDelta: 2 * 0.03,
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

  return (
    <View style={{ marginTop: 20, borderRadius: 50, overflow: "hidden", justifyContent: "center", alignItems: "center", flex: 1 }}>
      <MapView
        style={{
          width: Dimensions.get("screen").width * 0.9,
          height: Dimensions.get("screen").height * 0.5, 
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
        scrollEnabled={false}
      ></MapView>
    </View>
  );
};

export default GoogleMapView;