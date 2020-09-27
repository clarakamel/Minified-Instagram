/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import Login from './src/screens/login';
import NewsFeed from './src/screens/newsfeed';
import Profile from './src/screens/profile';
import BucketList from './src/screens/bucketlist';
import AddPost from './src/screens/addpost';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import configureStore from './src/redux/configureStore';


const App = (props) => {
  const store = configureStore();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    store.dispatch({
      type: 'ADD_USER',
      user,
    });

    store.subscribe(
      () => console.log('state updated'),
      console.log(store.getState()),
    );
    if (initializing) setInitializing(false);

    //storing the bucketlist items
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) return null;
  if (!user) {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  console.log('user info', user);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Newsfeed"
          component={NewsFeed}
          options={{title: 'Newsfeed'}}
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
        <Stack.Screen name="Add Post" component={AddPost} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  initializing: state.initializing,
});

export default connect(mapStateToProps, null)(App);
