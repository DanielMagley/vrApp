import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import logo from './assets/3zxyyw.jpg';
import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing';

export default function App() {
const [selectedImage, setSelectedImage] = React.useState(null);
  
let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required");
  return;
}
let pickerResult = await ImagePicker.launchImageLibraryAsync();

if (pickerResult.cancelled === true) {
  return;
}

setSelectedImage({localUri: pickerResult.uri})
};
let openShareDialogAsync = async () => {
  if (!(await Sharing.isAvailableAsync())) {
    alert('Uh oh, sharing isnt available on your platform');
    return;
  }

  Sharing.shareAsync(selectedImage.localUri)
}

if(selectedImage !== null) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedImage.localUri}}
      style={styles.thumbnail} />
      <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
       <Text style={styles.buttonText}>Share photo</Text> 
       </TouchableOpacity> 
    </View>
  )
}



  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.instructions}>To share a photo from your phone with a friend, just press the button below</Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
       <Text style={styles.buttonText}>Pick a photo</Text> 
       </TouchableOpacity> 
    </View>
  );
}

const name = 'kevin'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 355,
    height: 259,
    marginBottom: 10
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  thumbnail: {
  width: 355,
  height: 300,
}
});
