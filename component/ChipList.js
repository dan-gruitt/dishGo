import { View, StyleSheet } from "react-native";
import React from "react";
import { Chip } from "react-native-paper";

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
          selectedColor="#FFF"
            key={index}
            icon={dietary[name]? icons.checked : icons[name]}
            style = {dietary[name]? styles.selected : styles.unSelected }
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
    marginTop: 30,
    marginBottom:20,
    gap: 10
  },
  selected:{
    backgroundColor: "#3AD6A7",
    borderWidth: 1,
    borderColor:"#3AD6A7",
  },
  unSelected:{
    backgroundColor: "#4C5B61",
    borderWidth: 1,
    borderColor:"#3AD6A7",
  }
})