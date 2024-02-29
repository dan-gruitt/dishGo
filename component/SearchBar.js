import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { getDishesName } from '../utils/getDishes';
import { filterSearch } from '../utils/filterSearch';
import { List } from 'react-native-paper';
import { Searchbar, Surface } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";



export default function SearchBar({userSearch, setUserSearch}) {
    const navigation = useNavigation();
    const [input, setInput] =  useState('');
    const [dishes, setDishes] =  useState([]);
    const [filterDishes, setFilterDishes] =  useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
  
  useEffect(() =>{
    getDishesName().then((data)=>{
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

  const dishSelected = (dishName) => {
    setFilterDishes([]);
    setUserSearch(dishName)
    navigation.navigate('ResultsPage', {dish: dishName})
  }
  
    const getItemText = (item, index) =>{
     
      return (
        <View  style={[styles.listItem, index % 2 === 0 ? styles.oddItem : styles.evenItem]}>
            <List.Icon color="#A6A6A6" icon="magnify" />
            <Text style={styles.listText}>{item.dish_name}</Text>
        </View>
    )}
  
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={{ 
          // flex: 1, 
          // width: "100%" 
          }}>
            <Searchbar
                onSubmitEditing={(event) => { navigation.navigate('ResultsPage', {dish: userSearch}) }}
                fontWeight="bold"
                placeholderTextColor="#A9A9AC"
                mode="bar"
                elevation={3}
                iconColor="#3AD6A7"
                placeholder='Find Dish'
                onIconPress={()=>{ navigation.navigate('ResultsPage', {dish: userSearch}) }}
                onClearIconPress={()=>{ setFilterDishes([]) }}
                onChangeText={onChangeText}
                value={searchQuery}
                style={{
                marginHorizontal: 26,
                marginTop: 26,
                color:'#FFF',
                zIndex: 10,
                backgroundColor:'#FFFFFF',
                }} />

                {
                    filterDishes.length > 0 ?
                    <Surface style={styles.surface} elevation={0}>
                    <FlatList
                        data={filterDishes}
                        renderItem={({ item, index }) => <Pressable onPress={() => {
                        setSearchQuery(item.dish_name);
                        dishSelected(item.dish_name);
                        } }>
                        {getItemText(item,index)}
                        </Pressable>}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={true} 
                    />
                </Surface>
                    : null
                }

        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }

const styles = StyleSheet.create({
  surface: {
    marginTop: -56,
    paddingTop: 60,
    marginBottom: 110,
    marginHorizontal: 26,
    alignItems: 'left',
    justifyContent: 'center',
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor:'#FFFFFF',
  },
  listItem:{
    padding: 12,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
  },
  listText:{
    paddingLeft: 16,
    fontWeight: "bold",
    color: "#A6A6A6",
  },
  evenItem:{
    backgroundColor: "#EBFCF6"
  }
});