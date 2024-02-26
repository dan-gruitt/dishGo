import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY)

export const getDishes = () => {
    return supabase.from("test_dishes").select()
    .then(({data}) => {
        return data;
    }).catch((error)=> {
        console.log('GET DISH ERROR >>',error)
    })
}

export const getDishesName = () => {
    return supabase.from("test_dishes").select('dish_name,id')
    .then(({data}) => {
        return data;
    }).catch((error)=> {
        console.log('GET DISH ERROR >>',error)
    })
}

export default { getDishes, getDishesName };