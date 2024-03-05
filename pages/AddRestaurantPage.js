import {ScrollView, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback} from 'react-native'
import React from "react";
import { Text, TextInput, Button, HelperText, Card } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { postRestaurant, patchRestaurantById } from "../utils/api";
import Icon from 'react-native-vector-icons/FontAwesome';
// import { ScrollView } from 'react-native-virtualized-view';


  // ==========
import { getRestaurantsByUserId } from "../utils/getRestaurantsByUserId";
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react';
  // ==========

import PlaceIdSearcher from "../component/PlaceIdSearcher";
import { restaurantSchema } from "../validation/RestaurantValidation";


export default function AddRestaurantPage({navigation}) {

  const [session, setSession] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  const [restaurantName, setRestaurantName] = React.useState("");
  const [restaurantDescription, setRestaurantDescription] = React.useState("");
  const [cuisine, setCuisine] = React.useState("");
  const [placeId, setPlaceId] = React.useState(null);

  const [searcherPlaceHolder, setSearcherPlaceHolder] = React.useState('')
  
  const [restaurant, setRestaurant] = React.useState(null)
  const [restaurantToEdit, setRestaurantToEdit] = React.useState(null)

  const [isEditMode, setIsEditMode] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errors, setErrors] = React.useState(null)

  const cuisines = ["Mexican", "Italian", "Asian", "Pub", "Seafood"];

  React.useEffect(()=>{
    if (session){
      setIsSubmitting(false)
      getRestaurantsByUserId(session.user.id)
      .then((restaurantData)=>{
        setRestaurant(restaurantData.data[0])
      }).catch((error)=>{console.log(error)})
    }
  }, [session])

  async function handleSubmit(){
    setIsSubmitting(true)

    const formInput = {
      restaurantName: restaurantName,
      restaurantDescription: restaurantDescription,
      cuisine: cuisine,
      placeId: placeId
    }

      try{
        await restaurantSchema.validate(formInput, {abortEarly: false})
        setErrors(null)
        if(isEditMode){
          updateRestaurantById().catch((error)=>{
            console.log(error)
          });
        }
        else if (!isEditMode) submitRestaurant();
      } catch (error) {
        console.log(error, "<<<< error")
        const newError = {}
        if(error.inner) {
          error.inner.forEach((err)=>{

            newError[err.path] = err.message
            setErrors(newError)
          })
        }


        setIsSubmitting(false)
      }
  }

  function submitRestaurant(){
    const sessionUser = session.user
    const input = {restaurantName, restaurantDescription, cuisine, placeId, sessionUser};
    postRestaurant(input)
      .then((restaurantData) => {
        setRestaurant(restaurantData)
        setIsSubmitting(false)
      })
      .catch((err) => {
        setIsSubmitting(false)
        console.log(err);
      });
  }

  function updateRestaurantById(){
    const restaurantId = restaurantToEdit.id
    const sessionUser = session.user
    const input = {restaurantName, restaurantDescription, cuisine, placeId, sessionUser};

    patchRestaurantById(input, restaurantId)
      .then((restaurantData) => {
        setIsEditMode(false)
        setRestaurant(restaurantData)
        setIsSubmitting(false)
      })
      .catch((err) => {
        setIsSubmitting(false)
        console.log(err);
      });
  }

  return restaurant && !isEditMode ? (
  <View style={styles.container}>
      <View style={styles.headerTextView}>
        <Text style={[styles.headerText, styles.yourRestaurantText]}>Your restaurants</Text>
      </View>

  <Card contentStyle={styles.mainCard}>
    <Card.Title titleStyle={styles.cardTitle} titleVariant="headlineLarge"  title={restaurant.name} />

    <Card.Content>
      <Text style={styles.cardDesc} variant="bodyMedium">{restaurant.description}</Text>
      <View style={styles.cardCuisineWrap}><Text style={styles.cardCuisine} variant="bodyMedium">{restaurant.cuisine}</Text></View>
    </Card.Content>
    <Card.Actions>
      <Button 
          mode="elevated"
          style={{ borderColor: "#FFF" }}
          borderColor="#FFF"
          textColor="#FFF"
          buttonColor="#3AD6A7"
          onPress = {()=>{
          navigation.navigate("BusinessMenuPage", {restaurant: restaurant})
      }}>Manage Menu</Button>

      <Button 
      mode="elevated"
      style={{ borderColor: "#FFF" }}
      borderColor="#FFF"
      textColor="#FFF"
      buttonColor="#4C5B61"
      onPress = {()=>{
          setIsEditMode(true)
          setRestaurantToEdit(restaurant)
          setRestaurantName(restaurant.name)
          setRestaurantDescription(restaurant.description)
          setCuisine(restaurant.cuisine)
      }}>Edit</Button>
    </Card.Actions>
  </Card>
  </View>
  ) : (
    
    <ScrollView 
    style={styles.container}
    nestedScrollEnabled={true}
    keyboardShouldPersistTaps={'handled'}
    contentContainerStyle={{ flexGrow: 1 }}
    listMode="SCROLLVIEW"
    >
      {/* <View> */}
  

      {/* Title */}
      <View style={styles.headerTextView}>
        <Text style={styles.headerText}>{isEditMode? 'Edit your restaurant': `Now let's add your restaurant`}</Text>
      </View>

      {/* Restaurant Name */}
      <View><Text style={styles.inputLabels}>Restaurant Name</Text>
        <TextInput
          underlineColor="#FFF"
          activeUnderlineColor="#3AD6A7"
          style={styles.inputsBody}
          contentStyle={styles.inputs}
          placeholderTextColor="#A9A9AC"
          label=""
          mode="flat"
          value={restaurantName}
          onChangeText={(restaurantName) => setRestaurantName(restaurantName)} />
                {!errors ? null : Object.hasOwn(errors, 'restaurantName') ? <HelperText style={styles.errorMsg} type="error">
          {errors.restaurantName}
        </HelperText> : null}
      </View>


      {/* Restaurant Description */}
      <View><Text style={styles.inputLabels}>Description</Text>
        <TextInput
          underlineColor="#FFF"
          activeUnderlineColor="#3AD6A7"
          style={styles.inputsBody}
          contentStyle={styles.inputsMultiline}
          placeholderTextColor="#A9A9AC"
          label=""
          multiline={true}
          mode="flat"
          value={restaurantDescription}
          onChangeText={(restaurantDescription) => setRestaurantDescription(restaurantDescription)} />
                {!errors ? null : Object.hasOwn(errors, 'restaurantDescription') ? <HelperText style={styles.errorMsg} type="error">
          {errors.restaurantDescription}
        </HelperText> : null}
      </View>

      {/* Cuisine dropdown */}
      <View style={styles.dropdownContainer}><Text style={styles.inputLabels}>Cuisine</Text>
        <SelectDropdown
          data={cuisines}
          onSelect={(selectedItem, index) => {
            setCuisine(selectedItem);
          } }
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return (<View style={styles.dropdownButtonView}>
                <View><Text style={styles.dropdownButtonText}>{selectedItem}</Text></View>
                <View><Icon style={styles.iconTest} name="caret-down" size={30} color="#4C5B61" /></View>
              </View>)
          } }
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          } }

          defaultButtonText="Select a cuisine"
          dropdownStyle={styles.dropdownStyle}
          buttonStyle={styles.dropdownButtonStyle}

          defaultValue={cuisine? cuisine : null} />
                {!errors ? null : Object.hasOwn(errors, 'cuisine') ? <HelperText style={styles.errorMsg} type="error">
          {errors.cuisine}
        </HelperText> : null}
      </View>
      
           
      <View><><Text style={styles.inputLabels}>Location</Text></>
        <PlaceIdSearcher setPlaceId={setPlaceId} searcherPlaceHolder = {searcherPlaceHolder} setSearcherPlaceHolder = {setSearcherPlaceHolder}/>
        {!errors ? null : Object.hasOwn(errors, 'placeId') ? <HelperText style={styles.errorMsg} type="error">
        {errors.placeId}
      </HelperText> : null}
      </View>

      <View style={styles.buttonWrap}>
        <View style ={ styles.buttonRow}>
        <Button
          style={styles.mainButton}
          mode="elevated"
          onPress={() => {handleSubmit()} }
          disabled = {isSubmitting}
        >
          {isEditMode ? <Text style={styles.mainButtonText} > Update </Text> : <Text style={styles.mainButtonText} > Submit </Text>}

        </Button>
        {isEditMode?  <Button
          borderColor="#3AD6A7"
          textColor="#3AD6A7"
          buttonColor="#4C5B61"
          style={styles.editButton}
          mode="elevated"
          onPress={() => {
            setIsEditMode(false)
            setRestaurant(restaurantToEdit)
            setRestaurantName(restaurantToEdit.name)
            setRestaurantDescription(restaurantToEdit.description)
            setCuisine(restaurantToEdit.cuisine)
            setPlaceId(restaurantToEdit.place_id)
          } }
          disabled = {isSubmitting}
        >
          Cancel
        </Button> : null }
        </View>
        <HelperText style={styles.errorMsg} type="error" visible={errors}>
          Unable to submit form - invalid input(s)
        </HelperText>
      </View>

    </ScrollView>
  );

}

const styles = StyleSheet.create({
  mainCard:{
    backgroundColor:"#FFF", 
    borderRadius: 8,
    padding: 12
  },
  cardTitle:{
    fontSize: 20,
    color: "#3AD6A7",
    fontWeight: "bold",
  },
  cardDesc:{
    fontSize: 14,
    color: "#4C5B61",
    marginBottom: 12
  },
  cardCuisineWrap:{
    borderWidth: 1,
    borderColor: "#3AD6A7",
    padding: 3,
    width: 100,
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12
  },
  cardCuisine:{
    fontSize: 14,
    color: "#3AD6A7",
    width:"auto"
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#4C5B61",
    paddingTop: 60,
    paddingHorizontal: 20,
    gap: 12
  },
  headerTextView:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  yourRestaurantText:{
    width: 250,
  },
  headerText:{
    color: "#FFF",
    fontWeight:600,
    fontSize: 28,
    textAlign: "center",
    width: 197,
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputLabels:{
    fontWeight:600,
    color:"#FFF",
    fontSize: 14,
    marginTop: 18,
    marginBottom: 6
  },
  inputsBody:{
    borderColor:"#FFF", 
    borderWidth: 1, 
    borderRadius: 5, 
    overflow:"hidden", 
    backgroundColor: "#FFF",
    // marginBottom: 12,
  },
  inputs:{
    backgroundColor: "#FFF",
    color: "#4C5B61",
    height: 52
  },
  inputsMultiline:{
    backgroundColor: "#FFF",
    color: "#4C5B61",
    height: 82
  },
  dropdownContainer:{
    flex: 1,
    alignItems: 'flex-start',
    width: "100%"
  },
  dropdownStyle:{
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: "90%",
    color: "#4C5B61",
  },
  dropdownButtonStyle:{
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems: 'center',
    height: 46,
    fontSize: 14,
  },
  dropdownButtonView:{
    display: "flex",
    flexDirection: "row",
    justifyContent:"center",
    alignItems: 'center',
    width: "100%",
  },
  dropdownButtonText:{
    fontWeight:"bold",
    fontSize: 16,
    color: "#4C5B61",
    marginRight: 12
  },
  buttonWrap:{
    display:"flex",
    marginTop: 40,
    marginBottom: 125,
    alignItems: "center",
  },
  buttonRow:{
    flexDirection: "row",
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: 'space-around',
    gap: 18
  },
  mainButton: {
    width: 139,
    height: 48,
    backgroundColor: '#3AD6A7',
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mainButtonText:{
    color: '#FFF',
    fontWeight: 'bold', 
    fontSize: 14,
  },
  editButton:{
    width: 139,
    height: 48,
    borderRadius: 29,
    borderColor: "#3AD6A7", 
    borderWidth: 1, 
    marginTop: 16
  },
  errorMsg:{
    marginTop: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C54E65",
    backgroundColor: '#EFD2D8',
  }
})
