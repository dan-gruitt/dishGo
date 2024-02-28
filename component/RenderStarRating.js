import Icon from "react-native-vector-icons/FontAwesome";

export const RenderStarRating = ({ rating }) => { 
    const filledStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - filledStars);
    const emptyStars = 5 - filledStars - halfStars;
  
    let stars = [];
  
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Icon key={i} name="star" size={24} color="#3AD6A7" />);
    }
  
    if (halfStars === 1) {
      stars.push(
        <Icon key="half" name="star-half-full" size={24} color="#3AD6A7" />
      );
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty${i}`} name="star-o" size={24} color="#3AD6A7" />
      );
    }
  
    return <>{stars}</>;
  };

  export default RenderStarRating;