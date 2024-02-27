import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddRestaurantPage from '../pages/AddRestaurantPage';
import BusinessMenuPage from '../pages/BusinessMenuPage';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Text } from 'react-native-paper';
import TestPage from '../pages/TestPage';
import SearchPage from '../pages/SearchPage';
import BusinessSignUp from '../pages/BusinessSignUp';
import LimboLogin from '../pages/LimboLogin';

const Stack = createNativeStackNavigator();




export default function BusinessManagerStack() {


const [session, setSession] = useState(null)

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session)
    return session;
  })

  supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
    // console.log(session, ' <<< SESSION 2 USER BUSINESS SIGN UP');
  })
}, [])


  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Add Restaurant"
        component={session && session.user ? AddRestaurantPage : LimboLogin}
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