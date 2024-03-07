import { Text, View, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, MD2Colors, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "../lib/supabase";
import ImagePreview from "./ImagePreview";

export default function ImageUploader(props) {
  const { restaurant, imgUrl, setImgUrl } = props;
  const [isLoading, setIsLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState<string>("");

  const loadImage = async (filePath) => {
    supabase.storage
      .from("business_images")
      .download(filePath)
      .then(({ data }) => {
        const fr = new FileReader();
        fr.readAsDataURL(data!);
        fr.onload = () => {
          setPreviewImage(fr.result as string);
          setImgUrl(filePath);
          setIsLoading(false);
        };
      })
      .catch((error) => console.log(error));
  };

  const onSelectImage = async () => {
    const options = {
      allowsEditing: true,
      base64: true,
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    // saves image if picker not cancelled
    if (!result.canceled) {
      setIsLoading(true);
      const img = result.assets[0];
      const imgId = new Date().getTime();
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const filePath = `${restaurant!.id}/${imgId}.${
        img.type === "image" ? "png" : "mp4"
      }`;
      const contentType = img.type === "image" ? "image/jpeg" : "video/mp4";

      const { data, error } = await supabase.storage
        .from("business_images")
        .upload(filePath, decode(base64), { contentType, upsert: true });
      loadImage(filePath);
    }
  };

  const onRemoveImage = async (imgUrl) => {
    supabase.storage
      .from("business_images")
      .remove(imgUrl)
      .then(() => {
        console.log("successfully deleted image");
      })
      .catch((error) => {
        console.log(error);
      });
    setImgUrl("");
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="#3AD6A7" style={{marginTop: 10, marginBottom: 10}}/>
      ) : (
        <ScrollView style={styles.dishImage}>
          {imgUrl ? (
            <ImagePreview
              previewImage={previewImage}
              restaurantId={restaurant!.id}
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              onRemoveImage={() => onRemoveImage(imgUrl)}
            />
          ) : null}
        </ScrollView>
      )}

      {/* FAB to add images */}
      <Button 
         
          textColor="#3AD6A7"
          buttonColor="#4C5B61"
          style={styles.addImageButton}
      onPress={onSelectImage} 
      mode="outlined">
        Add image
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:20
  },
  dishImage:{
    backgroundColor: "rgba(0,0,0,0)",
    marginBottom: 20,
    marginTop: 0,
  },
  addImageButton:{
    width: 139,
    borderRadius: 29,
    borderColor: "#3AD6A7", 
    borderWidth: 1, 
  },
})