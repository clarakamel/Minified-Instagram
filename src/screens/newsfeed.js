/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Header} from 'react-native-elements';

export default function NewsFeed({navigation}) {
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          centerComponent={{
            text: 'Newsfeed',
            style: {color: '#fff'},
          }}
          centerContainerStyle={{flex: 3}}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Logout" color="#841584" onPress={() => signOut()} />
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
  buttonsContainer: {
    position: 'absolute',
  },
});
