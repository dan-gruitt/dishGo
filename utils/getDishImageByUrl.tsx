import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_KEY
);


export const getDishImageByUrl = async (imgUrl, storageBucket, setStateFn) => {
    let imgUri
    supabase.storage
      .from(storageBucket)
      .download(imgUrl)
      .then(({ data }) => {
        const fr = new FileReader();
        fr.readAsDataURL(data!);
        fr.onload = () => {
         setStateFn(fr.result as string)
        }
      })
      .catch((error) => console.log(error));
  };