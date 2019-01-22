import React, { Component } from 'react'
import '../App.css';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../util/ItemTypes';
import { connect } from 'react-redux';
import CardContainer from './CardContainer';

const spec = {
  drop(props,monitor,component) {
    return {}
  },
}

const style = {
    position:'absolute', 
    top:0, left:0, 
    height:'100%', 
    width:'100%', 
    zindex:1, 
    opacity: 0.5, 
    backgroundColor:'yellow' 
}

class Column extends Component {  

  render() {
    
    const {
      canDrop,
      isOver,
      connectDropTarget,
    } = this.props;

    const { cardsPerCol } =this.props
    return connectDropTarget
    ? connectDropTarget(
      <section className='col'>
        {
          cardsPerCol.map(card=> (<CardContainer card={card} key={card._id} name={card._id}/>))
        }
      </section>
    )
    :null
  }
}

const mapStateToProps = (state) => ({
  columns: state.colReducer,
  cards: state.cardReducer
})

export default connect(mapStateToProps)(DropTarget(
    ItemTypes.CARD, 
    spec,(connect,monitor) =>({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  )(Column));

