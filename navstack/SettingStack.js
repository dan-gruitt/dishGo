import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserSettings from '../pages/UserSettings';

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="UserSettings"
        component={UserSettings}
        options={{ title: '' , headerShown: false}}
        />
  </Stack.Navigator>
  )
}

