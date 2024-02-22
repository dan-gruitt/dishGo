import { View, Text } from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";

export default function MenuList(props) {
  const {menu} = props

  return (
    menu.length === 0 ? null : menu.map((item, index)=>{
      return (
        <Card key ={index}>
          <Card.Title
            title={item.dish_name}
            subtitle={item.price}
          />
          <Card.Content>
            <Text>Description</Text>
            <Text>{item.description}</Text>
          </Card.Content>
          {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
          {/* <Card.Actions>
            <Button>Delete</Button>
            <Button>Edit</Button>
          </Card.Actions> */}
        </Card>
      )
    })
  );
}

