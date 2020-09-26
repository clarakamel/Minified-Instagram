import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import appReducers from './src/redux/reducers/appReducers';
import {connect} from 'react-redux';
import {loginUser} from './src/redux/actions/appActions';
import {bindActionCreators} from 'redux';
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
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              headerTitleAlign="center"
              component={Login}
            />
            <Stack.Screen
              name="NewsFeed"
              component={NewsFeed}
              headerTitleAlign="center"
            />
            <Stack.Screen
              name="AddPost"
              component={AddPost}
              headerTitleAlign="center"
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
  const Tab = createBottomTabNavigator();
  console.log('user info', user);
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
        <Stack.Screen
          name="AddPost"
          component={AddPost}
          headerTitleAlign="center"
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

const mapStateToProps = (state) => ({
  user: state.user,
  initializing: state.initializing,
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loginUser: (user) => {
//       dispatch(loginUser(user));
//     },
//   };
// };

const ActionCreators = Object.assign({}, loginUser());
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
