import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY)


export const getRestaurantsById = (id_array) => {
    return supabase.from("restaurants").select()
    .in('id', id_array)
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.log(err, '<<<<ERR') 
    })
}

export default { getRestaurantsById };
