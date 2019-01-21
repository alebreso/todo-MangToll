import React, { Component } from 'react';
import { ItemTypes } from '../util/ItemTypes';
import { DragSource } from 'react-dnd';
import { deleteCard, getCards } from '../actions/cardActions';
import { connect } from 'react-redux';
import Card from './Card';

const cardSource = {
  beginDrag(card){
    console.log(card.card)
    return card.card;
    //return {cardId:card.card.id}
  },
  endDrag(props,monitor,card){
    console.log('props',props);
    console.log('monitor',monitor);
    console.log('card',card);
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
    const { card } = this.props
    return this.props.connectDragSource(
      <div>
        {
          <Card card={card} handleDelete={this.handleDelete}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.cardReducer.cards,
  columns: state.colReducer.columns,
})

export default connect(mapStateToProps, {deleteCard, getCards})(DragSource(ItemTypes.CARD, cardSource, collect)(CardContainer));
