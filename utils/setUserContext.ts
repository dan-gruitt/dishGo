import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export default function setUserContext() {
  
  const [session, setSession] = useState<Session | null>(null)
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    console.log('TESTING USER', user)
    if (!user && session) {
      supabase
      .from('profiles')
      .select(`*`)
      .then(({ data, error, status })=>{
        if (data) setUser(data)
      })
    }
  },[session])
}