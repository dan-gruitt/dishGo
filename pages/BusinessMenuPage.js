import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import DishUploadForm from "../component/DishUploadForm";
import MenuList from "../component/MenuList";
import { getMenuByRestaurantId } from "../utils/api";

export default function BusinessMenuPage({ route }) {
  const { restaurant } = route.params;
  const [menu, setMenu] = React.useState([]);

  React.useEffect(() => {
    getMenuByRestaurantId(restaurant.id).then((menuData)=>{
      setMenu(menuData)
    })
  }, []);
  return (
    <ScrollView style={styles.container}>
      <DishUploadForm menu={menu} setMenu={setMenu} restaurant={restaurant} />
      <MenuList menu = {menu} setMenu = {setMenu} restaurant = {restaurant} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:"#4C5B61"
  }
});