import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY)


export const getMenuByRestaurantId = (id) => {
    return supabase
        .from("test_dishes")
        .select()
        .in('restaurant_id', id)
        .then((data) => {
            const menuItems = data.data;
            return menuItems;
        })
        .catch((error) => {
            console.error("Error fetching menu:", error.message);
            throw error;
        });
};

export default { getMenuByRestaurantId };