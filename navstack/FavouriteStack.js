import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserFavourites from '../pages/UserFavourites';

const Stack = createNativeStackNavigator();

export default function FavouriteStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="UserFavourites"
        component={UserFavourites}
        options={{ title: '' , headerShown: false}}
        />
    </Stack.Navigator>
  )
}

