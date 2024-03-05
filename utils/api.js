import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_KEY
);

export const getRestaurants = async () => {
  const { data, error } = await supabase.from("restaurants").select();
};

export const postRestaurant = async (input) => {
  let { restaurantName, cuisine, restaurantDescription, placeId, sessionUser } = input;
  let userId
  
  if (!sessionUser){
     userId = null
  } else userId = sessionUser.id
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
    .from("restaurants")
    .insert(restaurantToAdd)
    .select();
    console.log(error)
  return data[0];
};

export const patchRestaurantById = async (input, restaurantId) => {
  let { restaurantName, cuisine, restaurantDescription, placeId, sessionUser} = input;

  const restaurantToUpdate = {
    name: restaurantName,
    cuisine: cuisine,
    description: restaurantDescription,
    place_id: placeId,
    user_id: sessionUser.id,
    id: restaurantId,
  };
  const { data, error } = await supabase
    .from("restaurants")
    .upsert(restaurantToUpdate)
    .select();
    console.log(error)
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
    .from("dishes")
    .insert(dishToAdd)
    .select();
  console.log(error);
  return data[0];
};

export const getMenuByRestaurantId = async (restaurantId) => {
  const { data, error } = await supabase
  .from("dishes")
  .select()
  .eq("restaurant_id", restaurantId)
  console.log(error)
  if (data.length === 0){
    return []
  } else
  return data
};

export const deleteDishByDishId = async (dishId) => {
  const { data, error } = await supabase
  .from("dishes")
  .delete()
  .eq("id", dishId)
  console.log('Dish deleted successfully')
}