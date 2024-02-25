import * as React from 'react';
import { useCallback } from 'react';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { StyleSheet, Text, Button, Image, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useFonts, OpenSans_700Bold, OpenSans_400Regular, OpenSans_300Light } from '@expo-google-fonts/open-sans';

const MyComponent = () => {
    
      const navigation = useNavigation()

      let [fontsLoaded, fontError] = useFonts({
        OpenSans_700Bold,
        OpenSans_400Regular,
        
      });
    
      if (!fontsLoaded && !fontError) {
        return null;
      }

return (
  <Appbar.Header style={styles.appBar} mode="medium">
    <View style={styles.container}>
    <View>
        <Pressable  onPress={() => navigation.navigate("LandingPage")}>
        <Image style={styles.image} source={require("../assets/dish-go-logo.png")} />
        </Pressable>
    </View>
    <View>
        <Pressable  
            style={styles.button}
            onPress={() => navigation.navigate("BusinessSignUp")}
        >
            <Text style={{ fontFamily: 'OpenSans_700Bold', fontSize: 14, color: '#FFF' }}>Partners</Text>
        </Pressable>
    </View>
    </View>

  </Appbar.Header>
)};

export default MyComponent;

const styles = StyleSheet.create({
    appBar:{
        elevation: 5,
        backgroundColor:'#FFF',
    },
    container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width:'100%',
        padding: 26,
    },
    image: {
        width: 47,
        height: 52,
    },
    button:{
        width: 93,
        height: 38,
        backgroundColor: '#3AD6A7',
        borderRadius: 29,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: '#FFF'
    }
  });
  