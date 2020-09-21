import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';
import Login from './src/screens/login';
import NewsFeed from './src/screens/newsfeed';
import Profile from './src/screens/profile';
import BucketList from './src/screens/bucketlist';
import Navigation from './src/components/navigation';
import AddPost from './src/screens/addpost';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppNavigator from './src/routes/AppNavigator';

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

  const Stack = createStackNavigator();

  if (initializing) return null;
  if (!user) {
    return (
      <>
        <NavigationContainer>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Stack.Navigator initialRouteName="NewsFeed">
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </TouchableWithoutFeedback>
        </NavigationContainer>
        {/* <AppNavigator /> */}
      </>
    );
  }
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Newsfeed"
          component={NewsFeed}
          options={{title: 'NewsFeed'}}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
        <Tab.Screen
          name="BucketList"
          component={BucketList}
          options={{title: 'Bucketlist'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loginInputs: {
    padding: 40,
  },
});

export default App;
