// Make relational database request for dishes and restaurants

import { ScrollView, FlatList, StyleSheet, SafeAreaView, View, Text, Item } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getDishes } from '../utils/getDishes';
import ResultDishCard from '../component/ResultDishCard';
import { filterSearch } from '../utils/filterSearch';
import { getRestaurantsById } from "../utils/getRestaurantsById";
import { getPlacesById } from "../utils/getPlacesById";

export default function ResultsPage({navigation, route}) {

  const [dishesToShow, setDishesToShow] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsPlaces, setRestaurantsPlaces] = useState([]);

  useEffect(() =>{

    getDishes().then((data)=>{
      setDishesToShow(filterSearch(data,route.params.dish));
      return filterSearch(data,route.params.dish)
    })
    .then((data)=>{
      const restaurantsIds = data.map((restaurant)=> {
        return restaurant.restaurant_id
      });

      return getRestaurantsById(restaurantsIds).then((response) => { 
        setRestaurants(response.data);

        // Adding key to existing state
        response.data.forEach((restaurant)=>{
          setDishesToShow((dishes)=>{
              dishes.forEach((dish)=>{
                if(dish.restaurant_id === restaurant.id){
                  dish.restaurant_info = restaurant;
                }
              });
            return data;
          });
        })


        return response.data;
      });

    })
    .then((data) => {

        data.map((restaurant) => {
          getPlacesById(restaurant.place_id).then((response) => {
            setRestaurantsPlaces([...restaurantsPlaces,response.data.result])
          })
        });
    })

  },[])

console.log('DISHES >>', dishesToShow)

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

