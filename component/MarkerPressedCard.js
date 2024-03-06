import React from "react";
import {useEffect, useState} from 'react'
import { Linking, View, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { CurrentRenderContext, useNavigation } from "@react-navigation/native";
import { getDishImageByUrl } from "../utils/getDishImageByUrl";
import MapDishCard from "./MapDishCard";

export const MarkerPressedCard = ({
  pressedMarkerArr,
  pressedMarkerDish,
  results,
}) => {

  const [imgUri, setImgUri] = useState(null);

  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 40, marginTop: 10 }}>
      <View style={styles.restaurantInfoContainer}>
        <Text style={styles.restaurantName}>
          {pressedMarkerArr.restaurant.name}
        </Text>
        <Text style={styles.restaurantRating}>
          <Icon name="star" size={20} color="#FFD700" />{" "}
          {pressedMarkerArr.place.rating}
        </Text>
      </View>
      <View style={styles.actions}>
        {pressedMarkerArr.place.url && (
          <Button
            mode="contained"
            onPress={() => Linking.openURL(`${pressedMarkerArr.place.url}`)}
            style={[styles.button, styles.mapButton]}
            labelStyle={[styles.buttonLabel, styles.mapButtonLabel]}
            contentStyle={styles.buttonContent}
          >
            Open In Maps
          </Button>
        )}
        <Button
          mode="contained"
          onPress={() => navigation.navigate("RestaurantPage", { results })}
          style={[styles.button, styles.restaurantButton]}
          labelStyle={[styles.buttonLabel, styles.restaurantButtonLabel]}
          contentStyle={styles.buttonContent}
        >
          Restaurant
        </Button>
      </View>
      {pressedMarkerDish.map((dish, index) => (<MapDishCard key = {index} dish={dish} styles={styles} /> ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 50,
    backgroundColor: "#3AD6A7",
  },
  cardContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center", // Center the text horizontally
  },
  descriptionContainer: {
    marginTop: 25,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  button: {
    width: "407%",
    marginBottom: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 45,
  },
  buttonContent: {
    // height: 40,
    color: "#3AD6A7",
  },
  buttonsContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginRight: 10,
  },
  mapButtonLabel: {
    color: "#3AD6A7",
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "bold",
    width: "60%",
  },
  mapButton: {
    backgroundColor: "white",
    color: "#3AD6A7",
  },
  restaurantButton: {
    backgroundColor: "#4C5B61",
    color: "white",
  },
  restaurantInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    width: 250,
    marginLeft: 75,
  },
  restaurantName: {
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    marginRight: 5,
    color: "#4C5B61",
  },
  rightSide: {
    marginTop: -180,
    width: "45%",
    marginRight: -175,
    textAlign: "center",
  },
  restaurantRating: {
    color: "#4C5B61",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  coverContainer: {
    alignItems: "center",
    width: "45%",
    height: 180,
    marginBottom: 10,
    marginLeft: -175,
  },
  cover: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  button: {
    width: "47%",
    marginBottom: 10,
    paddingVertical: 5,
  },
  buttonLabel: {
    fontSize: 14,
    width: "80%",
    fontWeight: "bold",
  },
  buttonContent: {
    height: 40,
    width: "100%",
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    height: 70,
    marginBottom: 10,
    borderRadius: 50,
    width: "100%",
  },
  emptyIconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#3AD6A7",
    borderRadius: 10,
    padding: 5,
    height: 70,
    marginBottom: 10,
    borderRadius: 50,
    width: "100%",
  },

  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  iconText: {
    fontSize: 12,
    color: "#3AD6A7",
  },
  price: {
    marginLeft: 40,
    marginBottom: 5,
    borderRadius: 45,
    backgroundColor: "#4C5B61",
    width: "47%",
  },
  priceContent: {
    fontSize: 15,
    fontStyle: "italic",
    color: "white",
    fontStyle: "italic",
    color: "white",
    backgroundColor: "#4C5B61",
    textAlign: "center",
    borderRadius: 45,
    padding: 4,
    // width: '100%'
  },
});

export default MarkerPressedCard;
