import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../actions/cardActions';

class AddCardComponent extends Component {
  state={
    title: '',
    text: '',
    position: 0
    // isVisibible: false,
  }

  // toggle = () => {
  //   this.setState({
  //     isVisibible: !this.state.isVisibible
  //   })
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    const newCard = {
      title: this.state.title,
      text: this.state.text,
      position: this.state.position
    }
    this.props.addCard(newCard);
    this.setState({
      title:'',
      text:'',
      position: 0
    })
  }

	handleChange = (event) => {
    const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

  render() {
    return (
      <div className="addCard-container">
        {/* <button type='button' onClick={this.toggle}>ADD CARD</button> */}
      <form className="addCard-form" onSubmit={this.handleSubmit}>
        <input 
          type='text'
          id='title'
          name="title"
          placeholder="Project Title"
          onChange={this.handleChange}
          required>
        </input>
        <select onChange={this.handleChange} name="position">
          {
            this.props.columns.map((col,i) => (<option key={col} value={i}>{col}</option>))
          }
        </select>   
        <textarea
							id="text"
							rows="4"
							cols="18"
							name="text"
							placeholder="Project description"
							onChange={this.handleChange}
							required
						/>
        {/* <input type='text' name="text" placeholder="TEXT HERE" onChange={this.handleChange}></input> */}
        <button type='submit'>ADD CARD</button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.board.cards,
  columns: state.board.columns,
})

export default connect(mapStateToProps, { addCard })(AddCardComponent);
