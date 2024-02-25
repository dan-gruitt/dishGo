import { View, Button, Text, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import setUserContext from '../utils/setUserContext';
import { UserContext } from '../context/UserContext';
import { supabase } from '../lib/supabase'

export default function LandingPage({ navigation }) {
  
  const { user, setUser } = useContext(UserContext)
  setUserContext()
  
  return (
    <>
      <View style={styles.buttons}>
        <Button
          title="DEV Add Restaurants Page"
          onPress={() => navigation.navigate("AddRestaurantPage")}
        />

    { user ? 
            <Button
            title="Add Menu"
            onPress={() => navigation.navigate("BusinessSignUp")}
          />
          :
          <Button
          title="Partners"
          onPress={() => navigation.navigate("BusinessSignUp")}
        />
    }


        <View style={styles.imgWrap}>
          <Image style={styles.image} source={require("../assets/food.jpeg")} />
        </View>

        <Button
          title="Lets Go"
          onPress={() => navigation.navigate("SearchPage")}
        />

        <Button
          title="Sign Up!"
          onPress={() => navigation.navigate("BusinessSignUp")}
        />

        <Button
          title="DEV Test Page"
          onPress={() => navigation.navigate("TestPage")}
        />


        <Button
          title="Sign Out"
          onPress={() => {
            supabase.auth.signOut()
            setUser(null)
          }}
        />

        <Text onPress={() => navigation.navigate("Faq")}>
          How does it work?
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imgWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    borderRadius: 350 / 2,
    overflow: "hidden",
    marginTop: 50,
    marginBottom: 50,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:"center",
    margin: 10,
    gap: 10,
  }
});

});

