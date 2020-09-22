/* eslint-disable prettier/prettier */
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const configureStore = () => {
  const store = createStore(rootReducer);
  return store;
};
export default configureStore;
