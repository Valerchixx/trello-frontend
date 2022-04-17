import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {rootReducer} from './reducer';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
export const asyncDispatch = store.dispatch;
export type TAppState = ReturnType<typeof rootReducer>;
export default store;
