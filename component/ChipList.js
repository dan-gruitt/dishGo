import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ChipList({setDietary, dietary }) {
  const dietaryNames = Object.keys(dietary)

  const icons = {
    vegan: "leaf",
    vegetarian: "carrot",
    pescatarian: "fish",
    checked: "check",
  };

  const handleOnPress = (name) => {
    setDietary(() => {
      const newDietary = {...dietary}
      newDietary[name] = !newDietary[name];
      return newDietary;
    })
  };

  return (
    <View style={styles.chip}>
      {dietaryNames.map((name, index) => {
        return (
          <Chip
            key={index}
            icon={dietary[name]? icons.checked : icons[name]}
            style = {dietary[name]? styles.selected : null}
            onPress={() => {
               return handleOnPress(name);
            }}
            selected={dietary[name]}
          >
            {name}
          </Chip>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:"center",
    margin: 10,
    gap: 10
  },
  selected:{
    backgroundColor: "green",
  }
})