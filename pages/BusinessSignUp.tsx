import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../component/Auth'
import Account from '../component/Account'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import AddRestaurantPage from './AddRestaurantPage'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      { session && session.user ? <Auth /> : null }
    </View>
  )
}