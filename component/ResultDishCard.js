import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Text } from "react-native-paper";
import { Linking, View, ActivityIndicator, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { calculateDistance } from "../utils/calculateDistance";
import { LocationContext } from "../context/LocationContext";
import { mergeDishCardData } from "../utils/mergeDishCardData";
import { initialWindowMetrics } from "react-native-safe-area-context";
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

  const [imgUri, setImgUri] = useState(null)

  useEffect(()=>{
    if(results && results[0].img_url){
      getDishImageByUrl(results[0].img_url, 'business_images', setImgUri).then(()=>{
        console.log('imgUri retrieved')
      })
    }
  }, [])

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
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.container}>
          <View style={styles.leftSide}>
            <Card.Cover
              source={{
                uri: results[0].img_url
                ? results[0].img_url
                : "https://livingstonbagel.com/wp-content/uploads/2016/11/food-placeholder.jpg",
              }}
              style={styles.cover}
              />
              {dish.vegan || dish.vegetarian || dish.pescatarian ? (
                <View style={styles.iconContainer}>
                  {dish.vegan && (
                    <View style={styles.individualIconContainer}>
                      <Icon2 name="leaf" size={15} color="green" />
                      <Text style={styles.iconText}>Vegan</Text>
                    </View>
                  )}
                  {dish.vegetarian && (
                    <View style={styles.individualIconContainer}>
                      <Icon2 name="carrot" size={15} color="orange" />
                      <Text style={styles.iconText}>Vegetarian</Text>
                    </View>
                  )}
                  {dish.pescatarian && (
                    <View style={styles.individualIconContainer}>
                      <Icon2 name="fish" size={15} color="blue" />
                      <Text style={styles.iconText}>Pescatarian</Text>
                    </View>
                  )}
                </View>
              ) : <View style={styles.EmptyIconContainer}></View>}
            </View>
          </View>
          <View style={styles.rightSide}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{dish.dish_name}</Text>
              <View style={styles.restaurantInfoContainer}>
                <Text style={styles.restaurantName}>
                  {results[1].name}{" "}
                  <Icon name="star" size={13} color="#FFD700" />{" "}
                  {results[2].rating}
                </Text>
              </View>
              <View style={styles.dietaryAndDescriptionContainer}>
                <View style={styles.dietaryContainer}>
                  <View style={styles.price}>
                    <Text style={styles.priceContent}>{`£${dish.price.toFixed(
                      2
                    )}`}</Text>
                  </View>
                <Text style={styles.description}>{dish.description}</Text>
              </View>
            </View>
          </View>
        </View>
      </Card.Content>
      <View style={styles.buttonsContainer}>
      )}
      <Card.Cover
        source={ imgUri?
          {
          uri: imgUri
        } : require('../assets/tempfoodimage.jpg')}
        style={styles.cover}
      />
      <Card.Actions style={styles.actions}>

        {results[2].url && (
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
        )}
        <Button
          mode="contained"
          onPress={() => navigation.navigate("RestaurantPage", { results })}
          style={[styles.button, styles.restaurantButton]}
          labelStyle={[styles.buttonLabel, styles.restaurantButton]}
          contentStyle={styles.buttonContent}
        >
          Restaurant
        </Button>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: "row", // Ensure content layout is row-based
    alignItems: "flex-start", // Align items to the top of the container
  },
  textContainer: {
    flex: 1, // Take up remaining vertical space
  },
  card: {
    padding: 1,
    borderRadius: 45,
    margin: 5,
    backgroundColor: "#3AD6A7",
    // flexDirection: "row", // Ensure content layout is row-based
  },
  cardContent: {
    // flex: 1, // Take up remaining space beside the cover photo
    // paddingHorizontal: 10, // Add horizontal padding for spacing
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: -15,
    marginBottom: 10,
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center", // Center the text horizontally
  },
  description: {
    color: "white",
    // marginLeft: 200,
    fontSize: 12,
    minHeight: 30,
    marginBottom: 5,
    marginTop: 20,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    // marginLeft: 250,
  },
  restaurantName: {
    marginBottom: 10,
    color: "#4C5B61",
    fontSize: 13,
    fontStyle: "italic",
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center", // Center the text horizontally
  },
  restaurantRating: {
    color: "#4C5B61",
    fontSize: 13,
    fontStyle: "italic",
    flexDirection: "row",
    alignItems: "center",
  },
  cover: {
    width: 150, // Adjust width as needed
    height: 175,
    borderRadius: 45,
    marginBottom: 0,
  },
  actions: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // paddingHorizontal: 16,
    // flexWrap: "wrap",
  },
  button: {
    width: "47%",
    marginBottom: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 45,
  },
  mapButton: {
    backgroundColor: "white",
    color: "#3AD6A7",
  },
  restaurantButton: {
    backgroundColor: "#4C5B61",
    color: "white",
  },
  buttonLabel: {
    // fontSize: 14,
    // fontWeight: "bold",
    width: "65%",
  },
  buttonContent: {
    // height: 40,
    width: "100%",
    color: "#3AD6A7",
  },
  buttonsContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 45,
    marginTop: 10,
    marginBottom: 15,
    padding: 5,
    width: "40%",
    marginLeft: 5,
  },
  iconTextContainer: {
    flexDirection: "row",
    marginLeft: 10,
    alignItems: "center",
    marginTop: 5, 
    marginBottom: 5,
  },
  iconText: {
    color: "#3AD6A7",
    fontSize: 10,
  },
  individualIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10, 
  },
  contentContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 200,
    justifyContent: "space-around",
  },
  rightSide: {
    marginTop: -210,
    marginLeft: 175,
    marginBottom: 20,
  },
  price: {
    marginLeft: 47,
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
    marginLeft: 15,
    borderRadius: 45,
    padding: 4,
    // width: '100%'
  },
  leftSide: {
    marginBottom: 10,
  },
  EmptyIconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 45,
    marginTop: 15,
    marginBottom: 15,
    padding: 5,
    width: "40%",
    marginLeft: 5,
  }
});

export default ResultDishCard;
