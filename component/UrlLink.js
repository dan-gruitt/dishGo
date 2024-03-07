import { Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function Link({styles,website}) {
    const handleWebsitePress = () => {
        Linking.openURL(website);
    };

  return (
    <TouchableOpacity onPress={handleWebsitePress}>
        <Text
        style={[
            styles.website,
            { 
                color: "#6133f5",
                backgroundColor: "#4C5B61",
                paddingVertical: 8,
                paddingHorizontal: 16,
                color: "#FFF",
                borderRadius: 25,
                fontWeight: "bold",
                textDecorationLine: "none"
                
            },
        ]}
        >
        Website
        </Text>
    </TouchableOpacity>
  )
}