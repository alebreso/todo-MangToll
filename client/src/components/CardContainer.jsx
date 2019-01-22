import React, { Component } from 'react';
import { ItemTypes } from '../util/ItemTypes';
import { DragSource } from 'react-dnd';
import { deleteCard, getCards, changePosition } from '../actions/cardActions';
import { connect } from 'react-redux';
import Card from './Card';

// const cardSource = {
//   beginDrag(props){
//     //console.log(card.card)
//     const item = { id: props.id };
//     return item;    //return {cardId:card.card.id}
//   },
//   endDrag(props,monitor,card){
//     // console.log('props',props);
//     // console.log('monitor',monitor);
//     // console.log('card',card);
//   }

// }

// function collect(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging(),
//   }
// }

class CardContainer extends Component {

  handleDelete = (cardId) => {
    this.props.deleteCard(cardId);
    this.props.getCards();
  }

  handleChangePosition = (cardId, newPosition) => {
    this.props.changePosition(cardId,newPosition)
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      name,
    } = this.props
    const { card } = this.props
    return connectDragSource
    ? connectDragSource(
      <div>
        {
          <Card card={card} 
            handleDelete={this.handleDelete} 
            isDragging={isDragging} 
            name={name} 
            changePosition={this.handleChangePosition}/>
        }
      </div>
    )
    : null
  }
}

const mapStateToProps = (state) => ({
  cards: state.cardReducer.cards,
  columns: state.colReducer.columns,
})

export default DragSource(
  ItemTypes.CARD,
  {
    beginDrag(props) {
      return {
        id: props.id,
        name: props.name
      }
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(connect(mapStateToProps, 
  {deleteCard, getCards, changePosition})(CardContainer))