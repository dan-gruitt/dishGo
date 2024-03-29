import { FileObject } from '@supabase/storage-js';
import { Image, View} from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

// Image item component that displays the image from Supabase Storage and a delte button
const ImageThumbnail = (props) => {
    
const [imageUri, setImageUri] = useState(null)
const [isLoading, setIsLoading] = useState(false)

  const {item} = props
  const imgUrl = item.img_url

  useEffect(()=>{
    loadImage(imgUrl)
  }, [item])

  const loadImage = async (filePath) => {
    setIsLoading(true)
    supabase.storage
      .from("business_images")
      .download(imgUrl)
      .then(({ data }) => {
        const fr = new FileReader();
        fr.readAsDataURL(data!);
        fr.onload = () => {
          setImageUri(fr.result as string);
          setIsLoading(false);
        };
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ flexDirection: 'row', margin: 1, justifyContent: 'center', gap: 5 }}>
    {/*checks if imgUrl exists, otherwise renders an empty placeholder square*/}
      {imgUrl && imageUri ? <Image style={{ borderRadius:8, width: 100, height: 100, objectFit: "cover" }} source={{ uri: imageUri }} /> : <Image style={{ borderRadius:8, width: 100, height: 100 }} source={require('../assets/tempfoodimage.jpg')} />}
    </View>
  );
};

export default ImageThumbnail;