import { useEffect, useState, useRef } from "react";
import { Text, StyleSheet, Image, ScrollView, View, TouchableOpacity } from "react-native";
import RenderStarRating from "../component/RenderStarRating";
import RenderReviews from "../component/RenderReviews";
import RenderMenu from "../component/RenderMenu";
import UrlLink from "../component/UrlLink.js";
import OpeningHours from '../component/OpeningHours';
import { getMenuByRestaurantId } from "../utils/getMenuByRestaurantId";

export default function RestaurantPage({ route }) {

  const scrollRef = useRef();

  const { results } = route.params;
  const restaurant = results[1];
  const restaurantPlace = results[2];
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const [menu, setMenu] = useState([]);

  const renderPhotos = () => {
    return restaurantPlace.photos.map((photo, index) => (
      <Image
        key={index}
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photo.width}&photoreference=${photo.photo_reference}&key=${API_KEY}`,
        }}
        style={styles.photo}
      />
    ));
  };

  useEffect(() => {
    getMenuByRestaurantId([restaurant.id]).then((data) => {
      setMenu(data);
    });
  }, [restaurant.id]);

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <View style={styles.restaurantCard}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurant_name}>{restaurant.name}</Text>
          <RenderStarRating rating={restaurantPlace.rating} />
          </View>
        <Text style={styles.restaurant_description}>
          {restaurant.description}
        </Text>
        <View style={styles.buttonsContainer}>
          <UrlLink styles={styles.webButton} website={restaurantPlace.website} text={"Website"}/>
          <UrlLink styles={styles.mapsButton} website={restaurantPlace.url} text = {"Open in Maps"}/>
        </View>
        <View style={styles.photoView}>
          <ScrollView style={styles.photScroll} horizontal={true}>{renderPhotos()}</ScrollView>
        </View>
          <OpeningHours 
          styles={styles}
          restaurantPlace={restaurantPlace} 
          restaurant={restaurant}
          />

        <Text style={styles.sectionTitle}>Full Menu</Text>
        {menu && <RenderMenu location={restaurant.name} menu={menu} />}
      
        <Text style={styles.sectionTitle}>Reviews</Text>
        <RenderReviews reviews={restaurantPlace.reviews} styles={styles} />

<View style={{alignItems: "center"}}><TouchableOpacity style={styles.scrollToTopBtn} onPress={()=>{
scrollRef.current?.scrollTo({
  y: 0,})}}>
    <Text style={{    color: 'grey'}}>Top</Text></TouchableOpacity></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#3AD6A7",
  },
  restaurantCard:{
    backgroundColor:"#FFF",
    margin: 10,
    overflow: "hidden",
    borderRadius: 31,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurantHeader:{
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  restaurant_name: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    color: "#4C5B61",
    textAlign:"center"
  },
  restaurant_description: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#4C5B61",
    fontSize: 16
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  webButton:
  { 
      backgroundColor: "#4C5B61",
      color: "#FFF",
      
  },
  mapsButton:
  { 
      backgroundColor: "#3AD6A7",
      color: "#FFF",
      
  },
  opening_hours: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  open_now_green: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },
  open_now_red: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "red",
    marginTop: 10,
  },

  photScroll:{
    marginBottom: 10,
  },
  photo: {
    width: 134,
    height: 134,
    marginRight: 10,
    borderRadius: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4C5B61",
    marginTop: 20,
    marginBottom: 20,
  },
  reviewCard:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3AD6A7",
    marginBottom: 15,
    borderRadius:31
  },
  reviewContainer: {
    alignItems: "center",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  reviewAuthor: {
    fontWeight: "bold",
    marginRight: 5,
    color: "#FFF"
  },
  starContainerReview:{
    display: "flex",
    flexDirection: "row",
    alignItems: "left",
    // justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 12,
    marginBottom: -8,
  },

  menuContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  
  reviewText: {
    fontSize: 11,
    margin: 20,
    textAlign: "center",
    color: "#FFF"
  },
  scrollToTopBtn:{
    borderWidth: 1,
    borderColor: '#eeeeee',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 31,
  }
});
