import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BusinessSignup from './BusinessSignup'
import BusinessManagerStack from '../navstack/BusinessManagerStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export default function HomePageBusiness() {
  const green = '#3AD6A7';
  const grey = '#4C5B61';
  const tabBarHeight = 70; 

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: green, 
        tabBarInactiveTintColor: grey,
        tabBarStyle: {
          paddingTop: 6,
          paddingBottom: 12,
          height: tabBarHeight,
        }, 
      }}>
      <Tab.Screen 
        name="Profile"  
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Account</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons 
              name="account" 
              color={focused ? green : grey} 
              size={size} 
            />
          ),
        }} 
        component={BusinessSignup}
      />
      <Tab.Screen 
        name="Locations" 
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Restaurants</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons 
              name="store-marker-outline" 
              color={focused ? green : grey} 
              size={size} 
            />
          ),
        }}
        component={BusinessManagerStack} 
      />
    </Tab.Navigator>
  );
}
