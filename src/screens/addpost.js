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
  Header,
  Button,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigator from '../components/header';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
// import {Divider} from 'react-native-elements';

// import firebase from '@react-native-firebase';
// import axios from 'axios';

export default function AddPost({navigation}) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [url, setUrl] = useState('');
  const [ref, setRef] = useState('');

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
    async () => {
      // path to existing file on filesystem
      const pathToFile = image.uri;
      // uploads file
      await ref.putFile(pathToFile);
      const task = ref.putFile(pathToFile);

      task.on('state_changed', (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      task.then(() => {
        console.log('Image uploaded to the bucket!');
      });
    };
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

  useEffect(() => {
    // firebase.initializeApp();
    setRef(storage().ref('instagram.jpg'));
    setUrl(storage().ref('instagram.jpg').getDownloadURL());
  }, []);

  const Stack = createStackNavigator();
  return (
    <SafeAreaView style={styles.container}>
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
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
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
    marginTop: 150,
  },
  imagesContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginTop: 50,
    flexDirection: 'row',
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
