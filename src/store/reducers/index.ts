import { combineReducers } from 'redux';
import contactReducer from './contactReducer';

const reducers =  combineReducers({
  contact: contactReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;