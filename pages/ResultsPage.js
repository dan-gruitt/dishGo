import { FlatList, StyleSheet, SafeAreaView, View, Text, Item } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDishes } from '../utils/getDishes';
import ResultDishCard from '../component/ResultDishCard';


export default function ResultsPage({navigation, route}) {
  const [dishesToShow, setDishesToShow] = useState([]);

  useEffect(() =>{
    getDishes().then((data)=>{
      setDishesToShow(data)
      console.log(data)
    });
  },[])


  return (
    <View>
      <Text>Results for: {route.params.dish}</Text>
      {
        dishesToShow.map((dish)=>{
          if(dish.dish_name === route.params.dish){
          return <ResultDishCard key={dish.id} dish={dish}/>
          }
        })
      }
    </View>
  )
}

