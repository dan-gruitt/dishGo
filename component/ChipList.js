import { View, Text } from "react-native";
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

  const handleOnPress = (diet) => {
    setDietary(() => {
      dietary[diet.name] = !dietary[diet.name];
      return dietary;
    });

    // if (dietary[diet.name] === false) {
    //   setDietaryList(() => {
    //     dietary[diet.icon] = icons[diet.name];
    //     return dietary
    //   });
    // }

    // if (dietary[diet.name] === true) {
    //   setDietaryList(() => {
    //     dietary[diet.icon] = icons.checked;
    //     return dietary
    //   });
    // }
  };

  return (
    <View>
      {dietaryList.map((diet, index) => {
        return (
          <Chip
            key={index}
            icon={diet.icon}
            onPress={() => {
               return handleOnPress(diet);
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
