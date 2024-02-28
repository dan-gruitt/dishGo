import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../component/Auth'
// import Account from '../component/Account'
import { View, Text, StyleSheet } from 'react-native'
import { Session } from '@supabase/supabase-js'
import AddRestaurantPage from './AddRestaurantPage'
import HomePage from './HomePage'

export default function UserSignUp({navigation}) {

  const [session, setSession] = useState<Session | null>(null)

  const isBusiness = false

  useEffect(() => {
    supabase.auth.getSession()
    .then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    console.log(session, '<<<')
  }, [])

  return (
   <>
      {session && session.user ? 
        <>
          {/* <AddRestaurantPage navigation={navigation} /> */}
        <HomePage session = {session} isBusiness = {isBusiness}/>
        </>
       : 
       <><View style = {{backgroundColor: "#000000"}}>
          <Text style={styles.headerText}>Sign Up Today!</Text>
        </View><Auth /></>
      }
    </>
  )
      }

      const styles = StyleSheet.create({
        headerText:{
          marginTop: 20,
          color: "#FFF",
          fontWeight: "bold",
          fontSize: 28,
          textAlign: "center",
          paddingVertical: 28,
        },
      })