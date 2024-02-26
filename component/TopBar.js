import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, Image, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const MyComponent = () => {
    
      const navigation = useNavigation()

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
            onPress={() => navigation.navigate("HomePageBusiness")}
        >
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#FFF' }}>Partners</Text>
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
  