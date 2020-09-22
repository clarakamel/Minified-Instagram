/* eslint-disable prettier/prettier */
import {loginUser} from '../actions/appActions';

const initialState = {
  user: [''],
  initializing: [],
  email: [],
  pass: [],
};

const appReducers = (state = initialState, action) => {
  console.log('userReducer was called with state', state, 'and action', action)
  if (action.type === 'LOGIN_USER') {
    return {...state, user: [...state.user, action.user]};
  } else {
    return state;
  }
};

export default appReducers;
