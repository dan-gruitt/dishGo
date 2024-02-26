import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingStack from '../navstack/SettingStack';
import UserBusinessProfile from '../component/UserBusinessProfile'
import BusinessManagerStack from '../navstack/BusinessManagerStack';
import BusinessMenuPage from './BusinessMenuPage';

const Tab = createBottomTabNavigator();

export default function HomePageBusiness() {
 
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={UserBusinessProfile}/>
      <Tab.Screen name="Locations" options={{ headerShown: false }} component={BusinessManagerStack} />
      {/* <Tab.Screen name="Menus" component={BusinessMenuPage} /> */}
    </Tab.Navigator>
  )
}