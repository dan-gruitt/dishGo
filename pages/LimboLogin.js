import { View, Text } from "react-native";
import React from "react";
import Auth from "../component/Auth";

export default function LimboLogin() {
  return (
    <>
      <View>
        <Text>You must log in to see this page</Text>
      </View>
      <View>
        <Auth></Auth>
      </View>
    </>
  );
}
