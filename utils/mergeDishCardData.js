export const mergeDishCardData = (dish, restaurants, restaurantsPlaces) => {
    const results = [dish];
    
    for (let i = 0; i < restaurants.length; i++) {
      if (restaurants[i].id === dish.restaurant_id) {
        results.push(restaurants[i]);
        break; 
      }
    }
    
    for (let i = 0; i < restaurantsPlaces.length; i++) {
      if (results[1] && restaurantsPlaces[i].place_id === results[1].place_id) {
        results.push(restaurantsPlaces[i]);
        break; 
      }
    }
    
    return results;
  };
  
  export default mergeDishCardData;
