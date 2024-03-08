export const filterSuggestions = (allDishes, searchDish) => {
    if (allDishes.length === 0) {
      return [];
    }
  
    const splitSearch = searchDish.split(" ");
    const matchDishes = [];
  
    allDishes.forEach((dish) => {
      let count = 0;
      for (let i = 0; i < splitSearch.length; i++) {
        if (dish.dish_name.toLowerCase().includes(splitSearch[i].toLowerCase())) {
          count++;
        }
      }
      if (count === splitSearch.length) {
        matchDishes.push(dish);
      }
    });
  
    if (matchDishes.length === 0) {
      allDishes.forEach((dish) => {
        for (let i = 0; i < splitSearch.length; i++) {
          if (
            dish.dish_name.toLowerCase().includes(splitSearch[i].toLowerCase())
          ) {
            matchDishes.push(dish);
          }
        }
      });
    }
  
    const dishNames = matchDishes.map((dish)=>{
      return dish.dish_name
    })
  
    const uniqueDishNames = [...new Set(dishNames)]; 
  
    const uniqueDishes = uniqueDishNames.map((dishName)=>{
      return {dish_name: dishName}
    })

    return uniqueDishes;
  };
  
  export default { filterSuggestions };
  