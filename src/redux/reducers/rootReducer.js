/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import applicationReducer from './appReducers';

export default combineReducers({
  application: applicationReducer,
});
