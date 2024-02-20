import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import LandingPage from "./pages/LandingPage";
import AddRestaurantPage from "./pages/AddRestaurantPage";
import ResultsPage from "./pages/ResultsPage";
import SearchPage from "./pages/SearchPage";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
    <NavigationContainer>
     
        <Stack.Navigator>
          <Stack.Screen
            name="LandingPage"
            component={LandingPage}
            options={{ title: "Landing Page" }}
          />
          <Stack.Screen
            name="AddRestaurantPage"
            component={AddRestaurantPage}
            options={{ title: "Add restaurant page" }}
          />
          <Stack.Screen
            name="ResultsPage"
            component={ResultsPage}
            options={{ title: "Result Page" }}
          />
          <Stack.Screen
            name="SearchPage"
            component={SearchPage}
            options={{ title: "Search Page" }}
          />
        </Stack.Navigator>
      
    </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
