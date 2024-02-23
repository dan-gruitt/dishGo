import * as React from "react";
import { Button, Card, Text } from "react-native-paper";
import mergeDishCardData from "../utils/mergeDishCardData";
import { Linking, View, ActivityIndicator, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';


const ResultDishCard = ({ dish, restaurants, restaurantsPlaces }) => {

  const navigation = useNavigation();

  if (!dish || !restaurants || !restaurantsPlaces) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const results = mergeDishCardData(dish, restaurants, restaurantsPlaces);

  if (results.length < 3) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
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
            icon="map"
            mode="contained"
            onPress={() => Linking.openURL(`${results[2].url}`)}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            contentStyle={styles.buttonContent}
          >
            Open in Maps
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
});

export default ResultDishCard;
