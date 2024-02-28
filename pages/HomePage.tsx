import React, { useEffect,  useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchStack from '../navstack/SearchStack';
import FavouriteStack from '../navstack/FavouriteStack';
import SettingStack from '../navstack/SettingStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';
import { UserContext } from '../context/UserContext'
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

const Tab = createBottomTabNavigator();

export default function HomePage({ session, isBusiness }: { session: Session, isBusiness: boolean }) {

  const { User, setUser } = useContext(UserContext);

  useEffect(()=>{
    setUserProfile()
  }, [])

  async function setUserProfile() {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .upsert({is_business: isBusiness, id: session?.user.id,})
        .eq("id", session.user.id)
        .select('*')
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUser(data);
        console.log(data, "<<<< user??");
      }
    } catch (error) {
      if (error) {
        console.log(error, "<<< inside getProfile catch");
      }
    }
  }


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
        name="Search"  
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Search</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons 
              name="magnify" 
              color={focused ? green : grey} 
              size={size} 
            />
          ),
        }} 
        component={SearchStack}
      />
      {/* <Tab.Screen 
        name="Favourites" 
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Favourites</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons 
              name="heart" 
              color={focused ? green : grey} 
              size={size} 
            />
          ),
        }}
        component={FavouriteStack} 
      /> */}
      <Tab.Screen 
        name="Settings" 
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color }}>Settings</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons 
              name="cog" 
              color={focused ? green : grey} 
              size={size} 
            />
          ),
        }} 
        component={SettingStack} 
      />
    </Tab.Navigator>
  );
}
