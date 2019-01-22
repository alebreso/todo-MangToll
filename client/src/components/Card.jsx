import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../util/ItemTypes';

const cardSource = {
  beginDrag(props){
    const cardId = { id: props.card._id };
    const cardPos = { pos: props.card.position }
    console.log(cardId)
    console.log(cardPos)
    return {id: props.card.id, pos:props.card.position};    //return {cardId:card.card.id}
  },
  endDrag(props,monitor,card){
  }

}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

function Card (props) {
  const { card, connectDragSource } = props    
  return connectDragSource(
    <div className="card" 
      style={{opacity: props.isDragging ? 0.5 : 1}}
    >
      <button 
        className='card-button' 
        type="button" 
        onClick={() => props.handleDelete(props.card._id)}>
        x
      </button>
      <span className="card-title">{card.title}</span>
      <div className="card-text">{card.text}</div>
    </div>
  )
}

export default DragSource(ItemTypes.CARD,cardSource,collect)(Card)