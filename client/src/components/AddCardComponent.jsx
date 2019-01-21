import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard, getCards } from '../actions/cardActions';

class AddCardComponent extends Component {
  state={
    title: '',
    text: '',
    position: 0
  }

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
      title: '',
      text: '',
      position: 0
    })
    this.props.getCards();
  }

	handleChange = (event) => {
    const { name, value } = event.target;
		this.setState({
			[name]: value
		});
  };
  
  selectRender = () => {
    return (
      <select onChange={this.handleChange} name="position">
      {
        this.props.columns.map(col => (<option key={col} value={col.position}>{col}</option>))
      }
      </select>
    )
  }

  render() {
    if(!this.props.cols.columns) return 'Loading';
    return (
      <div className="addCard-container">
        <form className="addCard-form" onSubmit={this.handleSubmit}>
          <input 
            type='text'
            id='title'
            name="title"
            placeholder="Project Title"
            onChange={this.handleChange}
            value={this.state.title}
            required>
          </input>
          <select onChange={this.handleChange} name="position">
            <option key='position-0' value={0}>flowchart</option>
            <option key='position-1' value={1}>wireframe</option>
            <option key='position-2' value={2}>prototype</option>
            <option key='position-3' value={3}>development</option>
            <option key='position-4' value={4}>test</option>
            <option key='position-5' value={5}>launch</option>
          </select>   
          <textarea
                id="text"
                rows="4"
                cols="18"
                name="text"
                placeholder="Project description"
                onChange={this.handleChange}
                value={this.state.text}
                required
              />
        </form>
        <button type="submit" onClick={this.handleSubmit} className="addCard-button">Add Project +</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps, { addCard, getCards })(AddCardComponent);
