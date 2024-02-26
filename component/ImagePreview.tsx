import { FileObject } from '@supabase/storage-js';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Image item component that displays the image from Supabase Storage and a delte button
const ImageItem = (props, { restaurantId }: { imgUrl : string; item: FileObject; restaurantId: string}) => {

  const {imgUrl, setImgUrl, onRemoveImage, previewImage} = props

  return (
    <View style={{ flexDirection: 'row', margin: 1, justifyContent: 'center', gap: 5 }}>
      {imgUrl ? <Image style={{ width: 150, height: 150 }} source={{ uri: previewImage }} /> : <View style={{ width: 150, height: 150, backgroundColor: '#1A1A1A' }} />}
      {/* Delete image button */}
      <TouchableOpacity onPress={()=>{onRemoveImage(imgUrl)}}>
        <Ionicons name="trash-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ImageItem;