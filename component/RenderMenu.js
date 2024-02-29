import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MenuCard from "./MenuCard";

export const RenderMenu = ({ location, menu, styles }) => {
  console.log(menu)

    return menu.map((dish, index) => (
      <MenuCard dish={dish} key={index} menu={menu} styles ={styles} location = {location}></MenuCard>

      ));
  };

export default RenderMenu;
