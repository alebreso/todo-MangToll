import React, { Component } from 'react';
import './styles/App.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './components/Container';
import { connect } from 'react-redux';
import {getCards} from './actions/CardActions';
import NavBar from './components/NavBar';
import AddCardForm from './components/AddCardForm';

class App extends Component {

  componentWillMount() {
    this.props.getCards();
  }

  render() {

    const checkPosition = (colId) => {
      return (this.props.cards.filter(c=> parseInt(c.position) === parseInt(colId)))
    }

    if(!this.props.cards) return 'Loading';
    return (
      <React.Fragment>
        <header>
          <NavBar />
        </header>
        <main>
          <div className="App">
            <Container key={'a'} id={0} cardsList={checkPosition(0)} />
            <Container key={'b'} id={1} cardsList={checkPosition(1)} />
            <Container key={'c'} id={2} cardsList={checkPosition(2)} />
            <Container key={'d'} id={3} cardsList={checkPosition(3)} />
            <Container key={'e'} id={4} cardsList={checkPosition(4)} />
            <Container key={'f'} id={5} cardsList={checkPosition(5)} />
          </div>
          <AddCardForm />
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store) => ({
  cards: store.cardReducer.cards
})

export default DragDropContext(HTML5Backend)(connect(mapStateToProps,{getCards})(App));
