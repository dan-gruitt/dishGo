import { View, Text } from 'react-native'
import { Card } from 'react-native-paper';
import React from 'react'
import { useState, useEffect } from 'react';
import { getDishImageByUrl } from '../utils/getDishImageByUrl';
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

export default function MapDishCard(props) {

    const {dish, styles} = props

    const [imgUri, setImgUri] = useState(null);

    useEffect(() => {
      if (dish && dish.img_url) {
        getDishImageByUrl(dish.img_url, "business_images", setImgUri).then(
          () => {
            console.log("imgUri retrieved");
          }
        );
      }
    }, []);

  return (
    <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.coverContainer}>
              <Card.Cover
                source={
                  imgUri
                    ? { uri: imgUri }
                    : require("../assets/tempfoodimage.jpg")
                }
                style={styles.cover}
              />
            </View>
            <View style={styles.rightSide}>
              <View style={styles.headerText}>
                <Text style={styles.title}>{dish.dish_name}</Text>
              </View>
              <View style={styles.price}>
                <Text style={styles.priceContent}>{`£${dish.price.toFixed(
                  2
                )}`}</Text>
              </View>
              {((dish.vegan || dish.vegetarian || dish.pescatarian) && (
                <View style={styles.iconContainer}>
                  {dish.vegan && (
                    <View style={styles.iconTextContainer}>
                      <Icon2 name="leaf" size={15} color="green" />
                      <Text style={styles.iconText}>Vegan</Text>
                    </View>
                  )}
                  {dish.vegetarian && (
                    <View style={styles.iconTextContainer}>
                      <Icon2 name="carrot" size={15} color="orange" />
                      <Text style={styles.iconText}>Vegetarian</Text>
                    </View>
                  )}
                  {dish.pescatarian && (
                    <View style={styles.iconTextContainer}>
                      <Icon2 name="fish" size={15} color="blue" />
                      <Text style={styles.iconText}>Pescatarian</Text>
                    </View>
                  )}
                </View>
              )) || (
                <View
                  style={[styles.iconContainer, styles.emptyIconContainer]}
                />
              )}
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{dish.description}</Text>
            </View>
          </Card.Content>
        </Card>
  )
}