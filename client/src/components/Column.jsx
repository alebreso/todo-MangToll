import React, { Component } from 'react'
import Card from './Card';
import '../App.css';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../util/ItemTypes';

const colTarget = {
  drop(props,monitor,component) {
    // console.log('props',props)
    // console.log('monitor',monitor)
    // console.log('component',component)
  },
  // hover(props,monitor,component){
  //   console.log('HOVER');
  //   console.log('props',props);
  //   console.log('monitor',monitor);
  //   console.log('component',component);
  // },
  // canDrop(props,monitor){
  //   console.log('CANDROP');
  //   console.log('props',props)
  //   console.log('monitor',monitor)

  // }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class Column extends Component {

  renderCards(card,i) {
    if(card.position===this.props.index){
      return <Card card={card} key={`${card._id}`} deleteCard={this.props.deleteCard}/>;
    }else{
      return <div key={i+10}></div>;
    }
  }

  render() {
    return this.props.connectDropTarget(
      <section className='col'>
        {
          this.props.cards.map((card,i)=>this.renderCards(card,i))
        }
        {
          this.props.isOver && <div style={{position:'absolute', top:0, left:0, height:'100%', width:'100%', zindex:1, opacity: 0.5, backgroundColor:'yellow' }} />
        }
      </section>
    )
  }
}

export default DropTarget(ItemTypes.CARD, colTarget, collect)(Column)

