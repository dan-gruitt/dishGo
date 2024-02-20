import { View, Text } from 'react-native'
import React from 'react'
import DishUploadForm from '../component/DishUploadForm'

export default function BusinessMenuPage({route}) {
    const { restaurant } = route.params;
  return (
    <View>
      <DishUploadForm restaurant = {restaurant}/>
    </View>
  )
}