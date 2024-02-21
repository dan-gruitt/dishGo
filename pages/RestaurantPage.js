import React from "react";
import { Text, StyleSheet } from "react-native";

export default function RestaurantPage({ route }) {
  const { results } = route.params;

  const renderOpeningHours = () => {
    const { open_now, weekday_text } = results[2].current_opening_hours;
    const openingHours = weekday_text.map((hours, index) => (
      <Text key={index} style={styles.opening_hours}>
        {hours}
      </Text>
    ));

    const openNowStyle = open_now ? styles.open_now_green : styles.open_now_red;

    return (
      <>
        <Text style={openNowStyle}>{open_now ? "Open Now" : "Closed Now"}</Text>
        {openingHours}
      </>
    );
  };

  return (
    <>
      <Text style={styles.restaurant_name}>{results[1].name}</Text>
      <Text style={styles.restaurant_description}>{results[1].description}</Text>
      {renderOpeningHours()}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurant_name: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    textAlign: "center",
  },
  restaurant_description: {
    fontSize: 20,
    margin: 20,
    textAlign: "center",
  },
  opening_hours: {
    fontSize: 16,
    margin: 5,
    textAlign: "center",
  },
  open_now_green: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "green",
  },
  open_now_red: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "red",
  },
});
