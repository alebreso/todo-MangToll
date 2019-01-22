import React, { Component } from 'react'
import Card from './Card';
import '../App.css';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../util/ItemTypes';
import { connect } from 'react-redux';
import CardContainer from './CardContainer';

// const colTarget = {
//   	drop(props,monitor) {
//       console.log(props)
//     props.onDrop(monitor.getItemType())
// 	},
  // drop(props,monitor,component) {
  //   console.log('props',props)
  //   console.log('monitor',monitor)
  //   console.log('component',component)
  // },
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
//}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class Column extends Component {

  renderCards(card,i) {
    if(card.position===this.props.index){
      return <Card card={card} key={`${card._id}`} onDrop={((card) => this.handleDrop(card))}
      />;
    }else{
      return null;
    }
  }

  handleDrop(card) {
    console.log(card)
		// this.setState({
		// 	lastDroppedColor: color,
		// })
  }
  

  render() {
    const {
      canDrop,
      isOver,
      connectDropTarget,
    } = this.props;

    const isActive = canDrop && isOver

	let backgroundColor = '#222'
	if (isActive) {
		backgroundColor = 'darkgreen'
	} else if (canDrop) {
		backgroundColor = 'darkkhaki'
	}

    const { cardsPerCol } =this.props
    return connectDropTarget
    ? connectDropTarget(
      <section className='col' style={{backgroundColor}}>
        {
          cardsPerCol.map(card=> (<CardContainer card={card} key={card._id} name={card._id}/>))
        }
        {
          isOver && <div style={{position:'absolute', top:0, left:0, height:'100%', width:'100%', zindex:1, opacity: 0.5, backgroundColor:'yellow' }} />
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
    { 
      drop(){ 
      return {name:'colonna'}
      },
    },(connect,monitor) =>({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  )(Column));

