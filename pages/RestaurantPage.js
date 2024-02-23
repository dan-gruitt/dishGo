import { useEffect, useState } from "react";
import { Text, StyleSheet, Image, ScrollView, View } from "react-native";
import RestaurantInfo from "../component/RestaurantInfo";
import RenderStarRating from "../component/RenderStarRating";
import RenderReviews from "../component/RenderReviews";
import RenderMenu from "../component/RenderMenu";
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
      <Text style={styles.restaurant_name}>{restaurant.name}</Text>
      <View style={styles.starContainer}>
        <RenderStarRating rating={restaurantPlace.rating} />
      </View>
      <Text style={styles.restaurant_description}>
        {restaurant.description}
      </Text>
      <RestaurantInfo
        styles={styles}
        open_now={restaurantPlace.current_opening_hours.open_now}
        weekday_text={restaurantPlace.current_opening_hours.weekday_text}
        website={restaurantPlace.website}
        address={restaurantPlace.formatted_address}
        restaurantName={restaurant.name}
      />
      <Text style={styles.sectionTitle}>Photos</Text>
      <ScrollView horizontal={true}>{renderPhotos()}</ScrollView>
      <Text style={styles.sectionTitle}>Recent Reviews</Text>
      <RenderReviews reviews={restaurantPlace.reviews} styles={styles} />
      <Text style={styles.sectionTitle}>{restaurant.name}'s Full Menu</Text>
      {menu && <RenderMenu menu={menu} styles={styles} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurant_name: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    textAlign: "center",
  },
  restaurant_description: {
    fontSize: 20,
    margin: 20,
    textAlign: "center",
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
  photo: {
    width: 200,
    height: 200,
    margin: 5,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    margin: 10,
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
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  menuContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dishHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  dishDescription: {
    fontSize: 15,
    margin: 20,
    textAlign: "center",
  },
  reviewText: {
    fontSize: 15,
    margin: 20,
    textAlign: "center",
  },
  cover: {
    height: 200,
    width: 200,
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
