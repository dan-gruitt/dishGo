import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';


const ResultDishCard = ({dish}) => {
  return (
  <Card>
    <Card.Content>
      <Text variant="titleLarge">{dish.dish_name}</Text>
      <Text variant="bodyMedium">{dish.description}</Text>
      <Text variant="bodyMedium">{`£${dish.price.toFixed(2)}`}</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://livingstonbagel.com/wp-content/uploads/2016/11/food-placeholder.jpg' }} />
    <Card.Actions>
      { dish.restaurant_info ? <Text variant="titleMedium">{dish.restaurant_info.name}</Text> : <Text variant="bodyMedium">Loading...</Text> }
      <Button>Go to restaurant's page</Button>
    </Card.Actions>
  </Card>
)};

export default ResultDishCard;