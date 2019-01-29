import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { changePosition, deleteCard } from '../actions/CardActions';
import '../styles/Card.css';

export class Card extends Component {

  handleDelete = (cardId) => {
    this.props.deleteCard(cardId)
  }
  
  render() {
    const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div className='card' style={{opacity}}>
        <button 
          className='card-button'
          type='button'
          onClick={()=>this.handleDelete(card._id)}
        >
          X
        </button>
        <div className='card-title'>{card.title}</div>
        <div className='card-text'>{card.text}</div>
      </div>
    ))
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId:props.listId,
      card: props.card
    }
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    //console.log(item.listId) // old card's position 
    const dropResult= monitor.getDropResult();
    //console.log(dropResult.listId) // new card's position
    if( dropResult && dropResult.listId !== item.listId){
      props.removeCard(item.index);
      props.changePosition(item.card._id,parseInt(dropResult.listId))
    }
  }
}

const cardTarget = {
  hover(props,monitor,component){
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;
    // Don't replace items with themselves
    if(dragIndex === hoverIndex){
      return ;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // Get vertical middle
    const hovetMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) /2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if(dragIndex < hoverIndex && hoverClientY < hovetMiddleY){
      return;
    }
    // Dragging upwards
    if(dragIndex> hoverIndex && hoverClientY > hovetMiddleY) {
      return;
    }
    // Time to actually perform the action
    if(props.listId === sourceListId) {
      props.moveCard(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex ;
    }
  }
}

const mapStateToProps = (store) => ({
  cards: store.cardReducer.cards,
})

export default (connect(mapStateToProps,{changePosition,deleteCard}))(flow(
  DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('CARD', cardSource, (connect,monitor)=>({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Card))


