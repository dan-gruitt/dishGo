import { View, Text } from 'react-native'
import React from 'react'
import { TextInput, Button } from 'react-native-paper';

export default function DishUploadForm(props) {
    const {restaurant} = props
    console.log(restaurant)
    const [dish, setDish] = React.useState("");
  return (
    <View>
          <TextInput
      label="Name of dish"
      value={dish}
      onChangeText={dish => setDish(dish)}
      mode = 'outlined'
    />
              <TextInput
      label="Name of dish"
      value={dish}
      onChangeText={dish => setDish(dish)}
      mode = 'outlined'
    />

    </View>
  )
}