import { combineReducers } from 'redux';
import cardReducer from './cardReducer';
import colReducer from './colReducer';

export default combineReducers({
  cardReducer, 
  colReducer
})