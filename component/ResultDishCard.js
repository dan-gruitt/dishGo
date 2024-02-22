import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import mergeDishCardData from "../utils/mergeDishCardData";
import { Linking, View, ActivityIndicator } from "react-native";

const ResultDishCard = ({ dish, restaurants, restaurantsPlaces }) => {

  if (!dish || !restaurants || !restaurantsPlaces) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
  }
  const results = mergeDishCardData(dish, restaurants, restaurantsPlaces);

  if (results.length < 3) {
     return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
  }
  
  return (
    <Card>
      <Card.Content>
        <Text variant="titleLarge">{dish.dish_name}</Text>
        <Text variant="bodyMedium">{dish.description}</Text>
        <Text variant="bodyMedium">{`£${dish.price.toFixed(2)}`}</Text>
        {results[1].name ? (
          <Text variant="bodyMedium">{results[1].name}</Text>
        ) : null}
        {results[2].rating ? (
          <Text variant="bodyMedium">{results[2].rating}</Text>
        ) : null}
      </Card.Content>
      <Card.Cover
        source={{
          uri: "https://livingstonbagel.com/wp-content/uploads/2016/11/food-placeholder.jpg",
        }}
      />
      <Card.Actions>
        {results[2].url ? (
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(`${results[2].url}`)}
          >
            Take me to this restaurant!
          </Text>
        ) : null}
        <Button>Go to restaurant's page</Button>
      </Card.Actions>
    </Card>
  );
};

export default ResultDishCard;