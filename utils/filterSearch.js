export const filterSearch = (allDishes, searchDish) => {
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

  const uniqueDishes = [...new Set(matchDishes)]; 

  return uniqueDishes;
};

export default { filterSearch };
