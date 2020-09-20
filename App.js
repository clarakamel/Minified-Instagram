/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './src/login';
import Header from './src/header';

const App: () => React$Node = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

//sign out method
  // auth()
  //   .signOut()
  //   .then(() => console.log('User signed out!'));

  if (initializing) return null;
  if (!user) {
    return (
      <>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Login />
        </TouchableWithoutFeedback>
      </>
    );
  }
  return (
    <View>
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  loginInputs: {
    padding: 40,
  },
});

export default App;
