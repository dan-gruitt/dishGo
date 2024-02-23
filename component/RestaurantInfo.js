import React from "react";
import { Text, View, TouchableOpacity, Linking } from "react-native";

const RestaurantInfo = ({
  styles,
  open_now,
  weekday_text,
  website,
  address,
  restaurantName,
}) => {
  const openNowStyle = open_now ? styles.open_now_green : styles.open_now_red;

  const handleWebsitePress = () => {
    Linking.openURL(website);
  };

  return (
    <>
      <Text style={openNowStyle}>{open_now ? "Open Now" : "Closed Now"}</Text>
      {weekday_text.map((hours, index) => (
        <Text key={index} style={styles.opening_hours}>
          {hours}
        </Text>
      ))}
      <Text style={styles.opening_hours}>Address: {address}</Text>
      <TouchableOpacity onPress={handleWebsitePress}>
        <Text
          style={[
            styles.website,
            { color: "#6133f5", textDecorationLine: "underline" },
          ]}
        >
          {restaurantName}'s Website
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default RestaurantInfo;
