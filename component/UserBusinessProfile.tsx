import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../component/Auth'
import Account from '../component/Account'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import { Session } from '@supabase/supabase-js'

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
    <ScrollView style={styles.container}>
      {session && session.user ? 
      <Account key={session.user.id} session={session} /> 
      : 
      <>
        <View>
          <Text style={styles.headerText}>Welcome!</Text>
        </View>
        <View style={styles.subHeaderView}>
          <Text style={styles.subHeaderText}>Sign up and gain access to 1000’s of customers waiting to find your food!</Text>
        </View>
        <Auth session={session}/>
      </> }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: "#4C5B61"
  },
  headerText:{
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    paddingVertical: 28,
  },
  subHeaderView:{
    backgroundColor: "#FFF",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 102,
    paddingHorizontal: 28
  },
  subHeaderText: {
    color: "#4C5B61",
    fontWeight: "bold",
    fontSize: 14,
    width: 197,
    letterSpacing: 0.6,
  },
  verticallySpaced: {
    // paddingTop: 4,
    // paddingBottom: 4,
    alignSelf: "stretch",
  }
});