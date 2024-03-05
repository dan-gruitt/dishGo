import { View, Text, StyleSheet } from 'react-native'
import { Card } from "react-native-paper";
import { getDishImageByUrl } from "../utils/getDishImageByUrl";
import React from 'react'
import { useState, useEffect } from 'react';

export default function MenuCard(props) {

    const {dish, menu, styles, location} = props

    const [imgUri, setImgUri] = useState(null);

    useEffect(() => {
      if (dish && dish.img_url) {
        getDishImageByUrl(dish.img_url, "business_images", setImgUri)
      }
    }, [menu]);

  return (
    <Card style={styles.card}>
        <Card.Content style={styles.menuContainer}>
          <Card.Cover
              source={
                imgUri
                  ? { uri: imgUri }
                  : require("../assets/tempfoodimage.jpg")
              }
              style={styles.cover}
            />
          <View style={styles.dishHeader}>
            <Text style={styles.dishName}>{dish.dish_name}</Text>
            <Text style={styles.dishLocation}>{location}</Text>
            <Text style={styles.dishPrice}>£{dish.price.toFixed(2)}</Text>
          </View>
        </Card.Content>
      </Card>
  )
}