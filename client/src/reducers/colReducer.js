import { GET_COLS, COLS_LOADING } from '../actions/types';

const initialState = {}

export default function(state = initialState, action) {
  switch(action.type){
    case GET_COLS:
      return {
        columns: action.payload,
        loading: false
      }
    case COLS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}