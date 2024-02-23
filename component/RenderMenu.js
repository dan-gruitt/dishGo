import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const RenderMenu = ({ menu, styles }) => {
    return menu.map((dish, index) => (
      <Card key={index} style={styles.card}>
        <Card.Content style={styles.menuContainer}>
          <View style={styles.dishHeader}>
            <Text style={styles.dishName}>{dish.dish_name} - £{dish.price}</Text>
          </View>
          <Text style={styles.dishDescription}>{dish.description}</Text>
          {(dish.vegan || dish.vegetarian || dish.pescatarian) && ( // Render iconContainer only if at least one dietary flag is true
            <View style={styles.iconContainer}>
              {dish.vegan && (
                <View style={styles.iconTextContainer}>
                  <Icon name="leaf" size={20} color="green" />
                  <Text style={styles.iconText}>Vegan</Text>
                </View>
              )}
              {dish.vegetarian && (
                <View style={styles.iconTextContainer}>
                  <Icon name="carrot" size={20} color="orange" />
                  <Text style={styles.iconText}>Vegetarian</Text>
                </View>
              )}
              {dish.pescatarian && (
                <View style={styles.iconTextContainer}>
                  <Icon name="fish" size={20} color="blue" />
                  <Text style={styles.iconText}>Pescatarian</Text>
                </View>
              )}
            </View>
          )}
          <Card.Cover
            source={{
              uri: dish.img_url
                ? dish.img_url
                : "https://livingstonbagel.com/wp-content/uploads/2016/11/food-placeholder.jpg",
            }}
            style={styles.cover}
          />
        </Card.Content>
      </Card>
    ));
  };

export default RenderMenu;
