
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import SearchBar from '../component/SearchBar';
import TestSearch from '../component/TestSearch';
import { Button } from 'react-native-paper';

export default function SearchPage({navigation}) {
  const [userSearch, setUserSearch] = useState('');

  return (<>
      <TestSearch setUserSearch={setUserSearch} />
     {/* <View style={styles.container}>
       <Text>What dish are you looking for?</Text>
       <SearchBar />
     </View> */}
    <Button icon="magnify" mode="contained" onPress={() => {
      navigation.navigate('ResultsPage', {dish: userSearch})
      }}> Feed Me!
    </Button>
  </>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});



