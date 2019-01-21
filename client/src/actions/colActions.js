import axios from 'axios';
import { GET_COLS, COLS_LOADING } from './types';

export const getCols = () => dispatch => {
  dispatch(setColsLoading());
  axios
    .get('http://localhost:4000/col')
    .then(res => dispatch({
      type: GET_COLS,
      payload: res.data
    }))
}

export const setColsLoading = () => {
  return {
    type: COLS_LOADING,
  }
}
