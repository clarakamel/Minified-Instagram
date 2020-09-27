/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
const axios = require('axios');
import {Header} from 'react-native-elements';
// import {Divider} from 'react-native-elements';

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

  //not working
  const createFormData = (image, body) => {
    const data = new FormData();

    data.append('photo', {
      name: image.fileName,
      type: image.type,
      uri:
        Platform.OS === 'android'
          ? image.uri
          : image.uri.replace('file://', ''),
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  //not working
  const handleUploadPhoto = () => {
    axios
      .post('http://10.0.2.2:3000/api/upload', {
        method: 'POST',
        body: createFormData(image, {userId: '123'}),
      })
      .then((response) => response.json())
      .then((response) => {
        console.log('upload succes', response);
        Alert.alert('Upload success!');
        setImage(null);
      })
      .catch((error) => {
        console.log('upload error', error);
        Alert.alert('Upload failed!');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          centerComponent={{
            text: 'Add a Post',
            style: {color: '#fff'},
          }}
          centerContainerStyle={{flex: 3}}
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
          <View>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUploadPhoto}>
              <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: 500,
  },
  imageBox: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 200,
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
});
