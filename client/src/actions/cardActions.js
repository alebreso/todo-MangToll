import { GET_CARDS, ADD_CARD, DELETE_CARD, CARDS_LOADING, CHANGE_POSITION} from './types';
import axios from 'axios';

export const getCards = () => dispatch => {
  dispatch(setCardsLoading());
  axios
    .get('http://localhost:4000/')
    .then(res => 
      dispatch({
        type: GET_CARDS,
        payload: res.data
      }
    )
  )
}

export const addCard = (card) => dispatch => {
  axios
    .post('http://localhost:4000/', card)
    .then(res => 
      dispatch({
        type: ADD_CARD,
        payload: res.data
      }
    )
  )
}

export const changePosition = (cardId,newPosition) => dispatch => {
  axios
    .put(`http://localhost:4000/change-position/${cardId}`,newPosition)
    .then(res => console.log(res))
    // .then(res => dispatch({
    //   type: CHANGE_POSITION,
    //   payload: res.data
    // }))
}

export const deleteCard = (id) => dispatch => {
  axios
    .delete(`http://localhost:4000/${id}`)
    .then(res => dispatch({
      type: DELETE_CARD,
      payload: id
    })
  )
}

export const setCardsLoading = () => {
  return {
    type: CARDS_LOADING,
  }
}