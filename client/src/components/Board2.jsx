import React, { Component } from 'react';
import Column from './Column';
import { ItemTypes } from '../util/ItemTypes';

export default class Board extends Component {
  state={
    colomns:[
      {accepts: [ItemTypes.CARD], lastDroppedItem: null},
      {accepts: [ItemTypes.CARD], lastDroppedItem: null},
      {accepts: [ItemTypes.CARD], lastDroppedItem: null},
      {accepts: [ItemTypes.CARD], lastDroppedItem: null},
      {accepts: [ItemTypes.CARD], lastDroppedItem: null},
      {accepts: [ItemTypes.CARD], lastDroppedItem: null},
    ]
  }
  render() {
    return(
      <div>
        <Column name='flowchart' position={0} />
        <Column name='wireframe' position={1} />
        <Column name='prototype' position={2} />
        <Column name='development' position={3} />
        <Column name='test' position={4} />
        <Column name='launch' position={5} />
      </div>
    )
  }
}
