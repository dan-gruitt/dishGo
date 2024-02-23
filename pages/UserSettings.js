import { View, Text } from 'react-native'
import React from 'react'
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function UserSettings() {

  const { user: user } = useContext(UserContext);

  return (
<>
      <Text>Hello {user.id} from user settings</Text>
   
    </>
  )
}