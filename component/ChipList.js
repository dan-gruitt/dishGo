import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Chip } from "react-native-paper";

export default function ChipList({ setDietary, dietary }) {
  const [dietaryList, setDietaryList] = React.useState([
    { name: "vegan", icon: "leaf" },
    { name: "vegetarian", icon: "leaf-circle" },
    { name: "pescatarian", icon: "fish" },
  ]);

  const icons = {
    vegan: "leaf",
    vegetarian: "leaf-circle",
    pescatarian: "fish",
    checked: "emoticon-happy-outline",
  };

  const handleOnPress = (diet, index) => {
    setDietary(() => {
      dietary[diet.name] = !dietary[diet.name];
      return dietary;
    })
      if (dietary[diet.name] === true) {
        setDietaryList(()=>{
          const newDietaryList = [...dietaryList]
          newDietaryList[index].icon = icons.checked
          return newDietaryList
        })
      } else {
        setDietaryList(()=>{
          const newDietaryList = [...dietaryList]
          newDietaryList[index].icon = icons[diet.name]
          return newDietaryList
        })
      }
  };

  return (
    <View style={styles.chip}>
      {dietaryList.map((diet, index) => {
        return (
          <Chip
            key={index}
            icon={diet.icon}
            onPress={() => {
               return handleOnPress(diet, index);
            }}
            selected={dietary[diet.name]}
          >
            {diet.name}
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
  }
})