import { useEffect } from "react";
import { Text, StyleSheet, Image, ScrollView, View } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import RestaurantInfo from "../component/RestaurantInfo";

export default function RestaurantPage({ route }) {
  const { results } = route.params;
  const restaurant = results[1];
  const restaurantPlace = results[2];
  const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

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

  const renderStarRating = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - filledStars);
    const emptyStars = 5 - filledStars - halfStars;

    let stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<Icon key={i} name="star" size={24} color="gold" />);
    }

    if (halfStars === 1) {
      stars.push(
        <Icon key="half" name="star-half-full" size={24} color="gold" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty${i}`} name="star-o" size={24} color="gray" />
      );
    }

    return <>{stars}</>;
  };

  const renderMenu = () => {};

  const renderReviews = () => {
    return restaurantPlace.reviews.map((review, index) => (
      <Card key={index} style={styles.card}>
        <Card.Content style={styles.reviewContainer}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewAuthor}>{review.author_name}</Text>
          </View>
          <View style={styles.starContainer}>
            {renderStarRating(review.rating)}
          </View>
          <Text style={styles.reviewText}>{review.text}</Text>
        </Card.Content>
      </Card>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.restaurant_name}>{restaurant.name}</Text>
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
      {renderReviews()}
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
});
