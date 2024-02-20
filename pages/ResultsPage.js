import { FlatList, StyleSheet, SafeAreaView, View, Text, Item } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDishes } from '../utils/getDishes';
<<<<<<< Updated upstream
=======
import ResultDishCard from '../component/ResultDishCard';
>>>>>>> Stashed changes

export default function ResultsPage({navigation, route}) {
  const [dishesToShow, setDishesToShow] = useState([]);

  useEffect(() =>{
    getDishes().then((data)=>{
<<<<<<< Updated upstream
      const newArr = data.map((dish)=>{
        return {dish_name: dish.dish_name, id: dish.id};
      });
      setDishesToShow(newArr)
=======
      setDishesToShow(data)
      console.log(data)
>>>>>>> Stashed changes
    });
  },[])


  return (
    <View>
<<<<<<< Updated upstream
      <Text>SEARCH TERM: {route.params.dish}</Text>
      {
        dishesToShow.map((dish)=>{
          return <Text key={dish.id}>{dish.dish_name}</Text>
=======
      <Text>Results for: {route.params.dish}</Text>
      {
        dishesToShow.map((dish)=>{
          if(dish.dish_name === route.params.dish){
          return <ResultDishCard key={dish.id} dish={dish}/>
          }
>>>>>>> Stashed changes
        })
      }
    </View>
  )
}

