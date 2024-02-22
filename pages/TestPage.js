import { View, Text } from "react-native";
import React from "react";
import NavBar from "../component/NavBar";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


export default function TestPage() {
  const { user: user } = useContext(UserContext);

  if (!user) {
    return <Text>There is no user!</Text>;
  }

  return (
    <>
      <Text>Hello {user.id} from the settings page!</Text>
      <NavBar />
    </>
  );
}
