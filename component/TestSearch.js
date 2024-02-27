import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { getDishes } from '../utils/getDishes';
import { filterSearch } from '../utils/filterSearch';

import { Searchbar, Surface } from 'react-native-paper';


export default function TestSearch({setUserSearch}) {
    const [input, setInput] =  useState('');
    const [dishes, setDishes] =  useState([]);
    const [filterDishes, setFilterDishes] =  useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
  
  useEffect(() =>{
    getDishes().then((data)=>{
      setDishes(data);
    });
  },[])
 
  const onChangeText = async (e) =>{
    setSearchQuery(e)
    setUserSearch(e)
    if (searchQuery.length > 1 && filterSearch(dishes, searchQuery).length > 0){
      setFilterDishes(filterSearch(dishes, searchQuery));
    } else {
      setFilterDishes([]);
    }
  }

// Set filtered results to [] to remove options from page
  const dishSelected = (dishName) => {
    setFilterDishes([]);
    setUserSearch(dishName)
  }
  
    const getItemText = (item) =>{
      return (
        <Surface style={styles.surface} elevation={1}>
        {/* <View style={{ 
            flexDirect:"row", 
            alignItems:"center", 
            paddingTop:12 , 
            marginHorizontal: 12,
            marginVertical: 12,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
        }}> */}
          {/* <Ionicons name="search" size={24} color="black" /> */}
          {/* <View> */}
            <Text style={{fontWeight: "700"}}>{item.dish_name}</Text>
            {/* <Text style={{fontSize: 12}}>{item.id}</Text> */}
          {/* </View> */}
        {/* </View> */}
         
         
      </Surface>
    )}
  
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <Searchbar
            fontWeight="bold"
            placeholderTextColor="#A9A9AC"
            mode="bar"
            elevation={1}
            iconColor="#3AD6A7"
            placeholder='Find Dish'
            onChangeText={onChangeText}
            value={searchQuery}
            style={{
              marginHorizontal: 26,
              marginVertical: 26,
              color:'#FFF'
            }} />

          <FlatList
            data={filterDishes}
            renderItem={({ item, index }) => <Pressable onPress={() => {
              setSearchQuery(item.dish_name);
              dishSelected(item.dish_name);
            } }>
              {getItemText(item)}
            </Pressable>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} />

        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }




const styles = StyleSheet.create({
  surface: {
    // width: "100%",
    padding: 8,
    // height: 80,
    // width: 80,
    marginBottom: 12,
    marginHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
});