/* eslint-disable prettier/prettier */

const initialState = {
  user: '',
  initializing: [],
  email: [],
  pass: [],
};

function appReducers(state = initialState, action) {
  console.log(
    'userReducer was called with state',
    state,
    'and action',
    action.type,
  );
  if (action.type === 'LOGIN_USER') {
    return {
      ...state,
      email: [...state.email, action.email],
      pass: [...state.pass, action.pass],
    };
  } else if (action.type === 'ADD_USER') {
    return {
      ...state,
      user: [...state.user, action.user],
    };
  } else {
    return state;
  }
}

export default appReducers;
