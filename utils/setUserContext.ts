// import { useContext, useState, useEffect } from 'react';
// import { UserContext } from '../context/UserContext';
// import { Session } from '@supabase/supabase-js'
// import { supabase } from '../lib/supabase'

// export default async function setUserContext() {
  
//   const [session, setSession] = useState<Session | null>(null)
//   const { user, setUser } = useContext(UserContext)
//   const [getting, setGetting] = useState(false)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })
//   }, [])

//   useEffect(() => {
//     if (!user && session && !getting) {
//       setGetting(true);
//       console.log('1-TESTING USER', user)
//       console.log('1-TESTING SESSION', session)
//       supabase
//       .from('profiles')
//       .select(`*`)
//       .then(({ data, error, status })=>{
//         if (data) setUser(()=>{
//           setGetting(false);
//           console.log('INSIDE-TESTING USER', data)
//           return  data;
//         })
        
//       })
//     }
//   },[session])

//   // return session
// }