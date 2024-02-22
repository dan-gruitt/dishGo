import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Ionicons } from '@expo/vector-icons';
import { getDishes } from '../utils/getDishes';
import { filterSearch } from '../utils/filterSearch';

export default function TestSearch({setUserSearch}) {
    const [input, setInput] =  useState('');
    const [dishes, setDishes] =  useState([]);
    const [filterDishes, setFilterDishes] =  useState([]);
  
  useEffect(() =>{
    getDishes().then((data)=>{
      setDishes(data);
    });
  },[])
 
    const onChangeText = async (event) =>{
      setInput(event.nativeEvent.text);
      setUserSearch(event.nativeEvent.text)

      if (input.length > 1 && filterSearch(dishes, event.nativeEvent.text).length > 0){
        setFilterDishes(filterSearch(dishes, event.nativeEvent.text));
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
        <View style={{ 
            flexDirect:"row", 
            alignItems:"center", 
            paddingTop:12 , 
            marginHorizontal: 12,
            marginVertical: 12,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
        }}>
          <Ionicons name="search" size={24} color="black" />
          <View>
            <Text style={{fontWeight: "700"}}>{item.dish_name}</Text>
            <Text style={{fontSize: 12}}>{item.id}</Text>
          </View>
        </View>
    )}
  
    return (
      <><TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={{ marginLeft: 12, marginVertical: 5, fontSize: 18 }}>
            Search Dishes</Text>
          <TextInput
            placeholder='Find Dish'
            value={input}
            onChange={onChangeText}
            style={{
              height: 40,
              marginHorizontal: 12,
              marginVertical: 12,
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 5,
            }} />

          <FlatList
            data={filterDishes}
            renderItem={({ item, index }) => <Pressable onPress={() => {
              setInput(item.dish_name);
              dishSelected(item.dish_name);
            } }>
              {getItemText(item)}
            </Pressable>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false} />

        </SafeAreaView>
      </TouchableWithoutFeedback></>
    )
  }