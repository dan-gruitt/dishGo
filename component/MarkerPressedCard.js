import React from "react";
import { Linking, View, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

export const MarkerPressedCard = ({
  pressedMarkerArr,
  pressedMarkerDishes,
}) => {
  return (
    <ScrollView>
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
            icon="map-marker"
            mode="contained"
            onPress={() => Linking.openURL(`${pressedMarkerArr.place.url}`)}
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
      </View>
      {pressedMarkerDishes.map((dish) => (
        <Card key={dish.dish_id} style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text style={styles.title}>
              {dish.dish_name} - {`£${dish.price.toFixed(2)}`}
            </Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{dish.description}</Text>
            </View>
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
            <View style={styles.coverContainer}>
              <Card.Cover
                source={{
                  uri: dish.img_url
                    ? dish.img_url
                    : "https://livingstonbagel.com/wp-content/uploads/2016/11/food-placeholder.jpg",
                }}
                style={styles.cover}
              />
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  descriptionContainer: {
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  restaurantInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 25,
    marginRight: 5,
  },
  restaurantRating: {
    fontSize: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  coverContainer: {
    alignItems: "center",
  },
  cover: {
    width: "100%",
    aspectRatio: 16 / 9,
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

export default MarkerPressedCard;
