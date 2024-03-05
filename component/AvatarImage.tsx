import { FileObject } from "@supabase/storage-js";
import { Image, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

// Image item component that displays the image from Supabase Storage and a delte button
const AvatarImage = (props) => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { User } = props;

  


  useEffect(() => {
    if (User) {
      loadImage(User.avatar_url);
    }
  }, [User]);



  const loadImage = async (imgUrl) => {
    setIsLoading(true);
    supabase.storage
      .from("avatars")
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
    <View
      style={{
        flexDirection: "row",
        margin: 1,
        justifyContent: "center",
        gap: 5,
      }}
    >
      {/*checks if imgUrl exists, otherwise renders an empty placeholder square*/}
      {User && imageUri ? (
        <Image style={{ width: 60, height: 60, borderRadius: 60 }} source={{ uri: imageUri }} />
      ) : (
        <Image style={{ width: 60, height: 60, borderRadius: 60 }} source={require("../assets/blank-profile.png")} />
        
      )}
    </View>
  );
};

export default AvatarImage;
