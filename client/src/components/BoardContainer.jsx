import React, { Component } from 'react';
import Board from './Board';

export class BoardContainer extends Component {

  render() {
    const { cards, cols } = this.props;
    if(cards.loading && cols.loading) return 'loading';
    return <Board columns={cols} cards={cards}/>
  }
}

export default (BoardContainer)
