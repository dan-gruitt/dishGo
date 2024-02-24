import { View} from "react-native";
import React from "react";
import { Button, Card, Text} from "react-native-paper";
import { deleteDishByDishId } from "../utils/api";
import { getMenuByRestaurantID } from "../utils/api";
import ConfirmDeletePopUp from "./ConfirmDeletePopUp";

export default function MenuList(props) {
  const { menu, setMenu, restaurant } = props;
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);

  const handlePopUp = (item) => {
    console.log(itemToDelete)
    setItemToDelete(item)
    setIsDialogVisible(true);
  }

  const handleDelete = (dishId) => {
    setIsDialogVisible(false);
    setIsDeleting(true);
    deleteDishByDishId(dishId).then(() => {
      getMenuByRestaurantID(restaurant.id).then((data) => {
        setMenu(data);
        setIsDeleting(false);
      });
    });
  };

  return (
    <>
<ConfirmDeletePopUp isDialogVisible ={isDialogVisible} setIsDialogVisible = {setIsDialogVisible} isDeleting = {isDeleting} handleDelete = {handleDelete} itemToDelete = {itemToDelete}/>
    <View>
      {menu.map((item, index) => {
      return (
            <Card key={index}>
              <Card.Title
                title={item.dish_name}
                subtitle={`£${item.price.toFixed(2)}`}
              />
              <Card.Content>
                <Text>{item.description}</Text>
              </Card.Content>
              {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
              <Card.Actions>
                <Button
                  onPress={() => { 
                    handlePopUp(item)}}
                  disabled={isDeleting}
                >
                  Delete
                </Button>
                {/* <Button>Edit</Button> */}
              </Card.Actions>
            </Card>
        );
      })}</View></>
  )
}