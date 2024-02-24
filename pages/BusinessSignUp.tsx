import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../component/Auth'
// import Account from '../component/Account'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import AddRestaurantPage from './AddRestaurantPage'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function BusinessSignUp({navigation}) {
  const [session, setSession] = useState<Session | null>(null)
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      return session;
    }).then(async (test) => {

      const { data, error, status } = await supabase
      .from('profiles')
      .select(`*`)

      setUser(data[0])
      // console.log(data[0], ' <<< DATA BUSINESS SIGN UP')
      // console.log(user, ' <<< USER BUSINESS SIGN UP')
      // console.log(session, ' <<< SESSION 2 USER BUSINESS SIGN UP');
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      // console.log(session, ' <<< SESSION 2 USER BUSINESS SIGN UP');
    })
  }, [])

  return (
    <View>
      {session && session.user ? 
        <>
          {/* <Account key={session.user.id} session={session} />  */}
          <AddRestaurantPage navigation={navigation} />
          
        </>
       : 
        <Auth />
      }
    </View>
  )
      }