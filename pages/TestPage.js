// import { View } from 'react-native'
import React from 'react'
import UserBusinessProfile from '../component/UserBusinessProfile'
import { ScrollView } from 'react-native-virtualized-view'

export default function TestPage() {
  return (
    <ScrollView>
      <UserBusinessProfile />
    </ScrollView>
  )
}