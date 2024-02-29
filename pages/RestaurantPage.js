import { useEffect, useState } from "react";
import { Text, StyleSheet, Image, ScrollView, View } from "react-native";
import RestaurantInfo from "../component/RestaurantInfo";
import RenderStarRating from "../component/RenderStarRating";
import RenderReviews from "../component/RenderReviews";
import RenderMenu from "../component/RenderMenu";
import UrlLink from "../component/UrlLink.js";
import OpeningHours from '../component/OpeningHours';
import { getMenuByRestaurantId } from "../utils/getMenuByRestaurantId";

export default function RestaurantPage({ route }) {
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
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.restaurant_name_view}><Text style={styles.restaurant_name}>{restaurant.name}</Text></View>
        <Text style={styles.restaurant_description}>
          {restaurant.description}
        </Text>
        <View style={styles.starContainer}>
          <View style={styles.ratingView}><RenderStarRating rating={restaurantPlace.rating} /></View>
          <UrlLink styles={styles} website={restaurantPlace.website}/>
        </View>
        {/* <RestaurantInfo
          styles={styles}
          open_now={restaurantPlace.current_opening_hours.open_now}
          weekday_text={restaurantPlace.current_opening_hours.weekday_text}
          website={restaurantPlace.website}
          address={restaurantPlace.formatted_address}
          restaurantName={restaurant.name}
        /> */}
        {/* <Text style={styles.sectionTitle}>Photos</Text> */}
        <View style={styles.photoView}>
          <ScrollView style={styles.photScroll} horizontal={true}>{renderPhotos()}</ScrollView>
        </View>

        <View>
          <OpeningHours 
          styles={styles}
          restaurantPlace={restaurantPlace} 
          restaurant={restaurant}
          />
        </View>

        <Text style={styles.sectionTitle}>Full Menu</Text>
        {menu && <RenderMenu location={restaurant.name} menu={menu} styles={styles} />}
      
        <Text style={styles.sectionTitle}>Reviews</Text>
        <RenderReviews reviews={restaurantPlace.reviews} styles={styles} />
        {/* <Text style={styles.sectionTitle}>{restaurant.name}'s Full Menu</Text> */}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#3AD6A7"
  },
  innerContainer:{
    backgroundColor:"#FFF",
    margin: 26,
    overflow: "hidden",
    borderRadius: 31
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurant_name_view:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  restaurant_name: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    color: "#4C5B61",
    width: 184,
    textAlign:"center"
  },
  restaurant_description: {
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 18,
    textAlign: "center",
    color: "#4C5B61",
    fontSize: 16
  },
  ratingView:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
  },
  opening_hours: {
    fontSize: 16,
    margin: 5,
    textAlign: "center",
  },
  open_now_green: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "green",
  },
  open_now_red: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "red",
  },
  website: {
    fontSize: 16,
    color: "blue",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  photoView:{
    paddingHorizontal: 20
  },
  photScroll:{
    paddingBottom: 10,
  },
  photo: {
    width: 134,
    height: 134,
    margin: 5,
    borderRadius: 31,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4C5B61",
    marginTop: 20,
    marginBottom: 8,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4C5B61",
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius:31
  },
  reviewCard:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3AD6A7",
    marginVertical: 12,
    marginHorizontal: 20,
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
  starContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 26,
    marginBottom: 26
  },
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dishHeader: {
    display:"flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    // marginBottom: 5,
    width:"50%",
  },
  dishName: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
    textAlign: "right",
    color: "#FFF",
    marginBottom:30
  },
  dishLocation:{
    fontSize: 13,
    // fontWeight: "bold",
    marginLeft: 5,
    textAlign: "right",
    color: "#FFF",
    marginBottom:30
  },
  dishPrice:{
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 5,
    textAlign: "right",
    color: "#FFF",
  },
  dishDescription: {
    fontSize: 15,
    margin: 20,
    textAlign: "center",
  },
  reviewText: {
    fontSize: 11,
    margin: 20,
    textAlign: "center",
    color: "#FFF"
  },
  cover: {
    // height: 200,
    width: "50%",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#e8c6f7",
    borderRadius: 10,
    padding: 5,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  iconText: {
    fontSize: 16,
  },
});
