import { FileObject } from '@supabase/storage-js';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Image preview component that displays the image from Supabase Storage and a delete button
const ImagePreview = (props, { restaurantId }: { imgUrl : string; item: FileObject; restaurantId: string}) => {

  const {imgUrl, setImgUrl, onRemoveImage, previewImage} = props

  return (
    <View style={{ marginTop:20, flexDirection: 'row', margin: 1, justifyContent: 'center', gap: 5 }}>
      {imgUrl ? <Image style={{ width: 150, height: 150, zIndex: -1, }} source={{ uri: previewImage }} /> : <View style={{ width: 150, height: 150, backgroundColor: '#1A1A1A' }} />}
      {/* Delete image button */}
      <TouchableOpacity onPress={()=>{onRemoveImage(imgUrl)}}>
        <Ionicons style= {{padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 20, position: 'absolute', zIndex: 999, top: 0, right:0}} color={'#DC143C'} name="trash-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ImagePreview;