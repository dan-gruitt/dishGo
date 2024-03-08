import { StyleSheet } from "react-native";
import React from "react";
import MenuCard from "./MenuCard";

export const RenderMenu = ({ location, menu }) => {
  
    return menu.map((dish, index) => (
      <MenuCard dish={dish} key={index} menu={menu} style ={styles} details = {location} ></MenuCard>

      ));
  };

  const styles = StyleSheet.create({
    card:{
      backgroundColor: '#4C5B61'
    },
    dishPrice:{
      color: "#FFF",
    },
    dishDescription:{
      color: "#FFF",
    },
    dishName:{
      color: "#FFF",
    }
  })

export default RenderMenu;
