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
  let { restaurantName, cuisine, restaurantDescription, placeId, user } = input;
  let userId
  
  if (!user){
     userId = null
  } else userId = user.id
// userId defaults to null if no user logged in, to prevent errors while fixing user login
// once fixed, simply set userId = user.id

  const restaurantToAdd = {
    name: restaurantName,
    cuisine: cuisine,
    description: restaurantDescription,
    place_id: placeId,
    user_id: userId
  };
  const { data, error } = await supabase
    .from("test_restaurants")
    .insert(restaurantToAdd)
    .select();
    console.log(error)
  return data[0];
};

export const patchRestaurantById = async (input, restaurantId) => {
  let { restaurantName, cuisine, restaurantDescription, placeId, user } = input;
  let userId

  if (!user){
     userId = null
  } else userId = user.id
// userId defaults to null if no user logged in, to prevent errors while fixing user login
// once fixed, simply set userId = user.id

  const restaurantToUpdate = {
    name: restaurantName,
    cuisine: cuisine,
    description: restaurantDescription,
    place_id: placeId,
    user_id: userId,
    id: restaurantId,
  };
  const { data, error } = await supabase
    .from("test_restaurants")
    .upsert(restaurantToUpdate)
    .select();
  return data[0];
};

export const postDishByRestaurantId = async (
  dishName,
  description,
  price,
  dietaryObj,
  restaurantId,
  imgUrl
) => {
  const dishToAdd = {
    dish_name: dishName,
    description: description,
    price: Number(price),
    vegan: dietaryObj.vegan,
    vegetarian: dietaryObj.vegetarian,
    pescatarian: dietaryObj.pescatarian,
    restaurant_id: restaurantId,
    img_url: imgUrl
  };
  const { data, error } = await supabase
    .from("test_dishes")
    .insert(dishToAdd)
    .select();
  console.log(error);
  return data[0];
};

export const getMenuByRestaurantId = async (restaurantId) => {
  const { data, error } = await supabase
  .from("test_dishes")
  .select()
  .eq("restaurant_id", restaurantId)
  console.log(error)
  if (data.length === 0){
    console.log(data, "no dishes")
    return []
  } else
  console.log(data, "menu retrieved") 
  return data
};

export const deleteDishByDishId = async (dishId) => {
  const { data, error } = await supabase
  .from("test_dishes")
  .delete()
  .eq("id", dishId)
  console.log('Dish deleted successfully')
}