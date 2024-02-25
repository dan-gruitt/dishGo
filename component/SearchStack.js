import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchPage from '../pages/SearchPage';
import ResultsPage from '../pages/ResultsPage';
import RestaurantPage from '../pages/RestaurantPage';

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{ title: '' , headerShown: false}}
        />
        <Stack.Screen
        name="ResultsPage"
        component={ResultsPage}
        options={{ title: '' , headerShown: false}}
        />
        <Stack.Screen
        name="RestaurantPage"
        component={RestaurantPage}
        options={{ title: '' , headerShown: false}}
        />
  </Stack.Navigator>
  )
}