import Icon from "react-native-vector-icons/FontAwesome";
import { View, StyleSheet } from "react-native";

export const RenderStarRating = ({ starColor="#3AD6A7", rating }) => { 
    const filledStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - filledStars);
    const emptyStars = 5 - filledStars - halfStars;
  
    let stars = [];
  
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Icon key={i} name="star" size={24} color={starColor} />);
    }
  
    if (halfStars === 1) {
      stars.push(
        <Icon key="half" name="star-half-full" size={24} color={starColor} />
      );
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty${i}`} name="star-o" size={24} color={starColor} />
      );
    }
  
    return <View style={styles.ratingView}>{stars}</View>;
  };

  const styles = StyleSheet.create({
    ratingView:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  })


  export default RenderStarRating;