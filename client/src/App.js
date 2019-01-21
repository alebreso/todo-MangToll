import React, { Component } from 'react';
import './App.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { getCards} from './actions/cardActions';
import { getCols } from './actions/colActions';
import AddCardComponent from './components/AddCardComponent'
import { BoardContainer } from './components/BoardContainer';
import NavBar from './components/NavBar';

class App extends Component {

  componentDidMount(){
    this.props.getCols();
    this.props.getCards();
  }

  render() {
    return (
      <React.Fragment>
        <header>
          <NavBar />
        </header>
        <main>
          <BoardContainer cols={this.props.columns} cards={this.props.cards}/>
          <AddCardComponent cols={this.props.columns}/>
        </main>
      </React.Fragment>

      );
  }
}

const mapStateToProps = (state) => ({
  cards: state.cardReducer,
  columns: state.colReducer,
})

export default connect(mapStateToProps,{ getCols, getCards })(DragDropContext(HTML5Backend)(App));
