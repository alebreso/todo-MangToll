import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions/CardActions';
import '../styles/AddCardForm.css'

class AddCardForm extends Component {
  state={
    title: '',
    text: '',
    position: 0
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      title: this.state.title,
      text: this.state.text,
      position: this.state.position
    }
    this.props.addCard(newCard);
    this.setState({
      title: '',
      text: '',
      position: 0
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="addCard-container">
        <form className="addCard-form" onSubmit={this.handleSubmit}>
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Card Title'
            onChange={this.handleChange}
            value={this.state.title}
            required
          />
          <select onChange={this.handleChange} name='position'>
            <option key='position-0' value={0} defaultValue>monday</option>
            <option key='position-1' value={1}>tuesday</option>
            <option key='position-2' value={2}>wednesday</option>
            <option key='position-3' value={3}>thursday</option>
            <option key='position-4' value={4}>friday</option>
            <option key='position-5' value={5}>saturday</option>
          </select>
          <textarea
            id='text'
            name='text'
            rows='4'
            cols='18'
            placeholder='What to do?!'
            onChange={this.handleChange}
            value={this.state.text}
            required
          />
        <button
          type='submit'
          onClick={this.handleSubmit}
          className='addCard-button'
        >
          Add Project +
        </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  cards: store.cardReducer.cards,
})

export default connect(mapStateToProps,{addCard})(AddCardForm)
