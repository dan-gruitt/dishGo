import React from 'react';
import { View, Text } from 'react-native';
import { Card, ScrollView } from 'react-native-paper';

export const MarkerPressedCard = ({ pressedMarkerArr, pressedMarkerDishes }) => {
    return (
        <View>
            <Text>{pressedMarkerArr.restaurant.name}</Text>
            {pressedMarkerDishes.map(dish => (
                <Card key={dish.id} style={{ marginVertical: 5 }}>
                    <Card.Content>
                        <Text>{dish.dish_name} - {dish.price}</Text>
                        <Text>{dish.description}</Text>
                    </Card.Content>
                </Card>
            ))}
        </View>
    );
};

export default MarkerPressedCard;
