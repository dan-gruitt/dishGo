import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Text } from "react-native-paper";
import { Linking, View, ActivityIndicator, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { calculateDistance } from "../utils/calculateDistance";
import { LocationContext } from "../context/LocationContext";
import { mergeDishCardData } from "../utils/mergeDishCardData";

const ResultDishCard = ({
  dish,
  restaurants,
  restaurantsPlaces,
  setCardCount,
  setMapResults,
  storeMapResults,
}) => {
  const navigation = useNavigation();
  const { location } = useContext(LocationContext);
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (location && results) {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        results[2].geometry.location.lat,
        results[2].geometry.location.lng,
      );
      setIsVisible(distance < 1500);
      if (distance < 1500) {
        setCardCount((prevCount) => prevCount + 1);
        storeMapResults(results);
      }
    }
  }, [location, results, setCardCount, setMapResults]);

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
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Text style={styles.title}>
          {dish.dish_name} - {`£${dish.price.toFixed(2)}`}
        </Text>
        <View style={styles.restaurantInfoContainer}>
          <Text style={styles.restaurantName}>{results[1].name}</Text>
          <Text style={styles.restaurantRating}>
            <Icon name="star" size={16} color="#FFD700" /> {results[2].rating}
          </Text>
        </View>
        <Text style={styles.description}>{dish.description}</Text>
      </Card.Content>
      {(dish.vegan || dish.vegetarian || dish.pescatarian) && (
        <View style={styles.iconContainer}>
          {dish.vegan && (
            <View style={styles.iconTextContainer}>
              <Icon2 name="leaf" size={20} color="green" />
              <Text style={styles.iconText}>Vegan</Text>
            </View>
          )}
          {dish.vegetarian && (
            <View style={styles.iconTextContainer}>
              <Icon2 name="carrot" size={20} color="orange" />
              <Text style={styles.iconText}>Vegetarian</Text>
            </View>
          )}
          {dish.pescatarian && (
            <View style={styles.iconTextContainer}>
              <Icon2 name="fish" size={20} color="blue" />
              <Text style={styles.iconText}>Pescatarian</Text>
            </View>
          )}
        </View>
      )}
      <Card.Cover
        source={{
          uri: results[0].img_url
            ? results[0].img_url
            : "https://livingstonbagel.com/wp-content/uploads/2016/11/food-placeholder.jpg",
        }}
        style={styles.cover}
      />
      <Card.Actions style={styles.actions}>
        {results[2].url && (
          <Button
            icon="map-marker"
            mode="contained"
            onPress={() => Linking.openURL(`${results[2].url}`)}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
          >
            Open In Maps
          </Button>
        )}
        <Button
          mode="contained"
          onPress={() => navigation.navigate("RestaurantPage", { results })}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          contentStyle={styles.buttonContent}
        >
          Visit Restaurant's Page
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 10,
  },
  cardContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  restaurantInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 16,
    fontStyle: "italic",
    marginRight: 5,
  },
  restaurantRating: {
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  cover: {
    height: 200,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    flexWrap: "wrap",
  },
  button: {
    width: "47%",
    marginBottom: 10,
    paddingVertical: 5,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonContent: {
    height: 40,
    width: "100%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#e8c6f7",
    borderRadius: 10,
    padding: 5,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  iconText: {
    fontSize: 16,
  },
});

export default ResultDishCard;
