/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  Alert,
  Platform,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigator from '../components/navigation';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';

// import firebase from '@react-native-firebase';
// import axios from 'axios';

export default function AddPost({navigation}) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // const source = {uri: '../assets/instagram.jpg'};
    // console.log(source);
    // setImage(source);
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(source);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    const {uri} = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on('state_changed', (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    setImage(null);
  };

  const Stack = createStackNavigator();
  return (
    <SafeAreaView>
      <View style={styles.imagesContainer}>
        <Image
          source={require('../assets/instagram.jpg')}
          style={{width: 100, height: 100}}
        />

        <Image
          source={require('../assets/instagram.jpg')}
          style={{width: 100, height: 100}}
        />
        <Image
          source={require('../assets/instagram.jpg')}
          style={{width: 100, height: 100}}
        />
      </View>
      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image !== null ? (
          <Image source={{uri: image.uri}} style={styles.imageBox} />
        ) : null}
        {uploading ? (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Add post</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  imagesContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 50,
    flexDirection: 'row',
  },
});
