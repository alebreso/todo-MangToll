import React, { Component } from 'react';

class Card extends Component {

  render() {
    const { card } = this.props
    return (
      <div className="card" 
        style={{opacity: this.props.isDragging ? 0.5 : 1}}
      >
        <button 
          className='card-button' 
          type="button" 
          onClick={() => this.props.handleDelete(this.props.card._id)}>
          x
        </button>
        <span className="card-title">{card.title}</span>
        <div className="card-text">{card.text}</div>
      </div>
    )
  }
}

export default Card