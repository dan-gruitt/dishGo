import { ScrollView, FlatList, StyleSheet, SafeAreaView, View, Text, Item } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDishes } from '../utils/getDishes';
import ResultDishCard from '../component/ResultDishCard';
import { filterSearch } from '../utils/filterSearch';


export default function ResultsPage({navigation, route}) {

  const [dishesToShow, setDishesToShow] = useState([]);

  useEffect(() =>{
    getDishes().then((data)=>{
      setDishesToShow(filterSearch(data,route.params.dish))
    });
  },[])


  return (
    <View>
      <Text> {dishesToShow.length} Results for: {route.params.dish}</Text>
      <ScrollView>
      {
        dishesToShow.map((dish)=>{
          return <ResultDishCard key={dish.id} dish={dish}/>
        })
      }
      </ScrollView>
    </View>
  )
}

