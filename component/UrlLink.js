import { Text, TouchableOpacity, Linking } from "react-native";
import React from "react";

export default function Link({ styles, website, text }) {
  const handleWebsitePress = () => {
    Linking.openURL(website);
  };

  return (
    <TouchableOpacity onPress={handleWebsitePress}>
      <Text style={{      paddingVertical: 10,
      paddingHorizontal: 16,       fontWeight: "bold",
     borderRadius: 25,...styles}}>{text}</Text>
    </TouchableOpacity>
  );
}
