import React, { Component } from 'react';
import { ItemTypes } from '../util/ItemTypes';
import { DragSource } from 'react-dnd';
import { deleteCard, getCards } from '../actions/cardActions';
import { connect } from 'react-redux';
import Card from './Card';

const cardSource = {
  beginDrag(card){
    //console.log(card.card)
    return card;
    //return {cardId:card.card.id}
  },
  endDrag(props,monitor,card){
    // console.log('props',props);
    // console.log('monitor',monitor);
    // console.log('card',card);
  }

}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class CardContainer extends Component {

  handleDelete = (cardId) => {
    this.props.deleteCard(cardId);
    this.props.getCards();
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      name,
    } = this.props
    const { card } = this.props
    console.log(name)
    return connectDragSource
    ? connectDragSource(
      <div>
        {
          <Card card={card} handleDelete={this.handleDelete}/>
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
        name: props.name,
      }
    },
    endDrag(props, monitor) {
      const item = monitor.getItem()
      const dropResult = monitor.getDropResult()
      if(dropResult) {
        alert(`${item.name} into ${dropResult.name}`)
      }
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(connect(mapStateToProps, 
  {deleteCard, getCards})(CardContainer))