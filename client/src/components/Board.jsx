import React, { Component } from 'react';
import Column from './Column';

export default class Board extends Component {
  render() {
    return (
      <div className="col-container">
        {
          this.props.col.map((c,i) => (
            <Column 
              col={c} 
              index={i}
              cards={this.props.cards} key={i}
              deleteCard={this.props.deleteCard}
            />
          ))
        }
      </div>
    )  
  }
}


