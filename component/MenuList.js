import { View, Text } from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";

export default function MenuList() {
  return (
    <View>
      <Text>MenuList</Text>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
        />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

