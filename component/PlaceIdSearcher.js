import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY; // never save your real api key in a snack!

const TestPlaceIdSearcher = ({setPlaceId, searcherPlaceHolder, setSearcherPlaceHolder}) => {

  return (
    <View 
    listMode="SCROLLVIEW"
    keyboardShouldPersistTaps={'handled'}>
      <GooglePlacesAutocomplete
        placeholder = {searcherPlaceHolder? searcherPlaceHolder : "Search for restaurant"}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => {
          setPlaceId(data.place_id)
          setSearcherPlaceHolder(data.description)
        }
        }
        onFail={(error) => console.error(error)}
      />
    </View>
  );
};

export default TestPlaceIdSearcher;
