import { View, StyleSheet} from "react-native";
import React from "react";
import { Button, Card, Text} from "react-native-paper";
import { deleteDishByDishId } from "../utils/api";
import { getMenuByRestaurantId } from "../utils/api";
import ConfirmDeletePopUp from "./ConfirmDeletePopUp";
import ImageThumbnail from "./ImageThumbnail";

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
            <Card key={index} style={{marginBottom:16}} contentStyle={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <View>
                <ImageThumbnail item={item} />
                </View>
                <View>
                {/* <Card.Title
                  style={styles.cardTitle}
                  title={item.dish_name}
                  subtitle={`£${item.price.toFixed(2)}`}
                /> */}
                <Text style={styles.cardTitle}>{item.dish_name}</Text>
                <Text style={styles.cardPrice}>{`£${item.price.toFixed(2)}`}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                </View>

              </Card.Content>
              {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
              <Card.Actions>
                <Button
                     textColor="#4C5B61"
                     buttonColor="#FFF"
                  style={styles.deleteDishButton}
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

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#4C5B61", 
    paddingHorizontal:26,
  },
  cardTitle:{
    color:"#4C5B61",
    textAlign: "right",
    fontWeight:"bold",
    marginBottom: 6,
    fontSize: 14
  },
  cardPrice:{
    color:"#4C5B61",
    textAlign: "right",
    fontSize: 14
  },
  cardDescription:{
    color:"#4C5B61",
    fontSize: 12
  },
  card:{
    backgroundColor:"#FFF",
    borderRadius: 8,
  },
  cardContent:{
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-around"
  },
  deleteDishButton:{
    width: 139,
    height: 48,
    borderRadius: 29,
    borderColor: "#4C5B61", 
    borderWidth: 1, 
    marginTop:20
  }
})