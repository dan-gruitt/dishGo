import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY)

export const getRestaurants = async () => {

const { data, error } = await supabase
.from('test_restaurants')
.select()
}

export const postRestaurant = async(input) =>{
    const {restaurantName, cuisine, restaurantDescription, placeID} = input
   const restaurantToAdd = {name: restaurantName, cuisine: cuisine, description: restaurantDescription, place_id: placeID}
    const { data, error } = await supabase
  .from('test_restaurants')
  .insert(restaurantToAdd)
  .select()
  return data[0]
}
