import React, { Component } from 'react';
import './styles/App.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './components/Container';
import { connect } from 'react-redux';
import {getCards,getCardsAndFindPosition} from './actions/CardActions';
import NavBar from './components/NavBar';
import AddCardForm from './components/AddCardForm';

class App extends Component {

  componentDidMount() {
    this.props.getCardsAndFindPosition()
  }
  
  checkPosition = (colId) => {
    const cardsList = this.props.cards.filter(c=> parseInt(c.position) === parseInt(colId))
    return cardsList
  }
  
  render() {
    console.log(this.props.positions)
    if(!this.props.cards) return 'Loading';
    return (
      <React.Fragment>
        <header>
          <NavBar />
        </header>
        <main>
          <div className="App">
            <Container key={'a'} id={0} cardsList={this.checkPosition(0)} />
            <Container key={'b'} id={1} cardsList={this.checkPosition(1)} />
            <Container key={'c'} id={2} cardsList={this.checkPosition(2)} />
            <Container key={'d'} id={3} cardsList={this.checkPosition(3)} />
            <Container key={'e'} id={4} cardsList={this.checkPosition(4)} />
            <Container key={'f'} id={5} cardsList={this.checkPosition(5)} />
          </div>
          <AddCardForm />
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store) => ({
  cards: store.cardReducer.cards,
  positions: store.cardReducer.positions
})

export default DragDropContext(HTML5Backend)(connect(mapStateToProps,{getCards, getCardsAndFindPosition})(App));
