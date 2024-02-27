import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddRestaurantPage from '../pages/AddRestaurantPage';
import BusinessMenuPage from '../pages/BusinessMenuPage';

const Stack = createNativeStackNavigator();

export default function BusinessManagerStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Add Restaurant"
        component={AddRestaurantPage}
        options={{ title: '' , headerShown: false}}
        />
        <Stack.Screen
        name="Business Menu"
        component={BusinessMenuPage}
        options={{ title: '' , headerShown: false}}
        />
  </Stack.Navigator>
  )
}