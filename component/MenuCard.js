import { View, Text, StyleSheet, Image } from 'react-native'
import { getDishImageByUrl } from "../utils/getDishImageByUrl";
import React from 'react'
import { useState, useEffect } from 'react';

export default function MenuCard(props) {

    const {dish, menu, location} = props

    const [imgUri, setImgUri] = useState(null);

    useEffect(() => {
      if (dish && dish.img_url) {
        getDishImageByUrl(dish.img_url, "business_images", setImgUri)
      }
    }, [menu]);

  return (
    <View style={styles.card}>
                <Image
              source={
                imgUri
                  ? { uri: imgUri }
                  : require("../assets/tempfoodimage.jpg")
              }
              style={styles.image}
            />
        <View style={styles.detailsContainer}>

          <View style={styles.dishHeader}>
            <Text style={styles.dishName}>{dish.dish_name}</Text>
            <Text style={styles.dishDescription}>{location}</Text>
          </View>
          <Text style={styles.dishPrice}>£{dish.price.toFixed(2)}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4C5B61",
    marginBottom: 15,
    borderRadius:31,
    height: 150,
  },
  image: {
    flex: 1.3,
    width: 180,
    height: 150,
    borderRadius:31
  },
  detailsContainer:{
    flex: 1,
    justifyContent: 'space-between',
    height: 150,
    padding: 20,
    paddingLeft: 10,
  },
  dishHeader: {
    display:"flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
  },
  dishName: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right",
    color: "#FFF",

  },
  dishDescription:{
    fontSize: 13,
    // fontWeight: "bold",
    textAlign: "right",
    color: "#FFF",
    marginVertical: 10,
  },
  dishPrice:{
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "right",
    color: "#FFF",
  },

})