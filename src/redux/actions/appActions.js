/* eslint-disable prettier/prettier */
export const loginUser = (email, pass) => ({
  type: 'LOGIN_USER',
  email,
  pass,
});

export const addUser = (user) => ({
  type: 'ADD_USER',
  user,
});
