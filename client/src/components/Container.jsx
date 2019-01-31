import React, { Component } from 'react';
import update from 'react-addons-update';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { changePosition, deleteCard } from '../actions/CardActions';
import '../styles/Container.css';

export class Container extends Component {
  state={
    cards: this.props.cardsList
  }

  handleDelete = (cardId) => {
    const index = this.state.cards.map((c,i) => {
      if(c._id===cardId) {
        return i
      }else return 0
    })
    if(index.length>1){
      index.forEach(test => {
        if(test !== 0) 
        this.removeCard(test)
      })
    }else this.removeCard(index)
    this.props.deleteCard(cardId);
  }

  pushCard = (card) => {
    this.setState(update(this.state, {
      cards:{
        $push: [card]
      }
    }))
  }

  removeCard = (index) => {
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index,1]
        ]
      }
    }))
  }

  moveCard = (dragIndex, hoverIndex) => {
    const {cards} = this.state;
    const dragCard=cards[dragIndex];
    this.setState(update(this.state,{
      cards:{
        $splice:[
          [dragIndex,1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }))
  }

  render() {
    const { cards } = this.state;
    const { canDrop, isOver, connectDropTarget} = this.props;
    const isActive = canDrop && isOver ;
    const backgroundColor = isActive ? 'lightgreen' : '#fff';
    return connectDropTarget(
      <div className='column' style={{backgroundColor}}>
        {
          cards.map((card,i)=>{
            return (
              <Card
                key={card._id}
                index={i}
                listId={this.props.id}
                card={card}
                removeCard={this.removeCard}
                moveCard={this.moveCard}
                handleDelete={this.handleDelete}
              />
            )
          })
        }
      </div>
    )
  }
}

const cardTarget = {
  drop(props,monitor,component){
    const { id } = props;
    const sourceObj = monitor.getItem();
    if(id !== sourceObj.listId) component.pushCard(sourceObj.card);
    return {
      listId: id
    }
  }
}

const mapStateToProps = (store) => ({
  cards: store.cardReducer.cards,
})

export default (connect(mapStateToProps,{changePosition,deleteCard})
)(DropTarget('CARD', cardTarget,(connect,monitor)=>({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Container))
