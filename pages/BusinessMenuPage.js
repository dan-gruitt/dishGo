import { View, Text, ScrollView } from "react-native";
import React from "react";
import DishUploadForm from "../component/DishUploadForm";
import MenuList from "../component/MenuList";
import { getMenuByRestaurantID } from "../utils/api";

export default function BusinessMenuPage({ route }) {
  const { restaurant } = route.params;
  const [menu, setMenu] = React.useState([]);

  React.useEffect(() => {
    getMenuByRestaurantID(restaurant.id);
    //? .then() for logged in user to render existing menu
  }, []);
  return (
    <ScrollView>
      <DishUploadForm menu={menu} setMenu={setMenu} restaurant={restaurant} />
      <MenuList menu = {menu} setMenu = {setMenu} restaurant = {restaurant} /> 
    </ScrollView>
  );
}
