import axios from 'axios';
import { GET_CARDS, CHANGE_POSITION, ADD_CARD, DELETE_CARD } from '../actions/types';

export const getCards = () => dispatch => {
  axios
    .get('http://localhost:4000/')
    .then(res => 
      dispatch({
        type: GET_CARDS,
        payload: res.data
      }))
    .catch(err => console.log(err))
}

export const changePosition = (cardId, newIndexPosition) => dispatch => {
  axios
    .put(`http://localhost:4000/card/${cardId}/position/${newIndexPosition}`)
    .then(res => dispatch({
      type: CHANGE_POSITION,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const addCard = (newCard) => dispatch => {
  axios
    .post('http://localhost:4000/',newCard)
    .then(res => dispatch({
      type: ADD_CARD,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const deleteCard = (id) => dispatch => {
  axios
    .delete(`http://localhost:4000/${id}`)
    .then(res => dispatch({
      type: DELETE_CARD,
      payload: res.data
    }))
    .catch(err => console.log(err))
}