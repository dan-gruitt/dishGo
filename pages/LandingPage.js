import { View, Text, Button} from 'react-native'
import React from 'react'


export default function LandingPage({navigation}) {
  return (
    <View>

<Button
      title="Add Restaurants Page"
      onPress={() =>
        navigation.navigate('AddRestaurantPage')
      }
    />
<Button
      title="Results Page"
      onPress={() =>
        navigation.navigate('ResultsPage')
      }
    />
  
  <Button
      title="Search Page"
      onPress={() =>
        navigation.navigate('SearchPage')
      }
    />

      
    </View>
  )
}
