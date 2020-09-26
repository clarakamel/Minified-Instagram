/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BucketlistItem from './bucketlistItem';
// import {Ionicons} from '@expo/vector-icons';

const BucketList = () => {
  const [place, setPlace] = useState([
    {value: 'Cairo', key: '1'},
    {value: 'Spain', key: '2'},
    {value: 'Mexico', key: '3'},
  ]);
  const [text, setText] = useState('');

  //storing the text written in text input
  const inputHandler = (val) => {
    setText(val);
  };

  //storing the bucketlist items
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('ChosenPlace', JSON.stringify(place));
      setPlace((prevPlaces) => {
        return [{value: text, key: Math.random.toString()}, ...prevPlaces];
      });
      console.log('in storedata', place);
    } catch (e) {
      Alert.alert(e);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.inputField}
        placeholder="Place"
        onChangeText={inputHandler}
      />

      <TouchableOpacity onPress={() => storeData()}>
        <Text>Add</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 30,
  },
  addButton: {
    width: 100,
    // marginTop: 200,
    alignSelf: 'center',
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
