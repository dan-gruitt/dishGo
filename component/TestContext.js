import { View, Text } from 'react-native'
import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function TestContext() {

    const test = useContext(UserContext)
    console.log(test)
  return (
    <View>
      <Text></Text>
    </View>
  )
}