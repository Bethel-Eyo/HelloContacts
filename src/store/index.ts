import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = [thunk];

const initialState = {};

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));

export default store;
