import { View, Text, ScrollView } from "react-native";
import React from "react";
import DishUploadForm from "../component/DishUploadForm";
import MenuList from "../component/MenuList";
import { getMenuByRestaurantId } from "../utils/api";

export default function BusinessMenuPage({ route }) {
  const { restaurant } = route.params;
  const [menu, setMenu] = React.useState([]);

  React.useEffect(() => {
    getMenuByRestaurantId(restaurant.id).then((menuData)=>{
      console.log('loading menu')
      setMenu(menuData)
    })
  }, []);
  return (
    <ScrollView>
      <DishUploadForm menu={menu} setMenu={setMenu} restaurant={restaurant} />
      <MenuList menu = {menu} setMenu = {setMenu} restaurant = {restaurant} /> 
    </ScrollView>
  );
}
