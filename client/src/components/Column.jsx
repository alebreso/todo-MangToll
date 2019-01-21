import React, { Component } from 'react'
import Card from './Card';
import '../App.css';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../util/ItemTypes';
import { connect } from 'react-redux';
import CardContainer from './CardContainer';

const colTarget = {
  drop(props,monitor,component) {
    console.log('props',props)
    console.log('monitor',monitor)
    console.log('component',component)
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
      return <Card card={card} key={`${card._id}`} />;
    }else{
      return null;
    }
  }

  render() {
    const { cardsPerCol } =this.props
    return this.props.connectDropTarget(
      <section className='col'>
        {
          cardsPerCol.map(card=> (<CardContainer card={card} key={card._id}/>))
        }
        {
          this.props.isOver && <div style={{position:'absolute', top:0, left:0, height:'100%', width:'100%', zindex:1, opacity: 0.5, backgroundColor:'yellow' }} />
        }
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  columns: state.colReducer,
  cards: state.cardReducer
})

export default connect(mapStateToProps)(DropTarget(ItemTypes.CARD, colTarget, collect)(Column));

