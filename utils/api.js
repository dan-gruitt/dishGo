import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_KEY
);

export const getRestaurants = async () => {
  const { data, error } = await supabase.from("test_restaurants").select();
};

export const postRestaurant = async (input) => {
  const { restaurantName, cuisine, restaurantDescription, placeID } = input;
  const restaurantToAdd = {
    name: restaurantName,
    cuisine: cuisine,
    description: restaurantDescription,
    place_id: placeID,
  };
  const { data, error } = await supabase
    .from("test_restaurants")
    .insert(restaurantToAdd)
    .select();
  console.log(data[0]);
  console.log(error);
  return data[0];
};

export const postDishByRestaurantId = async (
  dishName,
  description,
  price,
  dietaryObj,
  restaurantId
) => {
  const dishToAdd = {
    dish_name: dishName,
    description: description,
    price: Number(price),
    vegan: dietaryObj.vegan,
    vegetarian: dietaryObj.vegetarian,
    pescatarian: dietaryObj.pescatarian,
    restaurant_id: restaurantId,
  };
  const { data, error } = await supabase
    .from("test_dishes")
    .insert(dishToAdd)
    .select();
  console.log(error);
  return data[0];
};

export const getMenuByRestaurantID = async (restaurantId) => {
  const { data, error } = await supabase
  .from("test_dishes")
  .select()
  .eq("restaurant_id", restaurantId)
  if (data.length === 0){
    console.log(data)
    return []
  } else console.log(data[0], "<---- data here")
  console.log(error)
};
