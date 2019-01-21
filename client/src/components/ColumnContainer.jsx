import React, { Component } from 'react';
import { connect } from 'react-redux';
import Column from './Column';

export class ColumnContainer extends Component {

  findCardsPerCol = () => {
    const { cards } = this.props.cards;
    const { position } = this.props
    return cards.filter(card => {
      return card.position===position
    })
  }

  render() {
    const cardsPerCol = this.findCardsPerCol();
    return (
      <Column key={this.props.key} cardsPerCol={cardsPerCol} />
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.cardReducer,
  columns: state.colReducer
})

export default connect(mapStateToProps)(ColumnContainer)
