import { GET_CARDS, ADD_CARD, DELETE_CARD, CARDS_LOADING} from '../actions/types';

const initialState = {
  columns: ['flowchart','wireframe','prototype','development','test','launch'],
  cards: [
      // {id:1,title:'title1',text:'test text 1',position:0},
      // {id:2,title:'title2',text:'test text 2',position:1},
      // {id:3,title:'title3',text:'test text 3',position:2},
      // {id:4,title:'title4',text:'test text 4',position:4},
      // {id:5,title:'title5',text:'test text 5',position:2},
      // {id:6,title:'title6',text:'test text 6',position:3},
    ],
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type){
    case GET_CARDS:
      console.log(action.payload)
      return {
        ...state,
        cards: action.payload,
        loading: false
      }
    case ADD_CARD:
      return {
        ...state,
        cards:[...state.cards,action.payload]
      };
    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter(card => card.id !== action.payload)
      };
    case CARDS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}