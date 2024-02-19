import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import SearchBar from '../component/SearchBar';


export default function SearchPage() {

  return (
    <View style={styles.container}>
      <Text>What dish are you looking for?</Text>
      <SearchBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});