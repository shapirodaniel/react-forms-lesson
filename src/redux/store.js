import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import axiosService from '../axios-service';
import reducer from './reducer';

export default createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunk.withExtraArgument(axiosService))
);
