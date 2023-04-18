import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './all-reducers';

const rootReducer = allReducers;

export const store = createStore(rootReducer, applyMiddleware(thunk));
