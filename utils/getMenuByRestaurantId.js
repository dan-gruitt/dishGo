import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY)


export const getMenuByRestaurantId = (id) => {
    return supabase
        .from("dishes")
        .select()
        .in('restaurant_id', id)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Error fetching menu:", error.message);
            throw error;
        });
};

export default { getMenuByRestaurantId };