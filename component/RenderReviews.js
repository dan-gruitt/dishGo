import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import RenderStarRating from "./RenderStarRating";


export const RenderReviews = ({reviews, styles}) => {
    return reviews.map((review, index) => (
      <Card key={index} style={styles.card}>
        <Card.Content style={styles.reviewContainer}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewAuthor}>{review.author_name}</Text>
          </View>
          <View style={styles.starContainer}>
            <RenderStarRating rating={review.rating} />
          </View>
          <Text style={styles.reviewText}>{review.text}</Text>
        </Card.Content>
      </Card>
    ));
  };

  export default RenderReviews;