import { View, StyleSheet } from "react-native";
import React from "react";
import { HelperText, TextInput, Button, Text, List} from "react-native-paper";
import ChipList from "./ChipList";
import ImageUploader from "./ImageUploader";
import { dishSchema } from "../validation/DishValidation";
import { postDishByRestaurantId } from "../utils/api";

export default function DishUploadForm(props) {

  const { restaurant, menu, setMenu } = props;

  const [dishName, setDishName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState(null)

  const [expanded, setExpanded] = React.useState(false);


  const [dietary, setDietary] = React.useState({
    vegan: false,
    vegetarian: false,
    pescatarian: false,
  })

  async function handleSubmit(){

    const formInput = {
      dishName: dishName,
      description: description,
      price: price,
    };

    try{
      await dishSchema.validate(formInput, {abortEarly: false})
      setErrors(null)
      submitDish();
    } catch (error) {
      const newError = {}
      error.inner.forEach((err)=>{
        newError[err.path] = err.message
      })
      setErrors(newError)
    }

  }

  function submitDish(){
    setIsSubmitting(true)
    postDishByRestaurantId(dishName, description, price, dietary, restaurant.id, imgUrl)
    .then((dishData)=>{
      setExpanded(false)
      const newDish = dishData
      setMenu(() => {
        const updatedMenu = [newDish, ...menu]
        return updatedMenu
      })
      setDishName("")
      setDescription("")
      setPrice("")
      setImgUrl("")
      setDietary({
        vegan: false,
        vegetarian: false,
        pescatarian: false,
      })
      setIsSubmitting(false)
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      <List.Section style={styles.accordionContainer} title="">
      <List.Accordion 
        expanded={expanded}
        onPress={()=>{
          setExpanded(!expanded)
        }}
        style={styles.accordionButton} 
        titleStyle={styles.accordionTitle}
        title={"Add New Dish"}
        right={props => <List.Icon color='#fff' icon="plus" />}
        >
        <View style={styles.formView}>
        <ImageUploader restaurant={restaurant} setImgUrl = {setImgUrl} imgUrl = {imgUrl} />

      <Text style={styles.inputLabels}>Dish Name</Text>
      <TextInput
        underlineColor="#FFF"
        activeUnderlineColor="#3AD6A7"
        style={styles.inputsBody}
        contentStyle={styles.inputs}
        placeholderTextColor="#A9A9AC"
        label=""
        mode="flat"
        // label="Name of dish"
        value={dishName}
        onChangeText={(dishName) => setDishName(dishName)}
        // mode="outlined"
      />
      {!errors ? null : Object.hasOwn(errors, 'dishName') ? <HelperText style={styles.errorMsg} type="error">
        {errors.dishName}
      </HelperText> : null}

      <Text style={styles.inputLabels}>Description</Text>
      <TextInput
        underlineColor="#FFF"
        activeUnderlineColor="#3AD6A7"
        style={styles.inputsBody}
        contentStyle={styles.inputsMultiline}
        placeholderTextColor="#A9A9AC"
        label=""
        mode="flat"
        // label="Description"
        value={description}
        onChangeText={(description) => setDescription(description)}
        // mode="outlined"
        numberOfLines={3}
        multiline={true}
        maxLength={250}
      />
      {!errors ? null : Object.hasOwn(errors, 'description') ? <HelperText style={styles.errorMsg} type="error">
        {errors.description}
      </HelperText> : null}

      <Text style={styles.inputLabels}>Price (£)</Text>
    <TextInput
        underlineColor="#FFF"
        activeUnderlineColor="#3AD6A7"
        style={styles.inputsBody}
        contentStyle={styles.inputPrice}
        placeholderTextColor="#A9A9AC"
        label=""
        mode="flat"
        // label="£ Price"
        placeholder="0.00"
        value={price}
        onChangeText={(price) => setPrice(price)}
        // mode="outlined"
        keyboardType="numeric"
        left={<TextInput.Affix text="£"/>}
      />
      {!errors ? null : Object.hasOwn(errors, 'price') ? <HelperText style={styles.errorMsg} type="error">
        {errors.price}
      </HelperText> : null}
      <ChipList setDietary={setDietary} dietary={dietary}></ChipList>

      <View style={styles.buttonWrap}>
      <Button
             textColor="#FFF"
             buttonColor="#3AD6A7"
      style={styles.mainButton}
      onPress={() => handleSubmit()}
      disabled = {isSubmitting}
      >
    <Text style={styles.mainButtonText} >Add dish</Text>
    </Button>
      </View>
      <HelperText type="error" style={styles.errorMsg} visible={errors}>
        Unable to submit form - invalid input(s)
      </HelperText>

        </View>

      </List.Accordion>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    paddingHorizontal:26,
    paddingVertical: 26,
  },
  accordionContainer: {
    border:"#4C5B61",
    marginTop: 10,
   }
  ,
  accordionButton:{
    backgroundColor:"#4C5B61", 
    borderWidth:1, 
    borderColor: '#3AD6A7',
  },
  accordionTitle:{
    color: "#FFF",
    fontWeight:"bold",
  },
  formView:{
    marginTop: 10
  },
  inputsBody:{
    borderColor:"#FFF", 
    borderWidth: 1, 
    borderRadius: 5, 
    overflow:"hidden", 
    backgroundColor: "#FFF",
    marginBottom: 10
  },
  inputs:{
    backgroundColor: "#FFF",
    color: "#4C5B61",
    height: 52,
  },
  inputLabels:{
    fontWeight:600,
    color:"#FFF",
    fontSize: 14,
    marginTop: 0,
    marginBottom: 10
  },
  inputsMultiline:{
    backgroundColor: "#FFF",
    color: "#4C5B61",
    height: 82
  },
  inputPrice:{
    backgroundColor: "#FFF",
    color: "#4C5B61",
marginLeft: 5
  },
  errorMsg:{
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C54E65",
    backgroundColor: '#EFD2D8',
  },
  mainButton: {
    width: 90,
    backgroundColor: '#3AD6A7',
    borderRadius: 29,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainButtonText:{
    color: '#FFF',
    fontWeight: 'bold', 
    fontSize: 14,
  },
  buttonWrap:{
    display:"flex",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  }
  
})