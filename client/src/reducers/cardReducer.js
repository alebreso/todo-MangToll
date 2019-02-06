import { GET_CARDS, CHANGE_POSITION, ADD_CARD, DELETE_CARD, FIND_POSITIONS } from '../actions/types';

const initialState = {}

export default function (state = initialState, action) {
  switch(action.type){
    case GET_CARDS:
      return {
        cards: action.payload
      }
    case FIND_POSITIONS:
      return {
        ...state,
        positions:action.payload
      }
    case CHANGE_POSITION:
      const cards = state.cards.filter(card => card._id !== action.payload._id)
      return {
        cards: [...cards,action.payload]
      }
    case ADD_CARD:
      return {
        cards:[...state.cards,action.payload]
      }
    case DELETE_CARD:
      return {
        cards: state.cards.filter(card => card.id !== action.payload)
      }
    default:
      return state;
  }
}