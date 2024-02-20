import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import SearchBar from '../component/SearchBar';
import TestSearch from '../component/TestSearch';

export default function SearchPage() {
  
  return (
    <TestSearch />
    // <View style={styles.container}>
    //   <Text>What dish are you looking for?</Text>
    //   <SearchBar />
    // </View>
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