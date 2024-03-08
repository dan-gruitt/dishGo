import { View, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import { deleteDishByDishId } from "../utils/api";
import { getMenuByRestaurantId } from "../utils/api";
import ConfirmDeletePopUp from "./ConfirmDeletePopUp";
import MenuCard from "./MenuCard";
import { Ionicons } from '@expo/vector-icons';

export default function MenuList(props) {
  const { menu, setMenu, restaurant } = props;
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);

  const handlePopUp = (item) => {
    setItemToDelete(item)
    setIsDialogVisible(true);
  }

  const handleDelete = (dishId) => {
    setIsDialogVisible(false);
    setIsDeleting(true);
    deleteDishByDishId(dishId).then(() => {
      getMenuByRestaurantId(restaurant.id).then((data) => {
        setMenu(data);
        setIsDeleting(false);
      });
    });
  };

  return (
    <>
<ConfirmDeletePopUp isDialogVisible ={isDialogVisible} setIsDialogVisible = {setIsDialogVisible} isDeleting = {isDeleting} handleDelete = {handleDelete} itemToDelete = {itemToDelete}/>
    <View style={styles.container}>
      {menu.map((item, index) => {
      return (
        <View  key={index}>
        <MenuCard dish={item} menu={menu} style ={styles} details = {item.description}></MenuCard>
                <TouchableOpacity
                  style={styles.deleteDishButton}
                  onPress={() => { 
                    handlePopUp(item)}}
                  disabled={isDeleting}
                >
                              <Ionicons color={'#DC143C'} name="trash-outline" size={20} />
                </TouchableOpacity>
</View>
        );
      })}</View></>
  )
}

const styles = StyleSheet.create({

  container:{
    paddingHorizontal:26,
  },
  card:{
    backgroundColor: "#fff",
  },
  cardTitle:{
    color:"#4C5B61",
    textAlign: "right",
    fontWeight:"bold",
    marginBottom: 6,
    fontSize: 14
  },
  deleteDishButton:{
    width: 40,
    height: 40,
    borderRadius: 29,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  }
})