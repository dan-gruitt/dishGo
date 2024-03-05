import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserSignUp from '../pages/UserSignUp';

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="UserSignUp"
        component={UserSignUp}
        options={{ title: '' , headerShown: false}}
        />
  </Stack.Navigator>
  )
}

