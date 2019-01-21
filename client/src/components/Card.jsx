import React, { Component } from 'react';
import { ItemTypes } from '../util/ItemTypes';
import { DragSource } from 'react-dnd';
import { deleteCard } from '../actions/cardActions';
import { connect } from 'react-redux';

const cardSource = {
  beginDrag(card){
    // console.log(card.card.id)
    return {cardId:card.card.id}
  },
  // endDrag(props,monitor,card){
  //   console.log('props',props);
  //   console.log('monitor',monitor);
  //   console.log('card',card);
  // }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

class Card extends Component {

  handleDelete = (cardId) => {
    this.props.deleteCard(cardId);
  }

  render() {
    return this.props.connectDragSource(
      <div className="card" key={`${this.props.card._id}`} style={{opacity: this.props.isDragging ? 0.5 : 1}}>
        <h5 className="card-title">{this.props.card.title}</h5>
        <div className="card-text">{this.props.card.text}</div>
        <button className='card-button' type="button" onClick={() => this.handleDelete(this.props.card._id)}>X</button>
      </div>
    )
  }
}

export default connect()(DragSource(ItemTypes.CARD, cardSource, collect)(Card));
