/* eslint-disable prettier/prettier */
/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore} from 'redux';
import appReducer from './src/redux/reducers/appReducers';
import {Provider} from 'react-redux';
import configureStore from './src/redux/configureStore';
import {loginUser} from './src/redux/actions/appActions';
import appActions from './src/redux/actions/appActions';

const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
