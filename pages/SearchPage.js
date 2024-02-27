
import * as React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import  SearchBar  from '../component/SearchBar';

export default function SearchPage({navigation}) {
  const [userSearch, setUserSearch] = useState('');

  return (<View style={styles.container}>
      <View>
        <Image style={styles.image} source={require("../assets/white-disgo.png")} />
      </View>
      <View style={styles.headerWrap}>
        <Text style={styles.headerText}>What are you in the mood for?</Text>
      </View>
     
      <SearchBar 
        style={styles.searchField}
        setUserSearch={setUserSearch} 
        userSearch={userSearch}
      />
   
      {/* <Button 
        style={styles.searchButton}
        mode="elevated" 
        onPress={() => {
          navigation.navigate('ResultsPage', {dish: userSearch})
        }}
        > <Text style={styles.searchButtonText} > Feed Me </Text> </Button> */}
     
  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: "#3AD6A7"
  },
  image: {
    width: 70,
    height: 78,
    overflow: "hidden",
    marginTop: 32,
    marginBottom: 32,
  },
  headerWrap:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText:{
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    width: 260
  },
  searchButton: {
    width: 139,
    height: 57,
    backgroundColor: '#4C5B61',
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  searchButtonText:{
    color: '#FFF',
    fontWeight: 'bold', 
    fontSize: 18,
  }
});



