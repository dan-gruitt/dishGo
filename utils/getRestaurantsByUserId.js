import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY)


export const getRestaurantsByUserId = (userId) => {
    return supabase.from("test_restaurants")
    .select()
    .eq('user_id', userId)
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.log(err, '<<<<ERR') 
    })
}

export default { getRestaurantsByUserId };
