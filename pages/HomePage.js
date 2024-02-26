import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchStack from '../navstack/SearchStack';
import FavouriteStack from '../navstack/FavouriteStack';
import SettingStack from '../navstack/SettingStack';

const Tab = createBottomTabNavigator();

export default function HomePage() {
 
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search"  options={{ headerShown: false }} component={SearchStack}/>
      <Tab.Screen name="Favourites" component={FavouriteStack} />
      <Tab.Screen name="Settings" component={SettingStack} />
    </Tab.Navigator>
  )
}