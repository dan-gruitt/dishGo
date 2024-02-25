import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchPage from '../pages/SearchPage';
import LandingPage from '../pages/LandingPage';
import UserSettings from './UserSettings';
import ResultsPage from './ResultsPage';
import SearchStack from '../component/SearchStack';

const Tab = createBottomTabNavigator();

export default function HomePage() {
 
  return (
    <Tab.Navigator>
      <Tab.Screen name="Search"  options={{ headerShown: false }} component={SearchStack}/>
      <Tab.Screen name="UserSetting" component={UserSettings} />
     
    </Tab.Navigator>
    
  )
}