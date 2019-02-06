import axios from 'axios';
import { GET_CARDS, CHANGE_POSITION, ADD_CARD, DELETE_CARD, FIND_POSITIONS } from '../actions/types';
import { baseURL } from '../util/const';

export const getCardsAndFindPosition = () => async (dispatch,getState) => {
  const positions = {}
  await dispatch(getCards())
  for(let i=0;i<6;i++){
    positions[[i]] = getState().cardReducer.cards.filter(card => card.position === i)
  }
  await dispatch({
    type: FIND_POSITIONS,
    payload: positions
  })
}

export const getCards = () => async dispatch => {
  const res = await axios.get(`${baseURL}/`)
  if(!res) throw new Error('No cards found')
  dispatch({
    type: GET_CARDS,
    payload: res.data
  })
}

export const changePosition = (cardId, newIndexPosition) => async dispatch => {
  const res = await axios.put(`${baseURL}/card/${cardId}/position/${newIndexPosition}`)
  if(!res) throw new Error('Something went wrong when saving the new position');
  dispatch({
    type:CHANGE_POSITION,
    payload: res.data
  })
}

export const addCard = (newCard) => async dispatch => {
  const res = await axios.post(`${baseURL}/`,newCard)
  if(!res) throw new Error('Something went wrong when saving the card');
  dispatch({
    type:ADD_CARD,
    payload: res.data
  })
}

export const deleteCard = (id) => async dispatch => {
  const res = await axios.delete(`${baseURL}/${id}`)
  if(!res) throw new Error('Something when wrong when deleting the card');
  dispatch({
    type:DELETE_CARD,
    payload:res.data
  })
}