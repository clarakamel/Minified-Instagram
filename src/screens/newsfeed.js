/* eslint-disable prettier/prettier */
import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigator from '../components/navigation';
import axios from 'react';



export default function NewsFeed({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Hello There!</Text>
      <Button
        title="Add a Post"
        onPress={() => navigation.navigate('AddPost')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
