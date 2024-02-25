import { View, Button, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import setUserContext from '../utils/setUserContext';
import { UserContext } from '../context/UserContext';
import { supabase } from '../lib/supabase'


export default function LandingPage({ navigation }) {
  
  const { user, setUser } = useContext(UserContext)
  setUserContext()
  
  return (

      <View style={styles.mainContainer}>


        <View style={styles.imgWrap}>
          <Image style={styles.image} source={require("../assets/landing-image.png")} />
        </View>

      <View style={styles.introButton}>
      
                <Pressable  
                    style={styles.button}
                    onPress={() => navigation.navigate("HomePage")}
                >
                    <Text style={{ fontFamily: 'OpenSans_700Bold', fontSize: 18, color: '#FFF' }}>Lets Go!</Text>
                </Pressable>
          
        <Pressable  
            style={styles.button}
            onPress={() => navigation.navigate("BusinessSignUp")}
        >
            <Text style={{ fontFamily: 'OpenSans_700Bold', fontSize: 18, color: '#FFF' }}>Sign Up</Text>
        </Pressable>
    
      </View>

        {/* <Button
          title="DEV Test Page"
          onPress={() => navigation.navigate("TestPage")}
        />
        <Button
          title="DEV Test Home Page"
          onPress={() => navigation.navigate("HomePage")}
        />
        <Button
          title="DEV Add Restaurants Page"
          onPress={() => navigation.navigate("AddRestaurantPage")}
        /> */}
        <View style={styles.faqView}>
          <Pressable  style={styles.faqButton}>
            <Text 
            style={{ fontFamily: 'OpenSans_700Bold', fontSize: 15, color: '#FFF' }}
            onPress={() => navigation.navigate("Faq")}>
                How does it work?
            </Text>
          </Pressable>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  imgWrap: {
    display: "flex",
    marginTop: 112,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 336,
    height: 336,
    overflow: "hidden",
    marginBottom: 100,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#FFF',
    justifyContent: "space-between", // Adjust mainContainer to justify content between its children
  },
  introButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 26,
    marginBottom: 100,
  },
  button: {
    width: 139,
    height: 57,
    backgroundColor: '#4C5B61',
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: '#FFF'
  },
  faqView: {
    width: '100%',
    height: 60,
    backgroundColor: '#3AD6A7',
  },
  faqButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%', // Set height to fill the container
  }
});


