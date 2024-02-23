import { View, Text } from "react-native";
import React from "react";
import useState from 'react'
import { Button, Card } from "react-native-paper";
import { deleteDishByDishId } from "../utils/api";
import { getMenuByRestaurantID } from "../utils/api";

export default function MenuList(props) {
  const {menu, setMenu, restaurant} = props

  console.log(menu)
  
  const handleDelete = (dishId) => {
     deleteDishByDishId(dishId).then(() => {
      getMenuByRestaurantID(restaurant.id).then((data) => {
        setMenu(data)
      });
     })
  }

  return (
    menu.length === 0 ? null : menu.map((item, index)=>{
      return (
        <Card key ={index}>
          <Card.Title
            title={item.dish_name}
            subtitle={`£${item.price.toFixed(2)}`}
          />
          <Card.Content>
            <Text>Description</Text>
            <Text>{item.description}</Text>
          </Card.Content>
          {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
          <Card.Actions>
            <Button onPress={() => handleDelete(item.id)}>Delete</Button>
            {/* <Button>Edit</Button> */}
          </Card.Actions>
        </Card>
      )
    })
  );
}

