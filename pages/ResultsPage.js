import { FlatList, StyleSheet, SafeAreaView, View, Text, Item } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDishes } from '../utils/getDishes';

export default function ResultsPage({navigation, route}) {
  const [dishesToShow, setDishesToShow] = useState([]);

  useEffect(() =>{
    getDishes().then((data)=>{
      const newArr = data.map((dish)=>{
        return {dish_name: dish.dish_name, id: dish.id};
      });
      setDishesToShow(newArr)
    });
  },[])


  return (
    <View>
      <Text>SEARCH TERM: {route.params.dish}</Text>
      {
        dishesToShow.map((dish)=>{
          return <Text key={dish.id}>{dish.dish_name}</Text>
        })
      }
    </View>
  )
}

