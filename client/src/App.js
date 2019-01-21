import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { getCards, deleteCard } from './actions/cardActions';
import AddCardComponent from './components/AddCardComponent'

class App extends Component {
  
  componentDidMount(){
    this.props.getCards();
  }

  render() {
    return (
      <React.Fragment>
        <Board cards={this.props.cards} col={this.props.columns} deleteCard={this.props.deleteCard}/>
        <AddCardComponent />
      </React.Fragment>
      );
  }
}

const mapStateToProps = (state) => ({
  cards: state.board.cards,
  columns: state.board.columns,
  deleteCard,
})

export default connect(mapStateToProps, { getCards, deleteCard })(DragDropContext(HTML5Backend)(App));
