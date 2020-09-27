/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Header} from 'react-native-elements';

const BucketList = () => {
  const [place, setPlace] = useState([]);
  const [text, setText] = useState('');

  //storing the text written in text input
  const inputHandler = async (val) => {
    await AsyncStorage.setItem('ChosenPlace', JSON.stringify(place));
    setText(val);
  };

  //storing the bucketlist items
  const storeData = async (place) => {
    try {
      await setPlace((prevPlaces) => {
        return [{value: text, key: Math.random.toString()}, ...prevPlaces];
      });
      await AsyncStorage.setItem('ChosenPlace', JSON.stringify(place));
      console.log('in storedata', JSON.stringify(place));
    } catch (e) {
      Alert.alert(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
            centerComponent={{
              text: 'Bucketlist',
              style: {color: '#fff'},
            }}
            centerContainerStyle={{flex: 3}}
          />
        </View>
        <TextInput
          style={styles.inputField}
          placeholder="Place"
          onChangeText={inputHandler}
        />

        <TouchableOpacity
          onPress={() => storeData(place)}
          style={styles.addButton}>
          <Text>Add Place</Text>
        </TouchableOpacity>

        <View style={styles.list}>
          <FlatList
            data={place}
            renderItem={({item}) => (
              <Text style={styles.itemText}>{item.value}</Text>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  addButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 125,
  },
  headerContainer: {
    width: 500,
    height: 200,
    alignSelf: 'center',
    marginTop: -30,
  },
  inputField: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    width: 250,
    alignSelf: 'center',
  },
  list: {
    marginTop: 50,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default BucketList;
