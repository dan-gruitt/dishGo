import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Session } from '@supabase/supabase-js'
import Avatar from './Avatar'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const { user, setUser } = useContext(UserContext)


  useEffect(() => {
    if (session) getProfile()

    // if (session) setUser(session.user.id)
    // if (session) getUser()
  }, [session])

  console.log(user, "<<< USER INFO?");
 
  // async function getUser() {
  //   const { data, error, status } = await supabase
  //   .from('profiles')
  //   .select(`username, website, avatar_url, id`)
  //   setUser(data[0])
  // }

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setUser(data);
      }

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)} />
      </View>



      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url)
            updateProfile({ username, website, avatar_url: url })
          }}
        />
      </View>


      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => {
          console.log("inside onpress");
          supabase.auth.signOut()
          setUser(null)
        }} />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})



// { 
//   "app_metadata": { "provider": "email", 
//   "providers": ["email"] }, 
//   "aud": "authenticated", 
//   "confirmed_at": "2024-02-22T14:43:23.473976Z", 
//   "created_at": "2024-02-22T14:43:23.470234Z", 
//   "email": "testing123@gmail.com", 
//   "email_confirmed_at": "2024-02-22T14:43:23.473976Z", 
//   "id": "051f4f89-6d91-4c4c-8e55-34c2838029eb", 
//   "identities": [{ "created_at": "2024-02-22T14:43:23.472638Z", 
//   "email": "testing123@gmail.com", 
//   "id": "051f4f89-6d91-4c4c-8e55-34c2838029eb", "identity_data": [Object], "identity_id": "066581b2-ed27-4425-a09c-997bc0d47279", "last_sign_in_at": "2024-02-22T14:43:23.472592Z", "provider": "email", "updated_at": "2024-02-22T14:43:23.472638Z", "user_id": "051f4f89-6d91-4c4c-8e55-34c2838029eb" }], "last_sign_in_at": "2024-02-23T09:31:53.974975564Z", "phone": "", "role": "authenticated", "updated_at": "2024-02-23T09:31:53.976517Z", "user_metadata": { } }