import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Ionicons } from '@expo/vector-icons';

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY)

const filteredDishes = (arr,text) => {
  const newArr = arr.filter((item)=>{
    if(item.name.toLowerCase().indexOf(text.toLowerCase()) > -1){
      return item;
    }
  });
  return newArr;
}


export default function TestSearch() {
    const [input, setInput] =  useState('');
    const [dishes, setDishes] =  useState([]);
    const [filterDishes, setFilterDishes] =  useState([]);
  
  
    useEffect(()=>{
      getData()
    }, [])

    const getData = () => {
        supabase.from("test_dishes").select()
        .then(({data}) => {
            const newData = data.map((dish)=>{
                return { name: dish.dish_name, id: dish.id }
            })
            setDishes(newData);
        }).catch((error)=> {
            console.log('ERROR >>',error)
        })
    }
    
    const onChangeText = async (event) =>{
      setInput(event.nativeEvent.text);
  
      if (input.length > 1 && filteredDishes(dishes, event.nativeEvent.text).length > 0){
        setFilterDishes(filteredDishes(dishes, event.nativeEvent.text));
      } else {
        setFilterDishes([]);
      }
    }
  
// Set filtered results to [] to remove options from page
  const dishSelected = (dishName) => {
    // if (input.length > 1 && filteredDishes(dishes, dishName).length > 0){
    //   setFilterDishes(filteredDishes(dishes, dishName));
    // } else {
      setFilterDishes([]);
    // }
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
            <Text style={{fontWeight: "700"}}>{item.name}</Text>
            <Text style={{fontSize: 12}}>{item.id}</Text>
          </View>
        </View>
    )}
  
    return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
        <SafeAreaView style={{flex: 1}}>
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
          }}
        />
    
        <FlatList
          data={filterDishes}
          renderItem={({item, index}) => <Pressable onPress= {()=>{
            setInput(item.name)
            dishSelected(item.name)
            }}>
            {getItemText(item)}
          </Pressable>}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
  
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }