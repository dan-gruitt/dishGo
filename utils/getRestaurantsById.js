import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY)
export const getRestaurantsById = async (id_array) => {

    const { data, error } = await supabase
    .from('restaurants')
    .select()
    .in('id', id_array)
    return data
}

export default { getRestaurantsById };

// useEffect(() => {
//     getRestaurantsById(testArray).then((response) => {
//     console.log(response)
//     })
//   }, [])