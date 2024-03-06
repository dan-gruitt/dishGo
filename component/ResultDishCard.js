import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import {
  View,
  StyleSheet,
  Image,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { calculateDistance } from "../utils/calculateDistance";
import { LocationContext } from "../context/LocationContext";
import { mergeDishCardData } from "../utils/mergeDishCardData";
import { getDishImageByUrl } from "../utils/getDishImageByUrl";

const ResultDishCard = ({
  dish,
  restaurants,
  restaurantsPlaces,
  // setCardCount,
  setMapResults,
  storeMapResults,
}) => {
  const navigation = useNavigation();
  const { location, radius } = useContext(LocationContext);
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState(null);

  const [imgUri, setImgUri] = useState(null);

  useEffect(() => {
    if (results && results[0].img_url) {
      getDishImageByUrl(results[0].img_url, "business_images", setImgUri);
    }
  }, [results]);

  useEffect(() => {
    if (location && results && radius) {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        results[2].geometry.location.lat,
        results[2].geometry.location.lng
      );
      setIsVisible(distance < radius * 1609);
      if (distance < radius * 1609) {
        storeMapResults(results);
      }
    }
  }, [location, results, setMapResults]);

  useEffect(() => {
    const mergedResults = mergeDishCardData(
      dish,
      restaurants,
      restaurantsPlaces
    );
    setResults(mergedResults);
  }, [dish, restaurants, restaurantsPlaces]);

  if (!isVisible || !results || !results[2]) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <View style = {styles.leftSide}>
          <Image
            source={
              imgUri ? { uri: imgUri } : require("../assets/tempfoodimage.jpg")
            }
            style={styles.image}
          />
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.cardTextBold}>{dish.dish_name}</Text>
          <Text style={styles.cardText}>
            {results[1].name}
          </Text>
          <Text style={styles.cardText}> <Icon name="star" size={13} color="white" /> {results[2].rating}</Text>
          <Text style={styles.cardTextBold}>{`£${dish.price.toFixed(2)}`}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {/* {results[2].url && (
          <Button
            icon="map-marker"
            mode="contained"
            onPress={() => Linking.openURL(`${results[2].url}`)}
            style={[styles.button, styles.mapButton]}
            labelStyle={[styles.buttonLabel, styles.mapButton]}
            contentStyle={styles.buttonContent}
          >
            Open In Maps
          </Button>
        )} */}

        <IconButton
    icon="store-marker-outline"
    iconColor={"#4C5B61"}
    style= {styles.button}
    size={40}
    onPress={() => navigation.navigate("RestaurantPage", { results })}
  />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: "row", // Ensure content layout is row-based
    alignItems: "flex-start", // Align items to the top of the container
  },
  card: {
    borderRadius: 31,
    backgroundColor: "#3AD6A7",
    height: 200,
    margin: 10,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftSide:{
    flex: 1,
  },
  rightSide:{
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  image: {
    width: 150, // Adjust width as needed
    borderRadius: 31,
    height: 200,
  },
  cardText:{
    fontSize: 15,
    color: "white",
    marginBottom: 5,
  },
  cardTextBold:{
    fontWeight: "bold",
    fontSize: 19,
    color: "white",
    marginBottom: 5,
  },
  buttonsContainer:{
    position: "absolute",
    right: 5,
    bottom: 5,
    alignItems:'flex-end'
  },
  button: {
    backgroundColor: 'rgba(255,255,255, 0.5)',
  },
  mapButton: {
    backgroundColor: "white",
    color: "#3AD6A7",
  },
  restaurantButton: {
    backgroundColor: "#4C5B61",
    color: "white",
  },
});

export default ResultDishCard;
